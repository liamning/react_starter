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


import BodyTable from '../../containers/Master/UserProfile.Body'; 

export default class ClientMaster extends React.Component {

  render() {
 
    const { standardProps, isAfterSave, onSubmit, getFormData,  ...restProps } = this.props;   
    const { values } = standardProps;
 


    return (

      <div>
        <Row>
          <Col xs="12" sm="12" md="12" lg="10">
            <Card>
              <CardHeader>
              User Profile
              </CardHeader>
              <CardBody>
                <form autoComplete="off">



                  <Row>
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                        Staff No
                        </Col>
                        <Col xs="12" md="8">
                          <AsyncSelectField
                            name="StaffNo"
                            {...standardProps} 

                            multi={false}
                            createAble={true}
                            tableName="UserProfile"
                            label="StaffNo"
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
                        Staff Name
                      </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="StaffName"
                            placeholder="StaffName"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>
                    <Col xs="12" md="6">

                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                        Role
                      </Col>
                        <Col xs="12" md="8">
 
                          <AsyncSelectField
                            name="Role"
                            {...standardProps}
 
                            multi={false}
                            createAble={false}
                            tableName="Role"
                            //label="Role"

                          />

                        </Col>
                      </Row>

                    </Col>
                  {/* </Row>


                  <Row> */}
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                        Age
                      </Col>
                        <Col xs="12" md="8">

                          <NumberField 
                            name="Age"
                            placeholder="Age"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>
                    <Col xs="12" md="6">

                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                        Gender
                        </Col>
                        <Col xs="12" md="8">
 
                          <AsyncSelectField
                            name="Gender"
                            {...standardProps}
 
                            multi={false}
                            createAble={false}
                            tableName="Gender"
                            //label="Gender"

                          />

                        </Col>
                      </Row>

                    </Col>
                  {/* </Row>


                  <Row> */}
                    <Col xs="12" md="6">


                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                        Mobile
                    </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="Mobile"
                            placeholder="Mobile"
                            {...standardProps}
                          />
                        </Col>
                      </Row>



                    </Col>
                    <Col xs="12" md="6">


                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                        Email
    
                    </Col>
                        <Col xs="12" md="8">
                          
                        <TextField 
                              name="Email"
                              placeholder="Email"
                              {...standardProps}
                            />

                        </Col>
                      </Row>



                    </Col>
                  </Row>

                  <BodyTable
                  
                  data={standardProps.values.UserList || []} 
                  values={standardProps.values}
                  errors={standardProps.errors}
                  isSubmitted={standardProps.isSubmitted}
                  bodyEvent={this.props.bodyEvent}

                  ></BodyTable>




                  <div className="text-right clearfix">
                  <Button color="success" className="pull-right" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Submit</Button>
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
