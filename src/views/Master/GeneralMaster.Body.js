import React from "react";
import {
  Button,
} from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { InlineAsyncSelectField, InlineDateTimeField, InlineTextField, InlineNumberField, InlineDateField } from "../../components/InlineControl";

export default class BodyTable extends React.Component {

  render() {

    const { standardProps, ...restProps } = this.props; 

    //console.log(standardProps);

    return (

      <div className="inlineEdit my-3">

        <ReactTable
          data={standardProps.data}
          className="-striped"
          pageSize={standardProps.data.length || 1}
          showPagination={false}
          sortable={false}

          columns={[
            {
              Header: "#",
              accessor: "Seq",
              resizable: false,
              width: 40,
              Cell: cellInfo => {
                return <div className='form-control'>
                  {cellInfo.index + 1}
                </div>
              }
            },
            {
              Header: "Code",
              accessor: "Code",
              Cell: cellInfo => {
                return <InlineTextField
                  name="Code"
                  index={cellInfo.index}
                  {...standardProps} />
              }
            },
            {
              Header: "English Desc",
              accessor: "EngDesc",
              Cell: cellInfo => {
                return <InlineTextField
                  name="EngDesc"
                  index={cellInfo.index}
                  {...standardProps}
                />
              }
            },
            {
              Header: "Chinese Desc",
              resizable: false,
              accessor: "ChiDesc",
              Cell: cellInfo => {
                return <InlineAsyncSelectField
                name="ChiDesc"
                label="ChiDesc"
                tableName="Gender"
                  index={cellInfo.index}
                  {...standardProps}
                />
              }
            },
            {
              width: 40,
              resizable: false,
              accessor: "col2",
              Cell: cellInfo => {
                return (
                  <div disabled={standardProps.values.IsLocked} className="text-center text-danger lineButton" role="button" onClick={e => {
                    if (standardProps.values.IsLocked) return;

                    standardProps.data.splice(cellInfo.index, 1);
                    this.setState({});

                  }}>
                    <span className="fa fa-minus "></span>
                  </div>
                )
              }
            }
          ]}
        />

        <Button disabled={standardProps.values.IsLocked} color="primary" className="mt-2" onClick={e => {
          standardProps.data.push({
            Category: standardProps.values.Category,
            CategoryDesc: standardProps.values.CategoryDesc,
          });
          this.setState({});
        }}><i className="fa fa-plus"></i></Button>

      </div>

    )
  }
}
