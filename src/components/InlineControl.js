import React from "react";
import moment from 'moment';

import { AsyncSelectField, DateTimeField, TextField, NumberField } from "./FormControl";

export class InlineNumberField extends React.Component {

  state = {
    readonly: true,
    value: ''
  }

  render() {
    console.log("InlineTextField");
    console.log(this.props);

    if (this.state.readonly)
      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {this.state.value || this.props.value}
        </div>
      );
    else
      return (<NumberField value={this.state.value || this.props.value}
        autoFocus={true}
        onBlur={(event) => {
          this.setState({
            readonly: true,
            value: event.target.value
          });
          this.props.onBlur(event);
        }
        } />);
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
    let index = this.props.index || '';
    let fieldIndex = `${name}${index}`
    if (this.props.formComponents && !this.props.formComponents[fieldIndex]) this.props.formComponents[fieldIndex] = this;

  }

  shouldComponentUpdate(nextProps, nextState) {

    console.log("==========InlineTextField shouldComponentUpdate==============");
    console.log(nextProps);
    var shouldUpdate = false;
    var name = nextProps.name;
    var index = nextProps.index;
    var nameIndex = `${name}${index || ''}`;

    if (nextState.readonly != this.state.readonly) shouldUpdate = true;


    //internal update
    if (nextState.value != this.state.value)
      shouldUpdate = true;

    //props update
    else if (this.state.value != nextProps.data[index][name]) {
      shouldUpdate = true;
      nextState.value = nextProps.data[index][name];
      this.state.readonly = true;
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

    console.log("==========InlineTextField==============");
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
    var fieldKey = `${name}${index || ''}`;
    if(this.state.error && isSubmitted){
      this.state.readonly = false;
    }

    console.log(data[index]);

    console.log(errors);

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

          console.log(setFieldValue);
          this.props.setFieldValue(name, index, value);
          this.state.value = value;
          if (errors[fieldKey] && isSubmitted) {
            console.log(errors);
            console.log(this.nameInput);
            this.nameInput.setState({
            });
            return;
          }
          this.setState({
            readonly: true,
          });

        }
        } />);
    }

  }
}

export class InlineDateTimeField extends React.Component {

  state = {
    readonly: true,
    value: ''
  }


  shouldComponentUpdate(nextProps, nextState) {


    this.state.value = undefined;

    return true;
  }

  render() {

    this.state.value = this.state.value || this.props.value;
    if (this.state.readonly) {

      var tmpVal = "";
      if (this.state.value)
        tmpVal = moment(this.state.value, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY hh:mm A");

      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {tmpVal}
        </div>
      );
    }
    else {

      console.log(this.state.value);
      var values = { 'value': this.state.value };

      return (<DateTimeField values={values} name='value'
        autoFocus={true}
        closeOnTab={false}
        onBlur={(value) => {

          this.setState({
            readonly: true,
            value: value
          });

          this.props.onBlur(value);
        }
        } />);
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
          console.log("================          console.log(value);");
          console.log(value);
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
