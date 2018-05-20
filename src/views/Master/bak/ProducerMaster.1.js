import React from "react";
import { Formik, Form, Field, FastField } from "formik";
import { AsyncSelectField, DateTimeField, TextField, NumberField } from "../Base/Forms/FormControl";
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
var debounce = require('debounce-promise')
 
const form = ({ formData, getFormData, submitForm }) => {

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
                        <TextField
                          name="fullName"
                          placeholder="Full Name"
                          formUpdated={formUpdated}
                          value={values.fullName}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                        />

                      </FormGroup>

                      <FormGroup>
                        <NumberField
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
                          <DateTimeField
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
                        <AsyncSelectField
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
 
export default form;