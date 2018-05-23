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

// const getOptions = (input, callback) => {
//   //console.log(input);



//   setTimeout(() => {

//     callback(null, {
//       options: [
//         { value: 'one', label: 'One' },
//         { value: 'two', label: 'Two' }
//       ], 
//       complete: true
//     });
//   }, 500);



// };

const getOptions = (input) => {
  //console.log(input);
  var table = "Worker";
  return fetch(`http://localhost/HttpHandler/JsonHandler.ashx?Table=${table}&input=${input}`)
    .then((response) => {
      return response.json();
    }).then((json) => {
      //console.log(json);
      json.forEach(element => {
        element.value = element.Code;
        element.label = element.Desc;
      });
      return { options: json };
    });
}

class MyAsyncSelect extends React.Component {

  field = this.props.field;

  handleChange = value => {
    console.log(value);
    if (value)
      this.props.setFieldValue(this.field.name, value.value);
    else
      this.props.setFieldValue(this.field.name, undefined);

  };

  handleBlur = () => {
    //this.props.onBlur('topics', true);
  };

  render() {

    var value = {
      value: this.props.value,
      label: this.props.value
    };

    return (
      <Async
        loadOptions={debounce(getOptions, 500)}
        multi={this.props.multi}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={value}
      />
    );
  }
}


class MySelect extends React.Component {

  field = this.props.field;

  handleChange = value => {
    //console.log(value);
    //console.log(this.field.name);
    this.props.setFieldValue(this.field.name, value);
  };

  handleBlur = () => {
    //this.props.onBlur('topics', true);
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

  field = this.props.field;

  handleChange = value => {
    this.props.setFieldValue(this.field.name, value);
  };


  handleBlur = (value) => {
  };

  render() {
    //console.log(`MyDateTime  ${this.field.name}`);
    return (

      <DateTime input={true} closeOnSelect={true}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}

      />

    );
  }
}

class MyNumber extends React.Component {

  field = this.props.field;

  handleChange = event => {
    var text = event.currentTarget.value;
    text = text.replace(/[^0-9.]/g, '');
    this.setState({
      value: text
    });


  };


  handleBlur = event => {

    var text = event.currentTarget.value;
    text = text.replace(/[^0-9.]/g, '');
    this.props.setFieldValue(this.field.name, text);
    //this.field.onBlur(this.field['name'], true);

  };

  render() {

    //console.log(`MyNumber ${this.field.name}`);

    if (!this.state)
      this.state = { value: this.props.value };

    return (
      <div className={this.field.error && "is-invalid"}>
        <InputGroup >

          <input className="form-control" type="text"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.state.value}
          />

        </InputGroup>

        {!!this.field.error &&
          (
            <div className="message">
              {this.field.error}
            </div>
          )}
      </div>
    );
  }
}

const BasicChildrenPropExample = () =>
  <Formik
    onSubmit={values => console.log(values)}
    initialValues={{ firstName: '', lastName: '', age: '', age2: '', department: "Pleas Select", }}
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

      return (
        //<div className="animated fadeIn"> 
        <div>
          <Row>
            <Col xs="12" sm="4">
              <Card>
                <CardHeader>
                  Example Form
                </CardHeader>
                <CardBody>

                  <Form className="whatever">
                    <FormGroup>
                      <FastField name="firstName" className="form-control" placeholder="First Name" />
                    </FormGroup>
                    <FormGroup>
                      <FastField name="lastName" placeholder="Last Name" className="form-control" />
                    </FormGroup>
                    <FormGroup>

                      <FastField

                        component={MyNumber}
                        name="age"
                        value={values.age}
                        setFieldValue={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FastField
                        component={MyNumber}
                        name="age2"
                        value={values.age2}
                        setFieldValue={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                    </FormGroup>

                    <FormGroup>

                      <InputGroup>
                        <FastField
                          component={MyDateTime}
                          name="birthday"
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
                      <FastField
                        component={MySelect}
                        multi={true}
                        name="role"
                        value={values.role}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FastField
                        component={MyAsyncSelect}
                        multi={false}
                        name="department"
                        value={values.department}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                      />
                    </FormGroup>

                    <Button color="success" type="submit"><i className="fa fa-save"></i>  Submit</Button>

                  </Form>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>)

    }
    }

  </Formik>;

export default BasicChildrenPropExample;