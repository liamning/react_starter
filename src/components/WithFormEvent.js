import React from 'react';
import { Route, Redirect } from 'react-router-dom';

 const WithFormEvent = function(TargetForm, eventHanlders) {

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isGetFormData: false,
        values: { ...eventHanlders.values }
      };

    }

    setFieldValue = (field, value) => {
      this.state.values[field] = value;
    }

    getFormData = (params) => {
      eventHanlders.getFormData(params, data => {

        this.setState({
          values: data
        });

      }); 
    }

    //return the flag to child component without trigger the render function
    isAfterSave = () => {
      return this.state.afterSave;
    }

    onSubmit = () => {
      console.log(this.state.values);
      eventHanlders.onSubmit(this.state.values, data => {

        //update the flag to force the asyn select control to clear the cache
        this.setState({
          afterSave: true
        });
   
        //reset the flag
        this.state.afterSave = false; 

      });

       
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

      var { values, onSubmit, getFormData, ...passEventHanlders } = eventHanlders;

      return (
        <TargetForm {...this.props} {...passEventHanlders}
          values={this.state.values}
          isGetFormData={this.state.isGetFormData} 
          isAfterSave={this.isAfterSave}
          setFieldValue={this.setFieldValue}
          onSubmit={this.onSubmit}
          getFormData={this.getFormData}
        />
      );
    }
  };

}

export default WithFormEvent;
