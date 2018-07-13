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
import ReactTable from "react-table";
import "react-table/react-table.css";
import { InlineNumberField, InlineTextField, InlineDateTimeField, InlineAsyncSelectField } from "../../components/InlineControl";

export default class ClientMaster extends React.Component {

  render() {

    const { afterSave, onSubmit, getFormData, isGetFormData, setFieldValue, values, ...controller } = this.props;
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


                  <div className="inlineEdit my-3">

                    <ReactTable
                      data={values.BodyList}
                      className="-striped"
                      // showPagination={values.BodyList.length > 10}
                      // defaultPageSize={10}
                      pageSize={values.BodyList.length || 1}
                      showPagination={false}

                      columns={[
                        {
                          Header: "#",
                          width: 40,
                          Cell: cellInfo => {
                            return <div className='form-control'>
                            {cellInfo.index + 1}
                            </div>
                          }
                        },
                        {
                          Header: "Body DateTime",
                          accessor: "BodyDateTime",
                          Cell: cellInfo => {
                            return <InlineDateTimeField value={cellInfo.value}
                              onBlur={value => {
                                values.BodyList[cellInfo.index][cellInfo.column.id] = value;

                              }} />
                          }
                        },
                        {
                          Header: "Combo1",
                          accessor: "Combo1",
                          Cell: cellInfo => {
                            return <InlineAsyncSelectField 
                            value={cellInfo.value}
                            label={values.BodyList[cellInfo.index]["Combo1Desc"]}
                            tableName="Gender"
                            onBlur= { value => {
                              values.BodyList[cellInfo.index][cellInfo.column.id] = value;
                    
                            }} />
                          }
                        },
                        {
                          width: 40,
                          Cell: cellInfo => {
                            return (
                              <div className="text-center text-danger lineButton" role="button" onClick={e=>{
                               
                                values.BodyList.splice(cellInfo.index, 1);
                                this.setState({});

                              }}>
                                <span className="fa fa-minus "></span>
                              </div>
                            )
                          }
                        }
                      ]}
                    />

                    <Button color="primary" className="mt-2" onClick={e=>{
                                values.BodyList.push({
                                  HeaderCode: values.Code,
                                });
                                this.setState({});
                              }}><i className="fa fa-plus"></i></Button>

                  </div>

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
