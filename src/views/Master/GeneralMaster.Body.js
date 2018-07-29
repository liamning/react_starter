import React from "react"; 
import { 
  Button, 
} from 'reactstrap';


// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { InlineDateTimeField, InlineTextField } from "../../components/InlineControl";

export default class BodyTable extends React.Component {

  render() {

    const { values, data } = this.props; 
    
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
          {
            Header: "Code",
            accessor: "Code",
            Cell: cellInfo => {
              return <InlineTextField value={cellInfo.value}
                onBlur={value => {
                  data[cellInfo.index][cellInfo.column.id] = value;

                }} />
            }
          },
          {
            Header: "English Desc",
            accessor: "EngDesc",
            Cell: cellInfo => {
              return <InlineTextField value={cellInfo.value}
                onBlur={value => {
                  data[cellInfo.index][cellInfo.column.id] = value;

                }} />
            }
          },
          {
            Header: "Chinese Desc",
            resizable: false,
            accessor: "ChiDesc",
            Cell: cellInfo => {
              return <InlineTextField value={cellInfo.value}
                onBlur={value => {
                  data[cellInfo.index][cellInfo.column.id] = value;

                }} />
            }
          }, 
          {
            width: 40,
            resizable: false,
            accessor: "col2",
            Cell: cellInfo => {
              return (
                <div disabled={values.IsLocked} className="text-center text-danger lineButton" role="button" onClick={e=>{
                 if(values.IsLocked) return;

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

      <Button disabled={values.IsLocked} color="primary" className="mt-2" onClick={e=>{
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
