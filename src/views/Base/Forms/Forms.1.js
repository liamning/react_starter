import React, { Component } from 'react';
import { render } from 'react-dom';
import { withFormik, Field } from 'formik';
import Yup from 'yup';
import moment from 'moment';


import Select from 'react-select';
import 'react-select/dist/react-select.css';


import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css';


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
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';


const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' },
];

class MySelect extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(value) {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('topics', value);
  };

  handleBlur() {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('topics', true);
  };

  render() {
    return (
      <div>
        <Select
          name="color"
          options={options}
          multi={true}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />

        {!!this.props.error &&
          this.props.touched && (
            <div style={{ cmolor: 'red', marginTop: '.5rem' }}>
              {this.props.error}
            </div>
          )}
          
      </div>
    );
  }
}


class MyDateTime extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this) 
     this.handleBlur = this.handleBlur.bind(this) 
    // this.handleFocus = this.handleFocus.bind(this) 
  }

  handleChange(value) {
    //console.log("handleChange");  
    // this is going to call setFieldValue and manually update values.topcis
    //console.log(value);

    this.props.onChange(this.props['name'], value); 
   };


  handleBlur() {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props['name'], true);
  };
  // handleFocus(event) {
  //   //console.log("handleFocus");
  //   //console.log(event.currentTarget.value);

  //   let inputVal = moment(event.currentTarget.value, "MM/DD/YYYY HH:mm AA");  
  //   if(!inputVal || !inputVal.isValid()){
  //     //this.props.onChange(this.props['name'], ""); 
  //     event.currentTarget.value = "";  
  //   }
  // };
  // handleBlur(event) {
  //   //console.log("handleBlur");  
  //   //console.log(event.currentTarget.value);

  //   let inputVal = moment(event.currentTarget.value, "MM/DD/YYYY HH:mm AA");  
  //   if(!inputVal || !inputVal.isValid()){
  //     event.currentTarget.value = "";  
  //   }

  // };
 
  render() {
    console.log("MyDateTime"); 
    return (
      <div className={this.props.error && "is-invalid"}>
      <InputGroup >

      <DateTime input={true}   closeOnSelect={true}
      onChange={this.handleChange}  
      onBlur={this.handleBlur}  
      value={this.props.value}    

      />

      <InputGroupAddon addonType="append">
        <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
      </InputGroupAddon>
    </InputGroup>

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
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this) 
     this.handleBlur = this.handleBlur.bind(this)  
  }

  handleChange(event) { 

    //console.log(event);
    var text = event.currentTarget.value;
    text = text.replace(/[^0-9.]/g, '');
    this.props.onChange(this.props['name'], text);  

   };


  handleBlur(event) { 
    this.props.onBlur(this.props['name'], true);

  }; 
  render() {
    return (
      <div className={this.props.error && "is-invalid"}>
      <InputGroup >

      <Field className="form-control" 
      name={this.props.name}
      onChange={this.handleChange}  
      onBlur={this.handleBlur}  
      value={this.props.value}    
    />
 
    </InputGroup>

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


const MyInnerForm = props => {
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

    <div className="animated fadeIn">

      <Row>
        <Col xs="12" sm="4">
          <Card>
            <CardHeader>
              Example Form
          </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
 
                <MyNumber 
                value={values.age} 
                name='age' 
                onChange={setFieldValue}  
                onBlur={setFieldTouched}
                error={errors.startDate}
                touched={touched.startDate}
                />

  
                  {errors.age &&
                    touched.age && <div className="input-feedback">{errors.age}</div>}

                </FormGroup>
                <FormGroup>

                  <InputGroup>
                    <Input
                      name="email"
                      placeholder="Enter your email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                    />

                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {errors.email &&
                    touched.email && <div className="input-feedback">{errors.email}</div>}

                </FormGroup>
                <FormGroup>

                  <MySelect
                    value={values.topics}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.topics}
                    touched={touched.topics}
                  />

                </FormGroup>
                <FormGroup>

                  <MyDateTime 
                    value={values.startDate} 
                    name='startDate' 
                    onChange={setFieldValue}  
                    onBlur={setFieldTouched}
                    error={errors.startDate}
                    touched={touched.startDate}
                    />

                </FormGroup>
                <FormGroup className="form-actions">

                  <Button type="submit" disabled={isSubmitting}> 
                    Submit
                </Button>

                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
};


const Forms = withFormik({
  // validationSchema: Yup.object().shape({
  //   email: Yup.string()
  //     .email('Invalid email address')
  //     .required('Email is required!'),
  //   topics: Yup.array()
  //     .min(3, 'Pick at least 3 tags')
  //     .of(
  //       Yup.object().shape({
  //         label: Yup.string().required(),
  //         value: Yup.string().required(),
  //       })
  //     ),
  //     startDate: Yup.date() 
  //     .typeError('startDate must be a Date'),
  //     age: Yup.number() 
  //     .typeError('age must be a number')

  // }),
  mapPropsToValues: props => ({
    age: 0,
    email: '',
    startDate: new Date(),
    topics: [],
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      topics: values.topics.map(t => t.value),
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
})(MyInnerForm);

export default Forms;