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

export default class ClientMaster extends React.Component {

  render() {


    const { isAfterSave, isSubmitted, onSubmit, getFormData, isGetFormData, setFieldValue, values, errors, validateFieldValue, formComponents, ...controller } = this.props;
    const standardProps = { values, errors, isGetFormData, setFieldValue, validateFieldValue, isSubmitted, formComponents };

    return (

      <div>
        <Row>
          <Col xs="12" sm="12" md="12" lg="10">
            <Card>
              <CardHeader>
                Change Password
              </CardHeader>
              <CardBody>
                <form autoComplete="off">

                  <Row>

                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Original Password
                        </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="OriginPassword"
                            placeholder="OriginPassword"
                            type="password"
                            {...standardProps}
                          />
                        </Col>
                      </Row>

                    </Col>

                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          New Password
                        </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="NewPassword"
                            placeholder="NewPassword"
                            type="password"
                            {...standardProps}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col xs="12" md="6">

                      <Row className="form-group">
                        <Col xs="12" md="4" className="col-form-label">
                          Confirmed Password
                        </Col>
                        <Col xs="12" md="8">
                          <TextField
                            name="ConfirmedPassword"
                            placeholder="ConfirmedPassword"
                            type="password"
                            {...standardProps}
                          />
                        </Col>
                      </Row>
                    </Col>

                  </Row>




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
