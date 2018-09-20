import React from "react";
import moment from 'moment';

import { getFieldIndex } from '../global';

import { AsyncSelectField, DateTimeField,DateField, TextField, NumberField } from "./FormControl";

export class InlineNumberField extends React.Component {


  constructor(props) {
    super(props);

    let name = this.props.name;
    let index = this.props.index;

    this.state = {
      readonly: true,
      value: props.data[index][name]
    }

  }

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if (this.props.formComponents) this.props.formComponents[fieldIndex] = this;

  }

  componentWillUnmount() {

  }


  shouldComponentUpdate(nextProps, nextState) {

    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    var nameIndex = getFieldIndex(name, index);

    if (nextState.readonly != this.state.readonly) shouldUpdate = true;

    //internal update
    if (nextState.value != this.state.value)
      shouldUpdate = true;

    //props update
    else if (this.state.value != nextProps.data[index][name]) {
      shouldUpdate = true;
      nextState.value = nextProps.data[index][name];
      nextState.readonly = true;
    }

    //validation update
    else if (nextProps.errors.hasOwnProperty(nameIndex)
      && (this.state.error != nextProps.errors[nameIndex]
        || this.props.isSubmitted != nextProps.isSubmitted)) {
      shouldUpdate = true;
    }

    nextState.error = nextProps.errors[nameIndex];

    return shouldUpdate;

  }

  render() {

    const {
      setFieldValue,
      data,
      name,
      index,
      errors,
      isSubmitted,
      formComponents,
      ...restProps } = this.props

    const value = (this.state.value == undefined ? '' : this.state.value);
    var fieldKey = getFieldIndex(name, index);

    if (this.state.error && isSubmitted) {
      this.state.readonly = false;
    }


    if (this.state.readonly)
      return (
        <div className="form-control text-right" onClick={() => this.setState({ readonly: false })}>
          {value}
        </div>
      );
    else
      return (<NumberField 
        ref={(input) => { this.nameInput = input; }}
        values={data[index]}
        index={index}
        errors={errors}
        name={name}
        autoFocus={true}
        isSubmitted={isSubmitted}
        setFieldValue={(name, value) => {

          this.props.setFieldValue(name, index, value);
          this.state.value = value;

          if (errors[fieldKey] && isSubmitted) {
            this.nameInput.setState({});
          }
          else
            this.setState({
              readonly: true,
            });

        }}
        />);
  }
}

export class InlineTextField extends React.Component {


  constructor(props) {
    super(props);

    let name = this.props.name;
    let index = this.props.index;

    this.state = {
      readonly: true,
      value: props.data[index][name]
    }

  }

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if (this.props.formComponents) this.props.formComponents[fieldIndex] = this;

  }

  componentWillUnmount() {

  }

  shouldComponentUpdate(nextProps, nextState) {

    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    var nameIndex = getFieldIndex(name, index);

    if (nextState.readonly != this.state.readonly) shouldUpdate = true;


    //internal update
    if (nextState.value != this.state.value)
      shouldUpdate = true;

    //props update
    else if (this.state.value != nextProps.data[index][name]) {
      shouldUpdate = true;
      nextState.value = nextProps.data[index][name];
      nextState.readonly = true;
    }


    //validation update
    else if (nextProps.errors.hasOwnProperty(nameIndex)
      && (this.state.error != nextProps.errors[nameIndex]
        || this.props.isSubmitted != nextProps.isSubmitted)) {
      shouldUpdate = true;
    }

    nextState.error = nextProps.errors[nameIndex];

    return shouldUpdate;

  }

  render() {

    const {
      setFieldValue,
      data,
      name,
      index,
      errors,
      isSubmitted,
      formComponents,
      ...restProps } = this.props

    var value = this.state.value || '';
    var fieldKey = getFieldIndex(name, index);

    if (this.state.error && isSubmitted) {
      this.state.readonly = false;
    }

    if (this.state.readonly) {

      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {value}
        </div>
      );
    }
    else {

      return (<TextField
        ref={(input) => { this.nameInput = input; }}
        values={data[index]}
        index={index}
        errors={errors}
        name={name}
        autoFocus={true}
        isSubmitted={isSubmitted}
        setFieldValue={(name, value) => {

          this.props.setFieldValue(name, index, value);
          this.state.value = value;

          if (errors[fieldKey] && isSubmitted) {
            this.nameInput.setState({});
          }
          else
            this.setState({
              readonly: true,
            });

        }}
         />);
    }

  }
}

export class InlineDateTimeField extends React.Component {

