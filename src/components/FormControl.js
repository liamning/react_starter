import React from "react";

import DateTime from 'react-datetime'
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

import Select, { Async } from 'react-select';
import 'react-select/dist/react-select.css';
// import { Field } from "formik";

var debounce = require('debounce-promise')


const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' },
];

const selectDict = {};


const getGeneralMaster = (input, table, createAble, descField) => {

  return fetch(`http://localhost/HttpHandler/JsonHandler.ashx?Table=${table}&input=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {

      console.log(json);

      selectDict[table] = {};
      json.forEach(element => {
        element.value = element.Code;
        element.label = element[(descField || 'Desc')];
        selectDict[table][element.value] = element;
      });
      if (createAble && input && !json.length)
        json.push({ value: input, label: input });

      return { options: json };
    });
}

export class AsyncSelectField extends React.Component {

  constructor(props) {
    super(props);

    var name = props.name;
    this.state = {
      value: props.values[name],
      label: props.label || props.values[name],
    };
  }


  //Code to clear the cache==== Start
  cache = {}
  purgeCache = () => {
    Object.keys(this.cache).forEach(entry => {
      delete this.cache[entry]
    })

    this.nameInput.loadOptions("");
  }
  //==== End

  shouldComponentUpdate(nextProps, nextState) {

    console.log(nextProps);
    var name = nextProps.name;

    if (nextProps.afterSave) {
      this.purgeCache();
    }

    if (nextProps.isGetFormData) {
      this.state.value = nextProps.values[name];
      return true;
    }

    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;
    return true;
  }

  handleChange = (value, par1, par2) => {

    value = value || {};

    if (this.props.getFormData) {
      this.state = {};
      this.props.getFormData({ Code: value.value });
    } else {
      if (this.props.setFieldValue) {
        this.props.setFieldValue(this.props.name, value.value);
      }
      console.log('handleChange');
      console.log(value);
      this.setState({
        ...value
      });

    }
  };

  handleBlur = (event) => {

    if (this.props.onBlur) {
      this.props.onBlur({
        value: this.state.value,
        label: this.state.label
      });
    }
  };

  getOptions = (input) => {
    console.log("getOptions");
    return getGeneralMaster(input, this.props.tableName, this.props.createAble, this.props.Desc);
  }


  componentDidMount() {
    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {
    console.log(`async select ${this.props.name}`);

    const {
      tableName,
      multi,
      name,
      values,
      label,
      setFieldValue,
      setFieldTouched,
      getFormData
    } = this.props;

    var value = values[name];

    var selectedValue = {
      value: this.state.value || value || '',
      label: this.state.label || label || 'Please Select'
    };

    if (value
      && selectDict[tableName]
      && selectDict[tableName][value]) {
      selectedValue = value;
    }

    return (
      <Async
        cache={this.cache}
        ignoreCase={false}
        ref={(input) => {
          this.nameInput = input;
        }}
        // filterOptions={(options, filter, current_values) => { return options; }}
        filterOption={() => (true)}
        loadOptions={debounce(this.getOptions, 300)}

        multi={multi}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={selectedValue}
      />
    );
  }
}

export class SelectField extends React.Component {

  handleChange = value => {
    this.props.setFieldValue(this.props.name, value);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value == this.props.value) return false;
    return true;
  }

  handleBlur = () => {
  };

  render() {
    return (
      <Select
        name="color"
        options={options}
        multi={this.props.multi}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
      />
    );
  }
}

export class DateTimeField extends React.Component {

  constructor(props) {
    super(props);

    var name = this.props.name;
    this.state.value = this.props.values[name];
    
    this.format = "DD/MM/YYYY"; 
    this.timeFormat = "hh:mm A"; 
    this.dateTimeLengh = 19;
  }

  state = {
    value: ''
  };

  shouldComponentUpdate(nextProps, nextState) {
    let name = nextProps.name;
    console.log(`shouldComponentUpdate ${name}`);

    if (nextProps.isGetFormData) {
      if (nextProps.values[name] && nextProps.values[name].length == 19)
        this.state.value = moment(nextProps.values[name], this.format + " HH:mm:ss")._d;

      else if(!nextProps.values[name]){
        this.state.value = "";
      }

      return true;
    }


    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;

    return true;
  }

  componentDidMount() {
    if (this.props.autoFocus)
      this.nameInput.focus();
  }


  handleChange = event => {
    console.log("handleChange");
    if (!event._isValid) return;
    var text = event;
    this.setState({
      value: text
    });

  };

  handleBlur = event => {

    var name = this.props.name;
    var text = "";
    if (event) {
      if (!event._isValid) return;
      var text = event.format("DD/MM/YYYY HH:mm:ss");
    }

    if (this.props.values[name] !== text && this.props.setFieldValue)
      this.props.setFieldValue(name, text);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

  };

  inputOnBlur = event => {
    var date_moment = moment(event.currentTarget.value, `${this.format} ${this.timeFormat}`);

    //invalid date input
    if(event.currentTarget.value.length == 0 && !date_moment._isValid){
      date_moment = '';
    }
    else if (event.currentTarget.value.length != this.dateTimeLengh || !date_moment._isValid) {
      if(this.state.value){

        date_moment = moment(this.state.value);
        this.setState({ value: date_moment._d });
        return;

      }else{ 
        date_moment = moment();
        this.setState({ value: date_moment._d });
      }

    }

    this.handleBlur(date_moment);
  }
 

  render() {

    console.log(`render ${this.props.name} ${this.state.value}`);

    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, ...props } = this.props
    var value = this.state.value || '';

    return (
      <DateTime input={true} dateFormat={this.format} timeFormat={this.timeFormat}
        ref={(input) => { this.nameInput = input; }} 
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        inputProps={{
          onBlur: this.inputOnBlur,
          ...props
        }}
      />
    );
  }
}

export class DateField extends React.Component {

  constructor(props) {
    super(props);

    var name = this.props.name;
    this.state.value = this.props.values[name];
    
    this.format = "DD/MM/YYYY"; 
  }

  state = {
    value: ''
  };

  shouldComponentUpdate(nextProps, nextState) {
    let name = nextProps.name;
    console.log(`shouldComponentUpdate ${name}`);

    if (nextProps.isGetFormData) {
      if (nextProps.values[name] && nextProps.values[name].length >= 10)
        this.state.value = moment(nextProps.values[name].substring(0, 10), this.format)._d;

      else if(!nextProps.values[name]){
        this.state.value = "";
      }

      return true;
    }


    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;

    return true;
  }

  componentDidMount() {
    if (this.props.autoFocus)
      this.nameInput.focus();
  }


  handleChange = event => {
    console.log("handleChange");
    if (!event._isValid) return;
    var text = event;
    this.setState({
      value: text
    });

  };

  handleBlur = event => {

    var name = this.props.name;
    var text = "";
    if (event) {
      if (!event._isValid) return;
      var text = event.format("DD/MM/YYYY HH:mm:ss");
    }

    if (this.props.values[name] !== text && this.props.setFieldValue)
      this.props.setFieldValue(name, text);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

  };

  inputOnBlur = event => {
    var date_moment = moment(event.currentTarget.value, this.format);

    //invalid date input
    if(event.currentTarget.value.length == 0 && !date_moment._isValid){
      date_moment = '';
    }
    else if (event.currentTarget.value.length != 10 || !date_moment._isValid) {
      if(this.state.value){

        date_moment = moment(this.state.value);
        this.setState({ value: date_moment._d });
        return;

      }else{ 
        date_moment = moment();
        this.setState({ value: date_moment._d });
      }

    }

    this.handleBlur(date_moment);
  }
 

  render() {

    console.log(`render ${this.props.name} ${this.state.value}`);

    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, ...props } = this.props
    var value = this.state.value || '';

    return (
      <DateTime input={true} closeOnSelect={true} dateFormat={this.format} timeFormat={false}
        ref={(input) => { this.nameInput = input; }} 
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        inputProps={{
          onBlur: this.inputOnBlur,
          ...props
        }}
      />
    );
  }
}
export class TextField extends React.Component {

  constructor(props) {
    super(props);

    var name = this.props.name;
    this.state.value = this.props.values[name];
  }

  state = {
  };

  handleChange = event => {
    var text = event.currentTarget.value;
    this.setState({
      value: text
    });

  };

  shouldComponentUpdate(nextProps, nextState) {
    let name = nextProps.name;
    if (nextProps.isGetFormData) {
      this.state.value = nextProps.values[name];
      return true;
    }

    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;

    return true;
  }

  handleBlur = event => {
    var name = this.props.name;
    var text = event.currentTarget.value;


    if (!this.props.values[name] && !text) return;

    if (this.props.values[name] !== text && this.props.setFieldValue)
      this.props.setFieldValue(name, text);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  componentDidMount() {
    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {

    //console.log(`render ${this.state.value}`);

    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, ...props } = this.props
    var value = this.state.value || '';
    return (

      <input
        className="form-control"
        ref={(input) => { this.nameInput = input; }}

        {...props}

        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={value}
      />

    );
  }
}

export class NumberField extends React.Component {

  state = {
    propsUpdate: true
  };

  handleChange = event => {
    var text = event.currentTarget.value;
    text = text.replace(/[^0-9.]/g, '');
    this.setState({
      value: text
    });

  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value == this.props.value && nextState.value == this.state.value) return false;
    this.state.propsUpdate = (nextProps.value != this.props.value);
    return true;
  }

  handleBlur = event => {
    var text = event.currentTarget.value;

    if (!this.props.value && !text) return;

    if (this.props.value !== text && this.props.setFieldValue)
      this.props.setFieldValue(this.props.name, text);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  componentDidMount() {
    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {

    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, ...props } = this.props

    if (this.state.propsUpdate) {
      this.state.value = this.props.value;
      this.state.propsUpdate = false;
    }

    return (

      <div className={this.props.error && "is-invalid"}>

        <input className="form-control" type="text"
          ref={(input) => { this.nameInput = input; }}

          {...props}

          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.value || ''}
        />

        {!!this.props.error &&
          (
            <div className="message">
              {this.props.error}
            </div>
          )}
      </div>
    );
  }
}
