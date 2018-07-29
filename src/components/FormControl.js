import React from "react";

import DateTime from 'react-datetime'
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

import Select, { Async } from 'react-select';
import 'react-select/dist/react-select.css';
// import { Field } from "formik";

var debounce = require('debounce-promise')
import { loginInfo } from '../global';
//import { FastField } from "../../node_modules/formik";

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

  return fetch(`${loginInfo.host}/HttpHandler/JsonHandler.ashx?Table=${table}&input=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {

      console.log(json);

      //selectDict[table] = {};
      if(!selectDict[table])
      selectDict[table] = {};
      
      json.forEach(element => {
        element.value = element.Code;
        element.label = element.Desc || element.Code;
        selectDict[table][element.value] = element;
      });
      if (createAble && input && !json.length)
        json.push({ value: input, label: input });

      return { options: json };
    });
}

export class AsyncSelectField extends React.Component {

  state = { 
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
 
    var name = nextProps.name; 

    //clear cache
    if (nextProps.isAfterSave && nextProps.isAfterSave()) {
      this.purgeCache();
    }
    
    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;
        
    //clear state
    this.state.value = undefined;
    return true;
  }

  handleChange = (value, par1, par2) => {

    value = value || {
      value: undefined,
      label: undefined,
    };

    if (this.props.getFormData) {
      this.state = {};
      this.props.getFormData({ Code: value.value });
    } else {
      if (this.props.setFieldValue) {
        this.props.setFieldValue(this.props.name, value.value);
      }
      console.log('handleChange');
      console.log(value);
      this.setState(value);

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
    return getGeneralMaster(input, this.props.tableName, this.props.createAble, this.props.label);
  }

  getLabel = (value) => {
    var label = undefined;
    var tableName = this.props.tableName;
    if(!value){
      label = "Please select";
    }
    else if (value
      && selectDict[tableName]
      && selectDict[tableName][value]) {
        label = selectDict[tableName][value].label;
    }
    return label;
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
      getFormData,
      disabled
    } = this.props;

    //update value
    var value = this.state.value = this.state.value || values[name]  || '';
    
    //update label 
    var labelValue = this.state.label = this.getLabel(value) || values[label] || 'Please Select';

    var selectedValue = {
      value: value ,
      label: labelValue 
    };
 

    return (
      <Async disabled={disabled}
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
 
    this.format = "DD/MM/YYYY"; 
    this.timeFormat = "hh:mm A"; 
    this.dateTimeLengh = 19;
    
  }

  state = {
    value: '',
    blurCount: 0,
  };

  blurControl = (count)=>{
    this.state.blurCount+=count;
    console.log(`==================this.state.blurCount: ${this.state.blurCount}`);
    if(this.state.blurCount <= 0){ 
      if(this.props.onBlur)
        this.props.onBlur(this.state.outputValue);
    }
  };
  blurReset = ()=>{ 
    this.state.blurCount = 2;
  };

  shouldComponentUpdate(nextProps, nextState) {
    let name = nextProps.name;
    console.log(`shouldComponentUpdate ${name}`);

    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;

    this.state.value = undefined;
    return true;
  }

  componentDidMount() {
    if (this.props.autoFocus &&  this.nameInput)
      this.nameInput.focus();
      //this.nameInput.openCalendar();
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

    this.state.outputValue = text;

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
 
  renderInput = props=>{ 
    return (
        <div>
            <input ref={(input) => {  
              this.nameInput = input; 
        
              }}  {...props} /> 
        </div>
    );
}

  render() {

    console.log(`render ${this.props.name} ${this.state.value}`);

    const { setFieldValue, setFieldTouched, autoFocus, closeOnTab, onChange, onBlur, isGetFormData, ...props } = this.props;
    
    var name = this.props.name; 
    if (!this.state.value && this.props.values[name] && this.props.values[name].length == 19)
      this.state.value = moment(this.props.values[name], this.format + " HH:mm:ss")._d;

    var value = this.state.value = this.state.value || '';

    return (
      <DateTime input={true} dateFormat={this.format} timeFormat={this.timeFormat}
        
        renderInput={this.renderInput}
        value={value}
        closeOnTab={closeOnTab || true}
        onChange={(e)=>{
          this.handleChange(e);
        }}
        onBlur={(e)=>{
          this.handleBlur(e);
          this.blurControl(-1);
        }} 
        onFocus={(e)=>{ 
          this.blurReset();
        }} 

        // onChange={()=>{ 
        //   console.log("=====================handleChange===================");
        // }}
        // onBlur={()=>{ 
        //   console.log("=====================onBlur===================");
        // }}
        // onFocus={()=>{
        //   console.log("=====================onFocus===================");
        // }} 
        inputProps={{
          onBlur: (e)=>{
            this.inputOnBlur(e);
            this.blurControl(-1);
          },
          // onBlur: ()=>{ 
          //   console.log("=====================inputOnBlur===================");
          // },
          ...props
        }}
      />
    );
  }
}

export class DateField extends React.Component {

  constructor(props) {
    super(props);

    this.format = "DD/MM/YYYY"; 
  }

  state = {
    value: ''
  };

  shouldComponentUpdate(nextProps, nextState) {
    let name = nextProps.name;
    console.log(`shouldComponentUpdate ${name}`);

    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;

    this.state.value = undefined;
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

    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, ...props } = this.props
 
    var name = this.props.name;
    
    if (!this.state.value && values[name] && values[name].length >= 10)
      this.state.value = moment(values[name].substring(0, 10), this.format)._d;
 
    var value =this.state.value = this.state.value || '';

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

  state = {
    isPropUpdate: true
  };

  handleChange = event => {
    var text = event.currentTarget.value;
    this.setState({
      value: text
    });

  };

  shouldComponentUpdate(nextProps, nextState) {
    let name = nextProps.name;
    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;

    //console.log(`===========nextState: ${nextState.value} ---state: ${this.state.value}`);
    //console.log(`============nextProps: ${nextProps.values[name]} --- props: ${this.props.values[name]}`);
    
    if(nextState.value == this.state.value)
      this.state.isPropUpdate = true; 

    return true;
  }

  handleBlur = event => {
    var name = this.props.name;
    var text = event.currentTarget.value;


    if (this.props.onBlur) {
      this.props.onBlur(event.currentTarget.value);
    }

    if (!this.props.values[name] && !text) return;

    if (this.props.values[name] !== text && this.props.setFieldValue)
      this.props.setFieldValue(name, text);

  };

  componentDidMount() {
    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {

    console.log(`render TextField ${this.state.value}`);
    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, ...props } = this.props

    var name = this.props.name;
    var value = this.state.value = (this.state.isPropUpdate ? values[name] : this.state.value)  || '';
    
    this.state.isPropUpdate = false; 
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

  constructor(props) {
    super(props);
    // var ref = React.createRef();
    // console.log(ref);
  }

  state = {
    isPropUpdate: true
  };

  handleChange = event => {
    var text = event.currentTarget.value;
    text = text.replace(/[^0-9.]/g, '');
    this.setState({
      value: text
    });

  };

  shouldComponentUpdate(nextProps, nextState) {
    let name = nextProps.name;
    if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;

    if(nextState.value == this.state.value)
      this.state.isPropUpdate = true;

    return true;
  }

  handleBlur = event => {
    var name = this.props.name;
    var text = event.currentTarget.value;


    if (this.props.onBlur) {
      this.props.onBlur(event.currentTarget.value);
    }

    if (!this.props.values[name] && !text) return;

    if (this.props.values[name] !== text && this.props.setFieldValue)
      this.props.setFieldValue(name, text);
  };

  componentDidMount() {
    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {
 
    
    console.log(`render TextField ${this.state.value}`);
    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, ...props } = this.props

    var name = this.props.name;
    
    var value = this.state.value = (this.state.isPropUpdate ? values[name] : this.state.value)  || ''; 
    
    this.state.isPropUpdate = false;

    return (

      <div className={this.props.error && "is-invalid"}>

        <input className="form-control text-right" type="text"
          ref={(input) => { this.nameInput = input; }}

          {...props}

          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value}
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

export const DisplayJson = props => {
  return (
    
  <div className="mt-1">
  <h3 style={{ fontFamily: 'monospace' }} />
  <pre
    style={{
      background: '#f6f8fa', 
      padding: '.5rem',
    }}
  > 
  //For debug only <br/>
  //Current Form Data <br/>
    {JSON.stringify(props, null, 2)}
  </pre>
</div>
  );
}
