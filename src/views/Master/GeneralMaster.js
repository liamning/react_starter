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

export default class ClientMaster extends React.Component {

  render() {

    const { standardProps, isAfterSave, onSubmit, getFormData,  ...restProps } = this.props;    
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
                            disabled={standardProps.values.IsLocked}
                          />
                        </Col>
                      </Row>

                    </Col> 
                  </Row>

                  <BodyTable 
                  data={standardProps.values.BodyList} 
                  values={standardProps.values}
                  errors={standardProps.errors}
                  isSubmitted={standardProps.isSubmitted}
                  bodyEvent={this.props.bodyEvent}
                  ></BodyTable>

                  <div className="text-right">
                    <Button disabled={standardProps.values.IsLocked} color="success" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Submit</Button>
                  </div>

                  <br />
                  <DisplayJson {...standardProps.errors}></DisplayJson>
                  <br />
                  <DisplayJson {...standardProps.values}></DisplayJson>


                </form>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}
