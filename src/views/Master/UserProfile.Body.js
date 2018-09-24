import React from "react";
import {
  Button,
} from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { InlineAsyncSelectField, InlineDateTimeField, InlineTextField, InlineNumberField, InlineDateField } from "../../components/InlineControl";
import { AsyncSelectField, DateTimeField, DateField, TextField, NumberField, DisplayJson } from "../../components/FormControl";

export default class BodyTable extends React.Component {

  render() {

    const { standardProps, ...restProps } = this.props;
    const { data } = standardProps;

    window.df

    return (

      <ul>

        {data.map((item, index) =>
          <li key={item.StaffNo.toString()}>
          
          {item.StaffNo} 
          <InlineTextField
            name="StaffName"
            index={index}
            {...standardProps} />

            
          {/* <TextField
            name="StaffName"
            index={index}
            {...standardProps} /> */}
           
          </li>


        )}

      </ul>

    )
  }
}
