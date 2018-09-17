import React from "react"; 
import { 
  Button, 
} from 'reactstrap';


// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { InlineDateTimeField, InlineAsyncSelectField } from "../../components/InlineControl";

export default class BodyTable extends React.Component {

  render() {

    
    const { isAfterSave, isSubmitted, onSubmit, getFormData, isGetFormData, setFieldValue, values, errors, validateFieldValue, formComponents, ...controller } = this.props;
    const standardProps = { values, errors, isGetFormData, setFieldValue, validateFieldValue, isSubmitted, formComponents };
    
    data = values.BodyList || [];
    
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
            accessor: "col1",
            width: 40,
            resizable: false,
            Cell: cellInfo => {
              return <div className='form-control'>
              {cellInfo.index + 1}
              </div>
            }
          },
          {
            Header: "Body DateTime",
            accessor: "BodyDateTime",
            Cell: cellInfo => {
              return <InlineDateTimeField 
                value={cellInfo.value}
                onBlur={value => {
                  data[cellInfo.index][cellInfo.column.id] = value;

                }} />
            }
          },
          {
            Header: "Combo1",
            accessor: "Combo1",
            resizable: false,
            Cell: cellInfo => {
              return <InlineAsyncSelectField 
              value={cellInfo.value}
              label={data[cellInfo.index]["Combo1Desc"]}
              tableName="Gender"
              onBlur= { value => {
                data[cellInfo.index][cellInfo.column.id] = value.value;
                data[cellInfo.index]["Combo1Desc"] = value.label;
      
              }} />
            }
          },
          {
            width: 40,
            accessor: "col2",
            resizable: false,
            Cell: cellInfo => {
              return (
                <div className="text-center text-danger lineButton" role="button" onClick={e=>{
                 
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

      <Button color="primary" className="mt-2" onClick={e=>{
                  data.push({
                    HeaderCode: values.Code,
                  });
                  this.setState({});
                }}><i className="fa fa-plus"></i></Button>

    </div>
 
    )
  }
}
