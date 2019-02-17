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

import BodyTable from '../../containers/Master/HeaderBody.Body'; 

export default class ClientMaster extends React.Component {

  render() {
 
    
    const { standardProps, isAfterSave, onSubmit, getFormData,  ...restProps } = this.props;    
    const { values, errors, isSubmitted } = standardProps;
    
    values.BodyList = values.BodyList || [];

    return (

      <div>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
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
                          <DateField
                              name="HeaderDate"
                              placeholder="HeaderDate"
                              {...standardProps}
                            />

                        </Col>
                      </Row>
                    </Col>


                    <Col xs="12" md="6">


                      <Row className="form-group">

                        <Col xs="12" md="4" className="col-form-label">
                          HeaderDateTime

                        </Col>
                        <Col xs="12" md="8">
                            <DateTimeField
                              name="HeaderDateTime"
                              placeholder="HeaderDateTime"
                              {...standardProps}
                            />

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

                  <BodyTable 
                  data={values.BodyList} 
                  values={values}
                  errors={errors}
                  isSubmitted={isSubmitted}
                  bodyEvent={this.props.bodyEvent}
                  ></BodyTable>

                  <div className="text-right">
                    <Button  color="success" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Submit</Button>
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
