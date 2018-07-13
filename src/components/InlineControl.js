import React from "react";
import { render } from "react-dom";

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

  state = {
    readonly: true,
    value: ''
  }

  render() {
    console.log("========================");

    this.state.value = this.state.value || this.props.value;
    if (this.state.readonly)
      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {this.state.value || ' '}
        </div>
      );
    else {

      console.log(this.state.value);
      var values = { 'value': this.state.value };

      return (<TextField values={values} name='value'
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
}


export class InlineDateTimeField extends React.Component {

  state = {
    readonly: true,
    value: ''
  }

  render() {  

    this.state.value = this.state.value || this.props.value;
    if (this.state.readonly)
      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {this.state.value}
        </div>
      );
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

  render() {

    const { value,label, tableName, ...restProp} = this.props;

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

          this.props.onBlur(value.value);
        }
        } />);
    }
  }
}
