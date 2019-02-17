import React, { Component } from 'react';

import DateTime from 'react-datetime'
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

import Select, { Async } from 'react-select';
import 'react-select/dist/react-select.css';
// import { Field } from "formik";

var debounce = require('debounce-promise')
import { loginInfo, getFieldIndex } from '../global';



// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';

// // Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

//import { FastField } from "../../node_modules/formik";
 

const selectDict = {};

const getGeneralMaster = (input, table, createAble, updateLabel) => {
  // let data = JSON.stringify({ Table: table, Input: input, session: loginInfo.Session});

  return fetch(`${loginInfo.host}/HttpHandler/JsonHandler.ashx?Table=${table}&input=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {
  
      if(!selectDict[table])
      selectDict[table] = {};
      
      json.forEach(element => {
        element.value = element.Code;
        element.label = element.Desc || element.Code;
        selectDict[table][element.value] = element;
      });
      if (createAble && input && !json.length)
        json.push({ value: input, label: input });
        selectDict[table][input] = { value: input, label: input };

        setTimeout(() => {
          updateLabel();  
        }, 1);
        
      //console.log(json);

      return { options: json };
    });
}

export class AsyncSelectField extends React.Component {

  constructor(props) {
    super(props);

    var name = props.name;
    var index = props.index;
    this.nameIndex = getFieldIndex(name,index);
    this.shouldUpdate = false;

    this.state = { 
      value: props.values[name],
      error: props.errors[this.nameIndex],
    }
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
        this.props.setFieldValue(this.props.name, value.value, this.props.index, value.label); 
      }
        
      this.setState(value);

    }
  };

  handleBlur = (event) => {

    if (this.props.onBlur) {
      this.props.onBlur();



    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    //clear cache
    if (nextProps.isAfterSave && nextProps.isAfterSave()) {
      this.purgeCache();
    }

    var shouldUpdate = this.shouldUpdate;
    var name = nextProps.name;
    var index = nextProps.index;
    this.nameIndex = getFieldIndex(name,index); 

    //internal update
    if(nextState.value != this.state.value)
      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
    
    
    //validation update
    else if (nextProps.errors.hasOwnProperty(this.nameIndex) 
    && (this.state.error != nextProps.errors[this.nameIndex] 
      || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    else if(this.state.disabled != nextProps.disableds[this.nameIndex] ){
      shouldUpdate = true; 
      this.state.disabled = nextProps.disableds[this.nameIndex];
    }
    nextState.error = nextProps.errors[this.nameIndex];
    
    if(shouldUpdate){
      this.shouldUpdate = false;
      return true;
    }
    return shouldUpdate;
  }

  getOptions = (input) => {
    
    return getGeneralMaster(input, this.props.tableName, this.props.createAble, this.updateLabel);
  }

  updateLabel = () => {

    console.log("start updateLabel");
    var tableName = this.props.tableName;
    var value = this.state.value;
    if (!value 
      || (selectDict[tableName][value] && this.state.label == selectDict[tableName][value].label)) return;
    this.shouldUpdate = true;
    this.setState({});
    console.log("updateLabel end");
  }
  getLabel = (value) => {
    var label = "Please select";
    var tableName = this.props.tableName;
    // if (value && this.props.name == this.props.label) { 
    //   label = value;
    // }
    if (value && this.props.label) { 
      label = this.props.values[this.props.label];
    }
    else if (value
      && selectDict[tableName]
      && selectDict[tableName][value]) {
      label = selectDict[tableName][value].label;
    }
    return label;
  }

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if(this.props.formComponents) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }

  render() {
    console.log(`async select ${this.props.name}`);
    console.log(this.cache);

    const {
      tableName,
      multi,
      name,
      values, errors, validateFieldValue, isSubmitted, formComponents,
      label,
      setFieldValue,
      setFieldTouched,
      getFormData,
      disabled
    } = this.props;





    var value = this.state.value || '';
    const error = isSubmitted ? this.state.error : '';

    //update label 
    //var labelValue = this.state.label = this.getLabel(value, values[label]);
    var labelValue = this.state.label = this.getLabel(value);

    var selectedValue = {
      value: value,
      label: labelValue
    };

    //cache
    // var cache;
    // if (this.props.createAble) {
    //   cache = undefined;
    // } else {
    //   cache = this.cache;
    // }


    
    return (
      
      <div className={error && "is-invalid"}>

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
          disabled={this.props.disableds[this.nameIndex]}
        />

        {error &&
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







 
    var name = props.name;
    var index = props.index;
    this.nameIndex = getFieldIndex(name,index);







    this.state = { 
      value: props.values[name],
      error: props.errors[this.nameIndex],
      isInternal: false,
    }













    
  }

  
  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if(this.props.formComponents ) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus &&  this.nameInput)
      this.nameInput.focus();



  }

  handleChange = event => {
    //console.log("handleChange");


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
    //console.log("handleBlur");

    var name = this.props.name;
    var text = '';
    if (event) {
      if (event._isValid) 
       text = event.format("DD/MM/YYYY HH:mm:ss");  
    }

    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text, this.props.index);



  
    if(this.props.errors.hasOwnProperty(name))
      this.setState({});
  };










  shouldComponentUpdate(nextProps, nextState) {
    
    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    this.nameIndex = getFieldIndex(name,index); 










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
    else if (nextProps.errors.hasOwnProperty(this.nameIndex) 
    && (this.state.error != nextProps.errors[this.nameIndex] 
      || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    else if(this.state.disabled != nextProps.disableds[this.nameIndex] ){
      shouldUpdate = true; 
      this.state.disabled = nextProps.disableds[this.nameIndex];
    }
    nextState.error = nextProps.errors[this.nameIndex];
    return shouldUpdate;
  }


  renderInput = props => {
    return (
      <div>
        <input ref={(input) => {
          this.nameInput = input;


        }}  {...props} disabled={this.props.disableds[this.nameIndex]} />
      </div>
    );
  }

  render() {

    //console.log(`render ${this.props.name} ${this.state.value}`);

    const { setFieldValue, setFieldTouched, closeOnTab, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents,  ...restProps } = this.props






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

          <DateTime input={true} closeOnTab={closeOnTab || true} dateFormat={this.format} timeFormat={this.timeFormat}

            renderInput={this.renderInput}
            value={value} disabled={this.props.disableds[this.nameIndex]} 
            onChange={this.handleChange}
            onBlur={this.handleBlur} 
            inputProps={restProps}

          />

          <div className="input-group-append">
            <span className="input-group-text"><i className="fa fa-calendar"></i></span>
          </div>
        </div>

        {error &&
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











    var name = props.name;
    var index = props.index;
    this.nameIndex = getFieldIndex(name,index);




    this.state = { 
      value: props.values[name],
      error: props.errors[this.nameIndex],
      isInternal: false,
    }
  }

 
  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if(this.props.formComponents ) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }


  handleChange = event => { 
    //console.log("handleChange");
    
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

    //console.log("handleBlur");

    var name = this.props.name;
    var text = '';
    if (event) {
      if (event._isValid) 
       text = event.format("DD/MM/YYYY HH:mm:ss");  
    }

    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text, this.props.index);





 
    if(this.props.errors.hasOwnProperty(name))
      this.setState({});
  };














  shouldComponentUpdate(nextProps, nextState) {
    
    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    this.nameIndex = getFieldIndex(name,index); 






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
    else if (nextProps.errors.hasOwnProperty(this.nameIndex) 
    && (this.state.error != nextProps.errors[this.nameIndex] 
      || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    else if(this.state.disabled != nextProps.disableds[this.nameIndex] ){
      shouldUpdate = true; 
      this.state.disabled = nextProps.disableds[this.nameIndex];
    }
    nextState.error = nextProps.errors[this.nameIndex];
    return shouldUpdate;
    
  }


  renderInput = props => {
    return (
      <div>
        <input ref={(input) => {
          this.nameInput = input;
            
        }} {...props} disabled={this.props.disableds[this.nameIndex]} />
      </div>
    );
  }


  render() {


    //console.log(`render ${this.props.name} ${this.state.value}`);

    const { setFieldValue, setFieldTouched, closeOnTab, closeOnSelect, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents,  ...restProps } = this.props



    var name = this.props.name; 
    var tmpCloseOnSelect = true;
    if(closeOnSelect === false){
      tmpCloseOnSelect = false;
    }
    




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
         
          <DateTime input={true} closeOnTab={true} closeOnSelect={tmpCloseOnSelect} dateFormat={this.format} timeFormat={false}


            renderInput={this.renderInput}
            value={value} 
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            inputProps={restProps}
          />

          <div className="input-group-append">
            <span className="input-group-text"><i className="fa fa-calendar"></i></span>
          </div>
        </div>
         
        {error &&
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



  constructor(props) {
    super(props);
 

    var name = props.name;
    var index = props.index;
    this.nameIndex = getFieldIndex(name,index);

    this.state = { 
      value: props.values[name],
      error: props.errors[this.nameIndex],
    }
  }
 
  handleChange = event => {
    var text = event.currentTarget.value;
    this.setState({
      value: text
    });

  };

  handleBlur = event => {
    var name = this.props.name;
    var text = event.currentTarget.value;
 
    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text, this.props.index);

    if(this.props.errors.hasOwnProperty(name))
      this.setState({});
  };

  focus(){
    console.log(this);
    this.nameInput.focus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    //console.log(`Text field shouldComponentUpdate  ${this.props.name}`);



    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    this.nameIndex = getFieldIndex(name,index); 




    //internal update
    if(nextState.value != this.state.value)
      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
 
    //validation update
    else if (nextProps.errors.hasOwnProperty(this.nameIndex) 
    && (this.state.error != nextProps.errors[this.nameIndex] 
      || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }  
     
    else if(this.state.disabled != nextProps.disableds[this.nameIndex] ){
      shouldUpdate = true; 
      this.state.disabled = nextProps.disableds[this.nameIndex];
    }

    nextState.error = nextProps.errors[this.nameIndex];
    return shouldUpdate;
  }

  componentDidMount() {
    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if(this.props.formComponents ) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }
  
  componentWillUnmount() {
    
    // let name = this.props.name;
    // let index = this.props.index;
    // let fieldIndex = getFieldIndex(name, index);
    // if(this.props.formComponents ) delete this.props.formComponents[fieldIndex];
    
  }

  render() {

    //console.log(`render TextField ${this.props.name} ${this.state.value} ${this.state.error}`);

    const { Prefix,Suffix,multipleLine, setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted, formComponents, ...restProps } = this.props



    const value = this.state.value || '';

    const error = isSubmitted ? this.state.error : '';

    return (




      <div className={error && "is-invalid"}>


        <div className="input-group">
 
          {Prefix &&
          (
            <Prefix></Prefix>
          )}

          {!multipleLine
            ? <input className="form-control" type="text"
              ref={(input) => { this.nameInput = input; }}

              {...restProps}

              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={value} disabled={this.props.disableds[this.nameIndex]}
            />
            : <textarea className="form-control" type="text"
              ref={(input) => { this.nameInput = input; }}

              {...restProps}

              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={value} disabled={this.props.disableds[this.nameIndex]}
            />}
          
          {Suffix &&
          (
            <Suffix></Suffix>
          )}
          
        </div>

        {error &&
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


    var name = props.name;
    var index = props.index;
    this.nameIndex = getFieldIndex(name,index);

    this.state = { 

      value: props.values[name],
      error: props.errors[this.nameIndex],
    }
  }

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







 
    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text, this.props.index);




    if(text != event.currentTarget.value
      || this.props.errors.hasOwnProperty(name))
    this.setState({});

 
  };








  shouldComponentUpdate(nextProps, nextState) {
    
    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    this.nameIndex = getFieldIndex(name,index); 

    //internal update
    if(nextState.value != this.state.value)


      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
    
    
    //validation update
    else if (nextProps.errors.hasOwnProperty(this.nameIndex) 
    && (this.state.error != nextProps.errors[this.nameIndex] 
      || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }
    else if(this.state.disabled != nextProps.disableds[this.nameIndex] ){
      shouldUpdate = true; 
      this.state.disabled = nextProps.disableds[this.nameIndex];
    }
    nextState.error = nextProps.errors[this.nameIndex];
    return shouldUpdate;
  }






  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if(this.props.formComponents ) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }
  render() {
  
    //console.log(`render NumberField ${this.state.value}`);
    
    const { setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted,formComponents,  ...restProps } = this.props

    const value = (this.state.value || this.state.value == 0) ? this.state.value: ''; 

    const error = isSubmitted ? this.state.error: '';
      
    return (

      <div className={error && "is-invalid"}>

        <input className="form-control text-right" type="text"
        
          ref={(input) => { this.nameInput = input; }}

          {...restProps}

          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value} disabled={this.props.disableds[this.nameIndex]}
        />

        {error &&
          (
            <div className="message">
              {error}
            </div>
          )}
      </div>
    );
  }
}

export class FileField extends React.Component {


  constructor(props) {
    super(props);
 
    var name = props.name;
    var index = props.index;
    this.nameIndex = getFieldIndex(name,index);
    this.fileInput = React.createRef();
    this.state = { 
      value: props.values[name],
      error: props.errors[this.nameIndex],
    }
    this.fileObj = {};
  }
 
  handleChange = event => {
    console.log("handleChange", this.fileInput.current.files);
    console.log("handleChange", this.fileInput.current.files[0].name);
    


    if (this.fileInput.current.files.length >= 1) {

      var reader = new FileReader();
      reader.onload = (loadEvent) => {

        // console.log("this.fileInput.current.files[0]", this.fileInput.current.files[0]);
        // console.log("loadEvent.target", loadEvent.target);
        // console.log("loadEvent.target.result", loadEvent.target.result);
        // return;

        // this.fileObj.filereadOrigin = loadEvent.target.result;
        // this.fileObj.fileread1 = loadEvent.target.result.split("base64,")[0];
        this.fileObj.mime = loadEvent.target.result.split("base64,")[0];
        this.fileObj.data = loadEvent.target.result.split("base64,")[1];
        this.fileObj.ext = this.fileInput.current.files[0].name.substr(this.fileInput.current.files[0].name.lastIndexOf('.'));

         
      this.props.values[this.props.name] = this.fileObj.data;
      this.setState({
        filename: this.fileInput.current.files[0].name,
      });
      }

       reader.readAsDataURL(this.fileInput.current.files[0]);
      // reader.readAsArrayBuffer(this.fileInput.current.files[0]);
     // reader.readAsText(this.fileInput.current.files[0]);

    }


  };

  // handleBlur = event => {
  //   var name = this.props.name;
  //   var text = event.currentTarget.value;
 
  //   if (this.props.setFieldValue)
  //     this.props.setFieldValue(name, text, this.props.index);

  //   if(this.props.errors.hasOwnProperty(name))
  //     this.setState({});
  // };

  focus(){
    console.log(this);
    this.fileInput.focus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    //console.log(`Text field shouldComponentUpdate  ${this.props.name}`);

    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    this.nameIndex = getFieldIndex(name,index); 

    //internal update
    if(nextState.value != this.state.value
      || nextState.filename != this.state.filename)
      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
 
    //validation update
    else if (nextProps.errors.hasOwnProperty(this.nameIndex) 
    && (this.state.error != nextProps.errors[this.nameIndex] 
      || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }  
     
    else if(this.state.disabled != nextProps.disableds[this.nameIndex] ){
      shouldUpdate = true; 
      this.state.disabled = nextProps.disableds[this.nameIndex];
    }

    nextState.error = nextProps.errors[this.nameIndex];
    return shouldUpdate;
  }

  componentDidMount() {
    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if(this.props.formComponents ) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }
  
  componentWillUnmount() {
    
    // let name = this.props.name;
    // let index = this.props.index;
    // let fieldIndex = getFieldIndex(name, index);
    // if(this.props.formComponents ) delete this.props.formComponents[fieldIndex];
    
  }

  render() {

    //console.log(`render TextField ${this.props.name} ${this.state.value} ${this.state.error}`);

    const { Prefix,Suffix,multipleLine, setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted, formComponents, ...restProps } = this.props



    const value = this.state.value || '';

    const error = isSubmitted ? this.state.error : '';

    return (




      <div className={error && "is-invalid"}>


        <div className="input-group">

          <input 
          className="form-control" 
          type="file"
          ref={this.fileInput}
          style={{display: this.state.filename ? "none" : 'block' }}

            {...restProps}

            onChange={this.handleChange}
            // onBlur={this.handleBlur}
            // value={value} 
            // disabled={this.props.disableds[this.nameIndex]}
          />
          {this.state.filename && <div
          className="form-control"  
          >{this.state.filename}
          
          <i className="fa fa-close pull-right"
          onClick={()=>{
            this.setState({
              filename: ""
            });
            
            this.fileInput.current.value = null;
          }}
          style={{lineHeight:1.5}}></i></div>}

        </div>

        {error &&
          (
            <div className="message">
              {error}
            </div>
          )}
      </div>
    );
  }
}


export class HTMLEditField extends React.Component {



  constructor(props) {
    super(props);
 

    var name = props.name;
    var index = props.index;
    this.nameIndex = getFieldIndex(name,index);

    this.state = { 
      value: props.values[name],
      error: props.errors[this.nameIndex],
    }
  }
 
  handleChange = event => {
    // var text = event.currentTarget.value;
    // this.setState({
    //   value: text
    // });

    var text = event;
    var name = this.props.name;
    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text, this.props.index);

      console.log(text);
  };

  config = {
    // toolbarInline: true,
    charCounterCount: false,
    placeholderText: 'Share what\'s on your mind...',  
    heightMin: 500,
    // heightMax: 800,
    width: '100%',
  }

  handleBlur = event => {
    var name = this.props.name;
    var text = event.currentTarget.value;
 
    if (this.props.setFieldValue)
      this.props.setFieldValue(name, text, this.props.index);

    if(this.props.errors.hasOwnProperty(name))
      this.setState({});
  };

  focus(){
    console.log(this);
    this.nameInput.focus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    //console.log(`Text field shouldComponentUpdate  ${this.props.name}`);



    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    this.nameIndex = getFieldIndex(name,index); 




    //internal update
    if(nextState.value != this.state.value)
      shouldUpdate = true;
    
    //props update
    else if (this.state.value != nextProps.values[name]){ 
      shouldUpdate = true;
      nextState.value = nextProps.values[name];
    }
 
    //validation update
    else if (nextProps.errors.hasOwnProperty(this.nameIndex) 
    && (this.state.error != nextProps.errors[this.nameIndex] 
      || this.props.isSubmitted != nextProps.isSubmitted)){
      shouldUpdate = true; 
    }  
     
    else if(this.state.disabled != nextProps.disableds[this.nameIndex] ){
      shouldUpdate = true; 
      this.state.disabled = nextProps.disableds[this.nameIndex];
    }

    nextState.error = nextProps.errors[this.nameIndex];
    return shouldUpdate;
  }

  componentDidMount() {
    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if(this.props.formComponents ) this.props.formComponents[fieldIndex] = this;

    if (this.props.autoFocus)
      this.nameInput.focus();
  }
  
  componentWillUnmount() {
    
    // let name = this.props.name;
    // let index = this.props.index;
    // let fieldIndex = getFieldIndex(name, index);
    // if(this.props.formComponents ) delete this.props.formComponents[fieldIndex];
    
  }

  render() {

    //console.log(`render TextField ${this.props.name} ${this.state.value} ${this.state.error}`);

    const { Prefix,Suffix,multipleLine, setFieldValue, setFieldTouched, autoFocus, onChange, onBlur, isGetFormData, values, errors, validateFieldValue, isSubmitted, formComponents, ...restProps } = this.props



    const value = this.state.value || '';

    const error = isSubmitted ? this.state.error : '';

    return (

      <div className={error && "is-invalid"}>

        <div className="input-group">
 
          {Prefix &&
          (
            <Prefix></Prefix>
          )}

            <FroalaEditor 
              ref={(input) => { this.nameInput = input; }}

              {...restProps}
              config={this.config}
              model={value}
              onModelChange={this.handleChange}

              // onChange={this.handleChange}
              // onBlur={this.handleBlur}
              // value={value} disabled={this.props.disableds[this.nameIndex]}
              tag='textarea'
            />
          
          {Suffix &&
          (
            <Suffix></Suffix>
          )}
          
        </div>

        {error &&
          (
            <div className="message">
              {error}
            </div>
          )}
      </div>
    );
  }
}


export class DisplayJson extends React.Component {

  constructor(props) {
    super(props);
  }
  
  state = {
    height:10000
  }

  render(){

    var props = this.props;
    return "";
    return (
    
      <div className="mt-1" style={{maxHeight: `${this.state.height}px`, overflow:'hidden'}} onClick={()=>{
        return;
        if(this.state.height == 10000)
          this.setState({height:35});
        else
          this.setState({height:10000});

      }}>
      <h3 style={{ fontFamily: 'monospace' }} />
      <pre
        style={{
          background: '#f6f8fa', 
          padding: '.5rem',
        }}
      > 
      //For debug only <br/>
      {/* //Current Form Data <br/> */}
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
    );
  }
} 