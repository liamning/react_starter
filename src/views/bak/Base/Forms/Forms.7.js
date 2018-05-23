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

var selectDict= {};
 

const getGeneralMaster = (input, table) => {
  //console.log(input); 
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

  getOptions = (input)=>{
    return getGeneralMaster(input, "Worker");
  }

  render() {

    var value = {
      value: this.props.value,
      label: this.props.value
    };

    if(selectDict["Worker"] && selectDict["Worker"][this.props.value]){
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
    enableReinitialize 
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


      setTimeout(() => {
        //initialValues={ firstName: '1123123', lastName: '3212', age: '11', age2: '11', department: "Blank", }
        console.log(values);
        
      }, 2000);

      return (
        //<div className="animated fadeIn"> 
 
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
                        name="age2" placeholder="Last Name" 
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