  constructor(props) {
    super(props);

    let name = this.props.name;
    let index = this.props.index;

    this.state = {
      readonly: true,
      value: props.data[index][name]
    }

  }

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if (this.props.formComponents) this.props.formComponents[fieldIndex] = this;

  }

  componentWillUnmount() {

  }


  shouldComponentUpdate(nextProps, nextState) {

    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    var nameIndex = getFieldIndex(name, index);

    if (nextState.readonly != this.state.readonly) shouldUpdate = true;


    //internal update
    if (nextState.value != this.state.value)
      shouldUpdate = true;

    //props update
    else if (this.state.value != nextProps.data[index][name]) {
      shouldUpdate = true;
      nextState.value = nextProps.data[index][name];
      nextState.readonly = true;
    }


    //validation update
    else if (nextProps.errors.hasOwnProperty(nameIndex)
      && (this.state.error != nextProps.errors[nameIndex]
        || this.props.isSubmitted != nextProps.isSubmitted)) {
      shouldUpdate = true;
    }

    nextState.error = nextProps.errors[nameIndex];

    return shouldUpdate;
  }

  render() {

    const {
      setFieldValue,
      data,
      name,
      index,
      errors,
      isSubmitted,
      formComponents,
      ...restProps } = this.props

    var value = this.state.value || '';
    var fieldKey = getFieldIndex(name, index);

    if (this.state.error && isSubmitted) {
      this.state.readonly = false;
    }

    if (this.state.readonly) {

      var tmpVal = "";
      if (value)
        tmpVal = moment(value, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY hh:mm A");

      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {tmpVal}
        </div>
      );
    }
    else {

      return (<DateTimeField 
        
        //values={values}  
        // name='value'
        // autoFocus={true}
        // closeOnTab={false}
        // onBlur={(value) => {

        //   this.setState({
        //     readonly: true,
        //     value: value
        //   });

        //   this.props.onBlur(value);
        // }
        // } 
        ref={(input) => { this.nameInput = input; }}
        values={data[index]}
        index={index}
        errors={errors}
        name={name}
        autoFocus={true}
        isSubmitted={isSubmitted}
        setFieldValue={(name, value) => {

          this.props.setFieldValue(name, index, value);
          this.state.value = value;

          if (errors[fieldKey] && isSubmitted) {
            this.nameInput.setState({});
          }
          else
            this.setState({
              readonly: true,
            });

        }}
        
        />);
    }

  }
}

export class InlineDateField extends React.Component {

  constructor(props) {
    super(props);

    let name = this.props.name;
    let index = this.props.index;

    this.state = {
      readonly: true,
      value: props.data[index][name]
    }

  }

  componentDidMount() {

    let name = this.props.name;
    let index = this.props.index;
    let fieldIndex = getFieldIndex(name, index);
    if (this.props.formComponents) this.props.formComponents[fieldIndex] = this;

  }

  componentWillUnmount() {

  }


  shouldComponentUpdate(nextProps, nextState) {

    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    var nameIndex = getFieldIndex(name, index);

    if (nextState.readonly != this.state.readonly) shouldUpdate = true;


    //internal update
    if (nextState.value != this.state.value)
      shouldUpdate = true;

    //props update
    else if (this.state.value != nextProps.data[index][name]) {
      shouldUpdate = true;
      nextState.value = nextProps.data[index][name];
      nextState.readonly = true;
    }


    //validation update
    else if (nextProps.errors.hasOwnProperty(nameIndex)
      && (this.state.error != nextProps.errors[nameIndex]
        || this.props.isSubmitted != nextProps.isSubmitted)) {
      shouldUpdate = true;
    }

    nextState.error = nextProps.errors[nameIndex];

    return shouldUpdate;
  }

  render() {

    const {
      setFieldValue,
      data,
      name,
      index,
      errors,
      isSubmitted,
      formComponents,
      ...restProps } = this.props

    var value = this.state.value || '';
    var fieldKey = getFieldIndex(name, index);

    if (this.state.error && isSubmitted) {
      this.state.readonly = false;
    }

    if (this.state.readonly) {

      var tmpVal = "";
      if (value)
        tmpVal = moment(value, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");

      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {tmpVal}
        </div>
      );
    }
    else {

      return (<DateField 
        
        //values={values}  
        // name='value'
        // autoFocus={true}
        // closeOnTab={false}
        // onBlur={(value) => {

        //   this.setState({
        //     readonly: true,
        //     value: value
        //   });

        //   this.props.onBlur(value);
        // }
        // } 
        ref={(input) => { this.nameInput = input; }}
        values={data[index]}
        index={index}
        errors={errors}
        name={name}
        autoFocus={true}
        isSubmitted={isSubmitted}
        setFieldValue={(name, value) => {

          this.props.setFieldValue(name, index, value);
          this.state.value = value;

          if (errors[fieldKey] && isSubmitted) {
            this.nameInput.setState({});
          }
          else
            this.setState({
              readonly: true,
            });

        }}
        
        />);
    }

  }
}

export class InlineAsyncSelectField extends React.Component {

  state = {
    readonly: true,
    value: '',
    label: ''
  }



  shouldComponentUpdate(nextProps, nextState) {

    this.state.value = '';
    this.state.label = '';

    return true;
  }

  render() {

    const { value, label, tableName, ...restProp } = this.props;

    this.state.value = this.state.value || value;
    this.state.label = this.state.label || label || this.state.value;

    if (this.state.readonly)
      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {this.state.label}
        </div>
      );
    else {

      var values = { 'value': this.state.value, 'label': this.state.label };

      return (<AsyncSelectField
        autoFocus={true}
        createAble={true}
        tableName={tableName}
        name="value"
        values={values}
        value='value'
        label='label'


        onBlur={(value) => {
          //console.log("================          //console.log(value);");
          //console.log(value);
          this.setState({
            readonly: true,
            ...value
          });

          this.props.onBlur(value);
        }
        } />);
    }
  }
}
