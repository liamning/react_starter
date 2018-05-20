import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import DateTimeField from "../../components/FormControl"

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
import { InlineNumberField, InlineTextField, InlineAsyncSelectField } from "../Base/Forms/InlineControl";

class TableTest extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  cellClick = (cellInfo) => {

    console.log(cellInfo);
  }

  renderEditable(cellInfo) {
    console.log(cellInfo);

    return (

      <InlineTextField value={cellInfo.value}
        onBlur={e => {
          this.state.data[cellInfo.index][cellInfo.column.id] = e.target.value;

        }} />
    );
  }

  renderSelect = (cellInfo) => {
   // console.log(cellInfo);
    return (

      <InlineAsyncSelectField value={cellInfo.value}
        onBlur= { value => {
          console.log(value);
          console.log(cellInfo);
          this.state.data[cellInfo.index][cellInfo.column.id] = value;

        }} />
    );
  }

  render() {
    const { data } = this.state;
    return (
      <Card className="inlineEdit">
        <CardHeader>
          Client
        </CardHeader>
        <CardBody>


          <ReactTable
            data={data}
            // className="-striped -highlight"
            className="-striped" 
            showPagination={false} 
            defaultPageSize={10}
            
            columns={[
              {
                Header: "First Name",
                accessor: "firstName",
                Cell: this.renderEditable
              },
              {
                Header: "Last Name",
                accessor: "lastName",
                Cell: this.renderSelect
              },
              {
                Header: "Full Name",
                id: "full",
                accessor: d =>
                  <div className='form-control'
                    dangerouslySetInnerHTML={{
                      __html: d.firstName + " " + d.lastName
                    }}
                  />
              }
            ]}
          />
        </CardBody>
      </Card>


    );
  }
}

export default TableTest;
