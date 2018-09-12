import React from 'react';
import { Route, Redirect } from 'react-router-dom';

 const WithFormEvent = function(TargetForm, eventHanlders) {

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isGetFormData: false,
        isSubmitted: false,
        values: { ...eventHanlders.values },
        errors: {},
        formComponents: {},
      };

      this.validatePattern = eventHanlders.validatePattern || {};

    } 

    validateFieldValue = (field, value) => {
      var pattern = this.validatePattern[field];
      if(pattern){
        for(var pro in pattern){
          switch(pro){
            case "required":
            if(!value) this.state.errors[field] = `${field} required`;
            else delete this.state.errors[field];
            break; 

            case "pattern":
            if(!value) break;
            console.log(pattern["pattern"]);
            const regex = RegExp(pattern["pattern"]);
            if(!regex.test(value)) this.state.errors[field] = `${field} invalid`;
            else delete this.state.errors[field];
            break;

             
          }
        }
      }
    }

    setFieldValue = (field, value) => {
      this.state.values[field] = value;
    }

    getFormData = (params) => { 
      this.state.isSubmitted = false;
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
      this.state.isSubmitted = true;
      console.log(this.state.errors);

      for(var pro in this.state.errors){
        if(pro) {
          this.setState({});
          return;
        }
      }

      eventHanlders.onSubmit(this.state.values, data => {

        
      this.state.isSubmitted = false;

        //update the flag to force the asyn select control to clear the cache
        this.setState({
          afterSave: true
        });
   
        //reset the flag
        this.state.afterSave = false; 

      });

       
    }

    componentDidMount() {
      console.log('componentDidMount'); 
 
      sessionStorage["currentURL"] = window.location.href;

      if(sessionStorage[window.location.href]){
        this.state.values = JSON.parse(sessionStorage[window.location.href]);
        this.setState({});
      } 
      console.log(this.state.values);
      
    }

    componentWillUnmount() {
      console.log('componentWillUnmount'); 
      sessionStorage[sessionStorage["currentURL"]] = JSON.stringify(this.state.values);
    }

    render() {

      console.log('render'); 
      var { values, onSubmit, getFormData, validatePattern, ...passEventHanlders } = eventHanlders;

      return (
        <TargetForm {...this.props} {...passEventHanlders}
          values={this.state.values}
          formComponents={this.state.formComponents}
          errors={this.state.errors}
          isSubmitted = {this.state.isSubmitted}
          isGetFormData={this.state.isGetFormData} 
          isAfterSave={this.isAfterSave}
          setFieldValue={this.setFieldValue}
          validateFieldValue={this.validateFieldValue}
          onSubmit={this.onSubmit}
          getFormData={this.getFormData}
        />
      );
    }
  };

}

export default WithFormEvent;
