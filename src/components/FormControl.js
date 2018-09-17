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

import { Spring } from 'react-spring'


const selectDict = {};

const getGeneralMaster = (input, table, createAble, descField) => {

  return fetch(`${loginInfo.host}/HttpHandler/JsonHandler.ashx?Table=${table}&input=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {


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

        
      //console.log(json);

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
    //clear cache
    if (nextProps.isAfterSave && nextProps.isAfterSave()) {
      this.purgeCache();
    }

    // var name = nextProps.name; 

    // if (nextProps.values[name] == this.props.values[name] && nextState.value == this.state.value) return false;
        
    // //clear state
    // this.state.value = undefined;
    // return true;

    var shouldUpdate = false;
    var name = nextProps.name;

    //internal update
    if(nextState.value != this.state.value)
      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
    
    //validation update
    else if (nextProps.errors.hasOwnProperty(name) 
    && (this.state.error != nextProps.errors[name] || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    nextState.error = nextProps.errors[name];
    return shouldUpdate;
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
      //console.log('handleChange');
      //console.log(value);
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

  getLabel = (value, defaultLabel) => {
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
    return label || defaultLabel;
  }


  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index || '';
    let fieldIndex = `${name}${index}` 
    if(this.props.formComponents && !this.props.formComponents[fieldIndex]) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {
    console.log(`async select ${this.props.name}`);
    //console.log(this.cache);

    const {
      tableName,
      multi,
      name,
      values, errors, validateFieldValue, isSubmitted,formComponents,
      label,
      setFieldValue,
      setFieldTouched,
      getFormData,
      disabled
    } = this.props;

    //update value
    //var value = this.state.value = this.state.value || values[name]  || '';
    var value = this.state.value || '';
    const error = isSubmitted ? this.state.error: '';
    
    //update label 
    var labelValue = this.state.label = this.getLabel(value, values[label]);

    var selectedValue = {
      value: value ,
      label: labelValue 
    };

    //cache
    var cache;
    if(this.props.createAble){
      cache = undefined;
    }else{
      cache = this.cache;
    }
    
    return (
      
      <div className={error && "is-invalid"}>

        <Async disabled={disabled}
          cache={cache} 
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

        {!!error &&
          (
            <div className="message">
              {error}
            </div>
          )}
      </div>
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
  
  isInternal = false;

  state = {
    value: '',
    blurCount: 0,
  };

  blurControl = (count)=>{
    this.state.blurCount+=count;
    //console.log(`==================this.state.blurCount: ${this.state.blurCount}`);
    if(this.state.blurCount <= 0){ 
      if(this.props.onBlur)
        this.props.onBlur(this.state.outputValue);
    }
  };
  blurReset = ()=>{ 
    this.state.blurCount = 2;
  };

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index || '';
    let fieldIndex = `${name}${index}` 
    if(this.props.formComponents && !this.props.formComponents[fieldIndex]) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus &&  this.nameInput)
      this.nameInput.focus();
      //this.nameInput.openCalendar();
  }

  handleChange = event => {
    console.log("handleChange");

    var text = "";
    if (event) {
      if (event._isValid) 
        text = event.format("DD/MM/YYYY HH:mm:ss"); 
      else
        text = moment().format("DD/MM/YYYY HH:mm:ss");
    }
    
    this.isInternal = true;
    this.setState({
      value: text
    });
    

  };

  handleBlur = event => {
    console.log("handleBlur");

    var name = this.props.name;
    var text = '';
    if (event) {
      if (event._isValid) 
       text = event.format("DD/MM/YYYY HH:mm:ss");  
    }

    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text);

    this.state.outputValue = text;
 
    if(this.props.errors.hasOwnProperty(name))
      this.setState({});
  };

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = false;
    var name = nextProps.name;

    //internal update
    if(this.isInternal || nextState.value != this.state.value){
      shouldUpdate = true;
      this.isInternal = false;
    }
    
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
    
    //validation update
    else if (nextProps.errors.hasOwnProperty(name) 
    && (this.state.error != nextProps.errors[name] || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    nextState.error = nextProps.errors[name];
    return shouldUpdate;
  }

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

    const { setFieldValue, setFieldTouched, closeOnTab, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents,  ...props } = this.props

    var name = this.props.name; 
    var value; 

    if (this.state.value 
      && this.state.value.length == 19) {
        //value = moment(this.state.value, this.format + " HH:mm:ss").format(`${this.format} ${this.timeFormat}`);; 
        value = moment(this.state.value, this.format + " HH:mm:ss"); 
    } else {
      value = this.state.value = '';
    }

    const error = isSubmitted ? this.state.error: '';

    return (

      <div className={error && "is-invalid"}>

        <div className="input-group">
          

          <DateTime input={true} dateFormat={this.format} timeFormat={this.timeFormat}

          renderInput={this.renderInput}
          value={value}
          closeOnTab={closeOnTab || true}
          onChange={(e) => {
            this.handleChange(e);
          }}
          onBlur={(e) => {
            this.handleBlur(e);
            this.blurControl(-1);
          }}
          onFocus={(e) => {
            this.blurReset();
          }}

          inputProps={{
            onBlur: (e) => {
              this.inputOnBlur(e);
              this.blurControl(-1);
            },
            ...props
          }}
          />

          <div className="input-group-append">
            <span className="input-group-text"><i className="fa fa-calendar"></i></span>
          </div>
        </div>
         
        {!!error &&
          (
            <div className="message">
              {error}
            </div>
          )}
      </div>

    );
  }
}

export class DateField extends React.Component {

  constructor(props) {
    super(props);

    this.format = "DD/MM/YYYY"; 
  }

  
  isInternal = false;

  state = {
    value: ''
  };

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index || '';
    let fieldIndex = `${name}${index}` 
    if(this.props.formComponents && !this.props.formComponents[fieldIndex]) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }


  handleChange = event => { 
    console.log("handleChange");
    
    var text = "";
    if (event) {
      if (event._isValid) 
        text = event.format("DD/MM/YYYY HH:mm:ss"); 
      else
        text = moment().format("DD/MM/YYYY HH:mm:ss");
    }
    
    this.isInternal = true;
    this.setState({
      value: text
    });
    

  };

  handleBlur = event => {

    console.log("handleBlur");

    var name = this.props.name;
    var text = '';
    if (event) {
      if (event._isValid) 
       text = event.format("DD/MM/YYYY HH:mm:ss");  
    }

    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text);

    this.state.outputValue = text;
 
    if(this.props.errors.hasOwnProperty(name))
      this.setState({});
  };

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = false;
    var name = nextProps.name;

    //internal update
    if(this.isInternal || nextState.value != this.state.value){
      shouldUpdate = true;
      this.isInternal = false;
    }
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
    
    //validation update
    else if (nextProps.errors.hasOwnProperty(name) 
    && (this.state.error != nextProps.errors[name] || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    nextState.error = nextProps.errors[name];
    return shouldUpdate;
    
  }

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

    //console.log(`render ${this.props.name} ${this.state.value}`);

    // const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents, ...props } = this.props
 
    // var name = this.props.name;
    
    // if (!this.state.value && values[name] && values[name].length >= 10)
    //   this.state.value = moment(values[name].substring(0, 10), this.format)._d;
 
    // var value =this.state.value = this.state.value || '';
//////////////////////
    console.log(`render ${this.props.name} ${this.state.value}`);

    const { setFieldValue, setFieldTouched, closeOnTab, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents,  ...props } = this.props

    var name = this.props.name; 
    var value; 

    if (this.state.value 
      && this.state.value.length >= 10) {
        //value = moment(this.state.value, this.format + " HH:mm:ss").format(`${this.format} ${this.timeFormat}`);; 
        value = moment(this.state.value, this.format + " HH:mm:ss"); 
    } else {
      value = this.state.value = '';
    }

    const error = isSubmitted ? this.state.error: '';


    return (

      <div className={error && "is-invalid"}>

        <div className="input-group">
         
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

          <div className="input-group-append">
            <span className="input-group-text"><i className="fa fa-calendar"></i></span>
          </div>
        </div>
         
        {!!error &&
          (
            <div className="message">
              {error}
            </div>
          )}
      </div>
      
    );
  }
}

export class TextField extends React.Component {

  state = {
  };

  handleChange = event => {
    var text = event.currentTarget.value;
    this.setState({
      value: text
    });

  };

  shouldComponentUpdate(nextProps, nextState) {
    
    var shouldUpdate = false;
    var name = nextProps.name;

    //internal update
    if(nextState.value != this.state.value)
      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
    
    
    //validation update
    else if (nextProps.errors.hasOwnProperty(name) 
    && (this.state.error != nextProps.errors[name] || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    nextState.error = nextProps.errors[name];
    return shouldUpdate;
  }

  handleBlur = event => {
    var name = this.props.name;
    var text = event.currentTarget.value;
 

    if (this.props.onBlur) {
      this.props.onBlur(event.currentTarget.value);
    }

    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text);

    
    if(this.props.errors.hasOwnProperty(name))
      this.setState({});

  };

  componentDidMount() {
    let name = this.props.name;
    let index = this.props.index || '';
    let fieldIndex = `${name}${index}` 
    if(this.props.formComponents && !this.props.formComponents[fieldIndex]) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {
  
    console.log(`render TextField ${this.state.value}`);
    
    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents,  ...props } = this.props

    const value = this.state.value || ''; 

    const error = isSubmitted ? this.state.error: '';
      
    return (

      <div className={error && "is-invalid"}>

        <input className="form-control" type="text"
          ref={(input) => { this.nameInput = input; }}

          {...props}

          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value}
        />

        {!!error &&
          (
            <div className="message">
              {error}
            </div>
          )}
      </div>
    );
  }
}

export class NumberField extends React.Component {

  constructor(props) {
    super(props);
  }

  state = { 
  };

  handleChange = event => {
    var text = event.currentTarget.value;

    if(text && !/^([1-9][0-9]+|[0-9])(\.[0-9]*)?$/.test(text)) return;

    this.setState({
      value: text
    });

  };

  handleBlur = event => {
    var name = this.props.name;
    var text = event.currentTarget.value.replace(/\.$/g,'');
 

    if (this.props.onBlur) {
      this.props.onBlur(text);
    }

    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text);


    if(text != event.currentTarget.value
      || this.props.errors.hasOwnProperty(name))
    this.setState({});
 
  };

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index || '';
    let fieldIndex = `${name}${index}` 
    if(this.props.formComponents && !this.props.formComponents[fieldIndex]) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    var shouldUpdate = false;
    var name = nextProps.name;

    //internal update
    if(nextState.value != this.state.value)
      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
    
    
    //validation update
    else if (nextProps.errors.hasOwnProperty(name) 
    && (this.state.error != nextProps.errors[name] || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    nextState.error = nextProps.errors[name];
    return shouldUpdate;
  }

  render() {
  
    console.log(`render NumberField ${this.state.value}`);
    
    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents,  ...props } = this.props

    const value = (this.state.value || this.state.value == 0) ? this.state.value: ''; 

    const error = isSubmitted ? this.state.error: '';
      
    return (

      <div className={error && "is-invalid"}>

        <input className="form-control text-right" type="text"
          ref={(input) => { this.nameInput = input; }}

          {...props}

          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value}
        />

        {!!error &&
          (
            <div className="message">
              {error}
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
