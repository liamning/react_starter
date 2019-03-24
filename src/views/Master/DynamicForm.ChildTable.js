import React from "react";
import {
  Button,
} from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as InlineControl from "../../components/InlineControl";

export default class extends React.Component {

  componentDidMount() {
     
    // const { standardProps, ...restProps } = this.props; 
    // const { values, data, errors, isSubmitted } = standardProps;


    // this.setState({});

  }
  render() {
    const { standardProps, ...restProps } = this.props; 
    const { values, data, errors, isSubmitted } = standardProps;

    if(!data.length) return '';
 
    console.log(standardProps);

    this.fields =  this.props.fields;

    this.columns = [];
    this.fields.forEach(field=>{
      this.columns.push({
        Header: field.label,
        accessor: field.name,
        Cell: cellInfo => {
          var Comp = InlineControl[`Inline${field.control}`]
          return <Comp
            name={field.name}
            index={cellInfo.index} 
            {...field.controlProps}
            {...standardProps} />
        }
      });
    }); 


    return (
 
      <div className="inlineEdit my-3">

        <ReactTable
          data={data}
          className="-striped"
          pageSize={data.length || 1}
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
             ...this.columns,
            {
              width: 40,
              resizable: false,
              accessor: "col2",
              Cell: cellInfo => {
                return (
                  <div disabled={values.IsLocked} className="text-center text-danger lineButton" role="button" onClick={e => {
                    if (values.IsLocked) return;

                    data.splice(cellInfo.index, 1);
                    this.setState({});

                  }}>
                    <span className="fa fa-minus "></span>
                  </div>
                )
              }
            }
          ]}
        />

        <Button disabled={values.IsLocked} color="primary" className="mt-2" onClick={e => {
          data.push({
            Category: values.Category,
            CategoryDesc: values.CategoryDesc,
          });
          this.setState({});
        }}><i className="fa fa-plus"></i></Button>

      </div>


    )
  }
}
