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
    console.log("componentDidMount");
  }

  
  componentWillUnmount() {
    console.log("componentUnDidMount");
  }

  render() {
    console.log(this.props);
    const { formData, getFormData, submitForm, match } = this.props;

    var formUpdated = true;

    return (

      <Formik
        enableReinitialize
        onSubmit={values => submitForm(values)}
        initialValues={{ TestDate: '', ...formData }}
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
                      Introducer
                  </CardHeader>
                    <CardBody>
                      <Form>
                        <FormGroup>
                          <AsyncSelectField
                            multi={false}
                            name="IntroducerCode"
                            tableName="Introducer"
                            value={values.IntroducerCode}
                            label={values.IntroducerCode}
                            paramsID={match.params.ID}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            getFormData={getFormData}
                          />
                        </FormGroup>

                        <FormGroup>
                          <TextField
                            name="IntroducerName"
                            placeholder="IntroducerName"
                            value={values.IntroducerName}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                          />
                        </FormGroup>


                        <FormGroup>
                          <DateTimeField
                            name="TestDate"
                            placeholder="TestDate"
                            value={values.TestDate}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                          />
                        </FormGroup>

                        <FormGroup>
                          <AsyncSelectField
                            multi={false}
                            name="IntroducerWorkerID"
                            tableName="Worker"
                            value={values.IntroducerWorkerID}
                            label={values.IntroducerWorkerID}
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
            </div>);
 
          return result;

        }
        }

      </Formik>)
  }

}


export default form;