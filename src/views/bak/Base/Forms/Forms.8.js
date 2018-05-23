import React from "react";
import { Formik, Form, Field, FastField } from "formik";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Collapse,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css';

import Select, { Async } from 'react-select';
import 'react-select/dist/react-select.css';

var debounce = require('debounce-promise')


const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' },
];

var selectDict = {};


const getGeneralMaster = (input, table) => {
  ////console.log(input); 
  return fetch(`http://localhost/HttpHandler/JsonHandler.ashx?Table=${table}&input=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {
      selectDict[table] = {};
      json.forEach(element => {
        element.value = element.Code;
        element.label = element.Desc + " Desc";
        selectDict[table][element.value] = element;
      });
      return { options: json };
    });
}

class MyAsyncSelect extends React.Component {

  handleChange = value => {
    console.log(value);
    if (!value) {
      value = { value: '', lable: '' };
    }

    if (this.props.getFormData) {
      this.props.getFormData(value.value);
    } else {
      this.props.setFieldValue(value.value);
    }

  };

  handleBlur = () => {
  };

  getOptions = (input) => {
    return getGeneralMaster(input, "Worker");
  }

  render() {

    var value = {
      value: this.props.value || '',
      label: this.props.value || ''
    };

    if (this.props.value && selectDict["Worker"] && selectDict["Worker"][this.props.value]) {
      value = selectDict["Worker"][this.props.value];
    }

    return (
      <Async
        loadOptions={debounce(this.getOptions, 500)}
        multi={this.props.multi}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={value}
      />
    );
  }
}

class MySelect extends React.Component {

  handleChange = value => {
    this.props.setFieldValue(this.props.name, value);
  };

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

class MyDateTime extends React.Component {


  handleChange = value => {
    this.props.setFieldValue(this.props.name, value);
  };


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

class MyText extends React.Component {

  state = {};

  handleChange = event => {
    var text = event.currentTarget.value;
    this.setState({
      value: text
    });

    if (this.props.formUpdated) {
      this.props.setFieldValue(this.props.name, text);
    }

  };


  handleBlur = event => {
    var text = event.currentTarget.value;

    if(!this.props.value && !text) return;

    if (this.props.value !== text)
      this.props.setFieldValue(this.props.name, text);
  };

  render() {

    console.log(`MyText ${this.props.name}`);

    if (this.props.formUpdated) {
      this.state.value = this.props.value;
    }

    return (

      <div className={this.props.error && "is-invalid"}>

        <input className="form-control" type="text"
          placeholder={this.props.placeholder}
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

class MyNumber extends React.Component {

  state = {};

  handleChange = event => {
    var text = event.currentTarget.value;
    text = text.replace(/[^0-9.]/g, '');
    this.setState({
      value: text
    });

    if (this.props.formUpdated) {
      this.props.setFieldValue(this.props.name, text);
    }

  };


  handleBlur = event => {
    var text = event.currentTarget.value;

    if(!this.props.value && !text) return;

    if (this.props.value !== text)
      this.props.setFieldValue(this.props.name, text);
  };

  render() {

    console.log(`MyNumber ${this.props.name}`);

    if (this.props.formUpdated) {
      this.state.value = this.props.value;
    }

    return (

      <div className={this.props.error && "is-invalid"}>
        <input className="form-control" type="text"
          placeholder={this.props.placeholder}
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

const BasicChildrenPropExample = ({ formData, getFormData, submitForm }) => {

  var formUpdated = true;
  console.log(formData);

  return (

    <Formik
      enableReinitialize
      onSubmit={values => submitForm(values)}
      initialValues={{ ...formData }}
    >
      {props => {

        const {
          values,
          touched,
          dirty,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          onChange,
        } = props;


        const result = (
          <div>
            <Row>
              <Col xs="12" sm="10">
                <Card>
                  <CardHeader>
                    Example Form
                </CardHeader>
                  <CardBody>

                    <Form className="whatever">
                      <FormGroup>
                        <MyText
                          name="fullName"
                          placeholder="Full Name"
                          formUpdated={formUpdated}
                          value={values.fullName}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                        />

                      </FormGroup>

                      <FormGroup>
                        <MyNumber
                          name="age"
                          placeholder="Age"
                          formUpdated={formUpdated}
                          value={values.age}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                        />
                      </FormGroup>

                      <FormGroup>

                        <InputGroup>
                          <MyDateTime
                            name="birthday"
                            placeholder="Birthday"
                            value={values.birthday}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                          />

                          <InputGroupAddon addonType="append">
                            <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                      </FormGroup>

                      <FormGroup>
                        <MyAsyncSelect
                          multi={false}
                          name="department"
                          value={values.department}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          getFormData={getFormData}
                        />
                      </FormGroup>

                      <Button color="success" type="submit"><i className="fa fa-save"></i>  Submit</Button>

                    </Form>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>);

        formUpdated = false;

        return result;

      }
      }

    </Formik>)
};


export default BasicChildrenPropExample;