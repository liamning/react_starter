import React from "react";


import { AsyncSelectField, DateTimeField, DateField, FileField,  TextField, HTMLEditField, DisplayJson } from "../../components/FormControl";
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

 
    const { standardProps, isAfterSave, onSubmit, getFormData,  ...restProps } = this.props;   
    const{ values } = standardProps;
 
    return (

      <div>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <Card>
              <CardHeader>
                News Maintenance
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
                            tableName="Client"
                            label="Code"
                            getFormData={getFormData}
                            isAfterSave={isAfterSave}
                          />
                        </Col>
                      </Row>

                    </Col>
                  </Row>


                  <Row>
                    {/* <Col xs="12" md="6">

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

                    </Col> */}

                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          File
                      </Col>
                        <Col xs="12" md="8">
                          <FileField
                            name="Attachment"
                            placeholder="Attachment"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>

                    <Col xs="12" md="6">

                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                        Relationship
                      </Col>
                        <Col xs="12" md="8">
 
                          <AsyncSelectField
                            name="Phone"
                            {...standardProps}
 
                            tableName="Relationship"
                            label="Phone"

                          />

                        </Col>
                      </Row>

                    </Col>
                  {/* </Row>


                  <Row> */}
                  </Row> 
                  <Row> 
                    <Col xs="12" md="12">

                      <Row className="form-group">
                        <Col xs="12" md="2" className="col-form-label">
                          Content
                      </Col>
                        <Col xs="12" md="10">
 
                          <HTMLEditField
                            style={{width: '100%'}}
                            name="Address"
                            placeholder="Address"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>
                    {/* <Col xs="12" md="6">

                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                        Gender
                        </Col>
                        <Col xs="12" md="8">
 
                          <AsyncSelectField
                            name="Fax"
                            {...standardProps}
 
                            multi={false}
                            createAble={false}
                            tableName="Gender"
                            label="Fax"

                          />

                        </Col>
                      </Row>

                    </Col> */}
                  {/* </Row>


                  <Row> */}
                  </Row>
                    {/* <Col xs="12" md="6">


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



                    </Col> */}
                    {/* <Col xs="12" md="6">


                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          Registration Date
    
                      </Col>
                        <Col xs="12" md="8"><DateField  
                              name="RegistrationDate"
                              placeholder="RegistrationDate"
                              {...standardProps}
                            />
 

                        </Col>
                      </Row>



                    </Col> */}
                  <div className="text-right clearfix">
                  <Button color="primary" className="mr-1" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Save</Button>
                  {/* <Button color="success"   onClick={onSubmit} type="button" ><i className="fa fa-paper-plane"></i>  Publish</Button> */}

                  {/* <Button color="warning" className="pull-right" onClick={()=>{
                    this.setState({});
                  }} type="button" ><i className="fa fa-save"></i>  Refresh</Button> */}
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
