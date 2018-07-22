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

    const { isAfterSave, onSubmit, getFormData, isGetFormData, setFieldValue, values, ...controller } = this.props;
    const standardProps = { values, isGetFormData, setFieldValue };

    return (

      <div>
        <Row>
          <Col xs="12" sm="10">
            <Card>
              <CardHeader>
                Client
              </CardHeader>
              <CardBody>
                <form>

                  <FormGroup>
                    <AsyncSelectField
                      multi={false}
                      createAble={true}
                      name="Code"
                      {...standardProps}

                      Desc="Code"
                      tableName="Client"
                      label={values.Code}
                      getFormData={getFormData}
                      isAfterSave={isAfterSave}

                    />
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      name="Name"
                      placeholder="Name"
                      {...standardProps}
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      name="Address"
                      placeholder="Address"
                      {...standardProps}
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      name="Phone"
                      placeholder="Phone"
                      {...standardProps}
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      name="Fax"
                      placeholder="Fax"
                      {...standardProps}
                    />
                    <p>Error message</p>
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      name="ContactPerson"
                      placeholder="ContactPerson"
                      {...standardProps}
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputGroup >

                      <DateTimeField
                        name="RegistrationDate"
                        placeholder="RegistrationDate"
                        {...standardProps}
                      />

                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>


                  </FormGroup>


                  <Button color="success" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Submit</Button>

                </form>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}
