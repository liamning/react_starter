import React from "react";
import { AsyncSelectField, DateTimeField, DateField, TextField, NumberField, DisplayJson } from "../../components/FormControl";
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


// Import React Table
import BodyTable from "./HeaderBody.Body"; 
import { InlineNumberField, InlineTextField, InlineDateTimeField, InlineAsyncSelectField } from "../../components/InlineControl";

export default class ClientMaster extends React.Component {

  render() {

    const { isAfterSave, onSubmit, getFormData, isGetFormData, setFieldValue, values, ...controller } = this.props;
    const standardProps = { values, isGetFormData, setFieldValue };
    values.BodyList = values.BodyList || [];

    return (

      <div>
        <Row>
          <Col xs="12" sm="12" md="12" lg="10">
            <Card>
              <CardHeader>
                Header Body Sample
              </CardHeader>
              <CardBody>
                <form autoComplete="off">

                  <Row>
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Code
                      </Col>
                        <Col xs="12" md="8">
                          <AsyncSelectField
                            name="Code"
                            {...standardProps}

                            multi={false}
                            createAble={true}
                            tableName="Header"
                            label="Code"
                            getFormData={getFormData} 
                            isAfterSave={isAfterSave}
                          />
                        </Col>
                      </Row>

                    </Col>
                  </Row>


                  <Row>
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Description
                      </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="Description"
                            placeholder="Description"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>


                    <Col xs="12" md="6">


                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          HeaderDate

                        </Col>
                        <Col xs="12" md="8">
                          <InputGroup>
                            <DateField
                              name="HeaderDate"
                              placeholder="HeaderDate"
                              {...standardProps}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>

                        </Col>
                      </Row>
                    </Col>


                    <Col xs="12" md="6">


                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          HeaderDateTime

                        </Col>
                        <Col xs="12" md="8">
                          <InputGroup>
                            <DateTimeField
                              name="HeaderDateTime"
                              placeholder="HeaderDateTime"
                              {...standardProps}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>

                        </Col>
                      </Row>
                    </Col>


                    <Col xs="12" md="6">

                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          Combo1
                        </Col>
                        <Col xs="12" md="8">

                          <AsyncSelectField
                            name="Combo1"
                            {...standardProps}

                            multi={false}
                            createAble={false}
                            tableName="Combo1"
                            label="Combo1"

                          />

                        </Col>
                      </Row>

                    </Col>


                  </Row>

                  <BodyTable values={values} data={values.BodyList || []}></BodyTable>

                  <div className="text-right">
                    <Button color="success" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Submit</Button>
                  </div>

                  <br />
                  <DisplayJson {...values}></DisplayJson>


                </form>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}
