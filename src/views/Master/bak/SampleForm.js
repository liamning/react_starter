// Helper styles for demo 
import React from 'react';  
import { render } from 'react-dom';  
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

import { withFormik } from 'formik';
import Yup from 'yup';

import Select from 'react-select';
import 'react-select/dist/react-select.css';



// Our inner form component. Will be wrapped with Formik({..})
const MyInnerForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (


    <div className="animated fadeIn">
         
    <Row> 
      <Col xs="12" sm="6">
        <Card>
          <CardHeader>
            Example Form
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit} className="form-horizontal"> 
            <FormGroup row>
                
                <Col xs="2" sm="2">
                    <Label className="col-form-label">Email: </Label>
                </Col>

                <Col xs="10" sm="10">
                    <InputGroup>
                    <Input
                            id="email"
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
                        touched.email && <Label color="danger" >{errors.email}</Label>}
                </Col>

            </FormGroup>  

            <FormGroup row>
                
                <Col xs="2" sm="2">
                    <Label className="col-form-label">Age: </Label>
                </Col>

                <Col xs="10" sm="10">
                    <InputGroup>
                    <Input
                            name="age"
                            placeholder="Enter your age"
                            type="text"
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.age && touched.age ? 'text-input error' : 'text-input'}
                        /> 
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                    </InputGroupAddon>
                    </InputGroup>
                    {errors.age &&
                        touched.age && <Label color="danger" >{errors.age}</Label>}
                </Col>

            </FormGroup>  



            <FormGroup>
            
            <MySelect
                value={values.topics}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.topics}
                touched={touched.topics}
            />
            {errors.topics &&
                touched.topics && <Label color="danger" >{errors.topics}</Label>}
            </FormGroup>  

              <FormGroup className="form-actions"> 
                
                <Button
                type="button"  
                onClick={handleReset} 
                >
                Reset
                </Button>

                <Button color="primary" type="submit" disabled={isSubmitting}>
                Submit
                </Button> 
              </FormGroup>
            </Form>
          </CardBody>
        </Card>

        <Card>
        <CardHeader>
          <strong>Horizontal</strong> Form
        </CardHeader>
        <CardBody>
          <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="hf-email">Email</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="email" id="hf-email" name="hf-email" placeholder="Enter Email..."/>
                <FormText className="help-block">Please enter your email</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="hf-password">Password</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="password" id="hf-password" name="hf-password" placeholder="Enter Password..."/>
                <FormText className="help-block">Please enter your password</FormText>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
        </CardFooter>
      </Card>

      </Col> 
    </Row> 
  </div> 
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => (
    { 
        email: 'ning@gmail.com',
        address: 'Ngau tau kok', 
        age: 0, 
    }
),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
      address: Yup.string()
        .required('Address is required!'),
        age:  Yup.number().required("Age is required!").min(0).integer() 
  }
),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'BasicForm123213', // helps with React DevTools
})(MyInnerForm);
 

  export default EnhancedForm

