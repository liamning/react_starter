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
import BodyTable from '../../containers/Master/GeneralMaster.Body'; 

import TestForm from '../../containers/Master/ClientMaster'; 

import Draggable from 'react-draggable';

export default class ClientMaster extends React.Component {

  render() {

    const { standardProps, isAfterSave, onSubmit, getFormData,  ...restProps } = this.props;    
    const { values, errors, isSubmitted } = standardProps;
    //console.log(standardProps);

    return (

      <div>
        <Row>
          <Col xs="12" sm="12" md="12" lg="10">
            <Card>
              <CardHeader>
              General Master
              </CardHeader>
              <CardBody>
                <form autoComplete="off">

                  <Row>
                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Category
                      </Col>
                        <Col xs="12" md="8">
                          <AsyncSelectField
                            name="Category"
                            {...standardProps}

                            multi={false}
                            createAble={true}
                            tableName="GeneralMaster"
                            label="Category"
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
                            name="CategoryDesc"
                            placeholder="CategoryDesc"
                            {...standardProps}
                            disabled={values.IsLocked}
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
                    <Button disabled={values.IsLocked} color="success" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Submit</Button>
                  </div>

                  {/* <br />
                  <DisplayJson {...errors}></DisplayJson>
                  <br />
                  <DisplayJson {...values}></DisplayJson> */}




        {/* <TestForm {...this.props}></TestForm> */}

                </form>

              </CardBody>
            </Card>
          </Col>
        </Row>

      <Draggable
        // axis="x"
        
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        // grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div style={{background:'yellow'}}> 
        <div className="handle">Drag from here</div>
        <TestForm {...this.props}></TestForm>
        </div>
 
      </Draggable>


      </div>

    )
  }
}
