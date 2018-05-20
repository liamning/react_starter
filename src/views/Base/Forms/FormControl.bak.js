import React from "react";

import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css';

import Select, { Async } from 'react-select';
import 'react-select/dist/react-select.css';
import { Field } from "formik";

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


const getGeneralMaster = (input, table, createAble) => {

  return fetch(`http://localhost:806/HttpHandler/JsonHandler.ashx?Table=${table}&input=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {

      console.log(json);

      selectDict[table] = {};
      json.forEach(element => {
        element.value = element.Code;
        element.label = element.Desc;
        selectDict[table][element.value] = element;
      });

      if (createAble && input && !json.length)
        json.push({ value: input, label: input });

      return { options: json };
    });
}

export class AsyncSelectField extends React.Component {


  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value == this.props.value) return false;
    return true;
  }

  handleChange = (value) => {
    console.log(value);

    value = value || {};

    if (this.props.getFormData) {
      this.props.getFormData(value.value);
    } else if(this.props.setFieldValue) {
      this.props.setFieldValue(this.props.name, value.value);
    } else if (this.props.onBlur) {
      this.props.onBlur(value.value);
    }

  };

  handleBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event.target.value);
    }
  };

  getOptions = (input) => {

    return getGeneralMaster(input, this.props.tableName, this.props.createAble);
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
      value,
      label,
      setFieldValue,
      setFieldTouched,
      getFormData
    } = this.props;

    var selectedValue = {
      value: value || '',
      label: label || 'Please Select'
    };

    if (value
      && selectDict[tableName]
      && selectDict[tableName][value]) {

      selectedValue = value;

    }

    return (
      <Async
        ignoreCase={false}
        ref={(input) => { this.nameInput = input; }}
        filterOptions={(options, filter, current_values) => { return options; }}
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

  handleChange = value => {
    this.props.setFieldValue(this.props.name, value);
  };


  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value == this.props.value) return false;
    return true;
  }

  handleBlur = (value) => {
  };

  render() {
    console.log(`MyDateTime  ${this.props.name}`);
    return (

      <DateTime input={true} closeOnSelect={true}

        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value || ''}

      />

    );
  }
}

export class TextField extends React.Component {

  state = {
    propsUpdate: true
  };

  handleChange = event => {
    var text = event.currentTarget.value;
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
