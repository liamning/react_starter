import React from "react";


import * as FormControl from "../../components/FormControl";
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

import DynamicChildTable from '../../containers/Master/DynamicForm.ChildTable';

const DisplayJson = FormControl.DisplayJson;

export default class extends React.Component {

  componentDidMount() {
    this.fields = [{
      md: { size: 6, },
      label: 'Code',
      name: 'Code',
      control: "AsyncSelectField",
      newLineAfter: true,
      controlProps: {
        tableName: "Header",
        label: "Code",
        createAble: true,
        multi: false,
      },
      controlRef: {
        getFormData: "getFormData",
        isAfterSave: "isAfterSave"
      }
    }, {
      md: { size: 6, },
      label: 'Description',
      name: 'Description',
      control: "TextField",
    }, {
      md: { size: 6, },
      label: 'Combo1',
      name: 'Combo1',
      control: "AsyncSelectField",
      controlProps: {
        tableName: "Combo1",
        label: "Combo1",
      },
    }, {

      md: { size: 6, },
      label: 'Age',
      name: 'Age',
      control: "TextField",
    }, {

      md: { size: 6, },
      label: 'HeaderDate',
      name: 'HeaderDate',
      control: "DateField",
    }];

    this.formRows = [];
    var tmpArray = [];
    this.fields.forEach((field) => {
      tmpArray.push(field);
      if (field.newLineAfter) {
        this.formRows.push(tmpArray);
        tmpArray = [];
      }
    });
    if(tmpArray.length){ 
      this.formRows.push(tmpArray);
    }

    this.childTables = [ 
    // {
    //   fields: [
    //     {
    //       md: { size: 6, },
    //       label: 'Combo1',
    //       name: 'Combo1',
    //       control: "AsyncSelectField",
    //       controlProps: {
    //         tableName: "Gender",
    //         label: "Combo1Desc", 
    //       }, 
    //     },  
    //   ],
    // }
  ];

    this.setState({});

  }
  render() {
    if (!this.fields) return '';

    const { standardProps, isAfterSave, onSubmit, getFormData,  ...restProps } = this.props;    
    const { values, errors, isSubmitted } = standardProps;
    
    values.BodyList = values.BodyList || [];

    return (

      <Card>
        <CardHeader>
          News Maintenance 123
        </CardHeader>
        <CardBody>
          <form autoComplete="off">
            {
              this.formRows.map((fields, rowIndex) => {

                return (

                  <Row key={rowIndex}>
                    {
                      fields.map((field, index) => {

                        const Control = FormControl[field.control];
                        const functionList = {};
                        for (var p in field.controlRef) {
                          functionList[p] = this.props[field.controlRef[p]];
                        }

                        return (<Col xs="12" md={field.md} key={index}>

                          <Row className="form-group">
                            <Col xs="12" md="4" className="col-form-label">
                              {field.label}
                            </Col>
                            <Col xs="12" md="8">
                              <Control
                                name={field.name}
                                {...standardProps}
                                {...field.controlProps}
                                {...functionList}
                              />
                            </Col>
                          </Row>

                        </Col>);
                      })
                    }

                  </Row>

                );
              })
            }
            {this.childTables.map((childTable, index) =>
              <DynamicChildTable
                key={index}
                fields={childTable.fields}
                data={values.BodyList}
                values={values}
                bodyEvent={this.props.bodyEvent}

                 
                errors={errors}
                isSubmitted={isSubmitted} 

              ></DynamicChildTable>)
            }

            <div className="text-right clearfix">
              <Button color="primary" onClick={onSubmit} type="button" ><i className="fa fa-save"></i>  Save</Button>
            </div>


          </form>

          <DisplayJson {...values}></DisplayJson>

        </CardBody>
      </Card>



    )
  }
}
