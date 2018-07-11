import React from "react";
import { AsyncSelectField, DateTimeField, DateField, TextField, NumberField } from "../../components/FormControl";
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

export default class ClientMaster extends React.Component {

  render() {

    const { afterSave, onSubmit, getFormData, isGetFormData, setFieldValue, values, ...controller } = this.props;
    const standardProps = { values, isGetFormData, setFieldValue };

    return (

      <div>
        <Row>
          <Col xs="12" sm="12" md="12" lg="10">
            <Card>
              <CardHeader>
                Client
              </CardHeader>
              <CardBody>
                <form autoComplete="off">



                  <Row>
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Email
                      </Col>
                        <Col xs="12" md="8">
                          <AsyncSelectField
                            multi={false}
                            createAble={true}
                            name="Code"
                            {...standardProps}

                            Desc="Code"
                            tableName="Client"
                            label={values.Code}
                            getFormData={getFormData}
                            afterSave={afterSave}
                          />
                        </Col>
                      </Row>

                    </Col>
                  </Row>


                  <Row>
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Name
                      </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="Name"
                            placeholder="Name"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>
                    <Col xs="12" md="6">

                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          Phone
                      </Col>
                        <Col xs="12" md="8">

                          <TextField
                            name="Phone"
                            placeholder="Phone"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>
                  {/* </Row>


                  <Row> */}
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Address
                      </Col>
                        <Col xs="12" md="8">

                          <TextField
                            name="Address"
                            placeholder="Address"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>
                    <Col xs="12" md="6">

                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          Fax
                        </Col>
                        <Col xs="12" md="8">

                          <TextField
                            name="Fax"
                            placeholder="Fax"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>
                  {/* </Row>


                  <Row> */}
                    <Col xs="12" md="6">


                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Contact Person
                    </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="ContactPerson"
                            placeholder="ContactPerson"
                            {...standardProps}
                          />
                        </Col>
                      </Row>



                    </Col>
                    <Col xs="12" md="6">


                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          Registration Date
    
                    </Col>
                        <Col xs="12" md="8">
                          <InputGroup>
                            <DateTimeField 
                              name="RegistrationDate"
                              placeholder="RegistrationDate"
                              {...standardProps}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>

                        </Col>
                      </Row>



                    </Col>
                  </Row>





                  <Button color="success" className="pull-right" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Submit</Button>

                </form>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}
