import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

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
import { InlineNumberField } from "../Base/Forms/InlineControl";

class TableTest extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  cellClick = (cellInfo)=>{

    //console.log(cellInfo);
  }

  renderEditable(cellInfo) {
    return (
      // <div
      //   style={{ backgroundColor: "#fafafa" }}
      //   contentEditable
      //   suppressContentEditableWarning
      //   onBlur={e => {
      //     const data = [...this.state.data];
      //     data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
      //     this.setState({ data });
      //   }}
      //   dangerouslySetInnerHTML={{
      //     __html: this.state.data[cellInfo.index][cellInfo.column.id]
      //   }}
      // /> 
     
      <InlineNumberField />
    );
  }
  render() {
    const { data } = this.state;
    return (
      <Card>

        <ReactTable
          data={data}
          className="table table-striped"
          columns={[
            {
              Header: "First Name",
              accessor: "firstName",
              Cell: row => (
                <InlineNumberField />
              )
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              Cell: this.renderEditable
            },
            {
              Header: "Full Name",
              id: "full",
              accessor: d =>
                <div
                  dangerouslySetInnerHTML={{
                    __html: d.firstName + " " + d.lastName
                  }}
                />
            }
          ]}
          defaultPageSize={10}
        // className="-striped -highlight"
        />
      </Card>


    );
  }
}

export default TableTest;
