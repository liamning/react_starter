import React from "react";
import { render } from "react-dom";

import { AsyncSelectField, DateTimeField, TextField, NumberField } from "../../../components/FormControl";


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


export class InlineAsyncSelectField extends React.Component {

  state = {
    readonly: true,
    value: '',
    label: ''
  }

  render() {

    this.state.value = this.state.value || this.props.value;
    this.state.label = this.state.label || this.props.label || this.state.value;

    if (this.state.readonly)
      return (
        <div className="form-control" onClick={() => this.setState({ readonly: false })}>
          {this.state.label}
        </div>
      );
    else {

      var values = { 'value': this.state.value };

      return (<AsyncSelectField
        autoFocus={true}
        createAble={true}
        tableName="Client"
        name="value"
        values={values}
        label={this.state.value}


        onBlur={(value) => {

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
