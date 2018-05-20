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



class form extends React.Component {


  componentDidMount() {
    //console.log("componentDidMount");
  }

  
  componentWillUnmount() {
    //console.log("componentUnDidMount");
  }

  render() {
    const { formData, getFormData, submitForm } = this.props;

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
                      Client
                  </CardHeader>
                    <CardBody>
                      <Form>

                        <FormGroup>
                          <AsyncSelectField
                            multi={false}
                            name="ClientCode"
                            tableName="Client"
                            value={values.ClientCode}
                            label={values.ClientCode}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            // getFormData={getFormData} 
                            createAble={true}
                          />
                        </FormGroup>

                        <FormGroup>
                          <TextField
                            name="ClientName"
                            placeholder="ClientName"
                            value={values.ClientName}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched} 
                          />
                        </FormGroup>

                        <FormGroup>
                          <TextField
                            name="Address"
                            placeholder="Address"
                            value={values.Address}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched} 
                          />
                        </FormGroup>

                        <FormGroup>
                          <TextField
                            name="Phone"
                            placeholder="Phone"
                            value={values.Phone}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched} 
                          />
                        </FormGroup>

                        <FormGroup>
                          <TextField
                            name="Fax"
                            placeholder="Fax"
                            value={values.Fax}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched} 
                          />
                        </FormGroup>

                        <FormGroup>
                          <TextField
                            name="ContactPerson"
                            placeholder="ContactPerson"
                            value={values.ContactPerson}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched} 
                          />
                        </FormGroup>

                        <FormGroup>
                          <TextField
                            name="ContactPhone"
                            placeholder="ContactPhone"
                            value={values.ContactPhone}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched} 
                          />
                        </FormGroup>

                        <Button color="success" type="submit" disabled={isSubmitting}><i className="fa fa-save"></i>  Submit</Button>
                        
                      </Form>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div> 
        );

          

          return result;

        }
        }

      </Formik>)
  }

}


export default form;