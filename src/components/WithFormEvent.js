import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const WithFormEvent = function (TargetForm, eventHanlders) {

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isGetFormData: false,
        isSubmitted: false,
        values: { ...eventHanlders.values },
        errors: {},
      };

      this.validatePattern = eventHanlders.validatePattern || {};
      this.fieldChange = eventHanlders.fieldChange || {};
      this.formComponents = {};
      this.bodyEvent = {};

      console.log(this.fieldChange);

    }

    updateFieldComponent = field => {
      this.formComponents[field].setState({});
    }

    validateFieldValue = (field, value) => {
      var pattern = this.validatePattern[field];
      //console.log(pattern);
      if (pattern) {
        for (var pro in pattern) {
          switch (pro) {
            case "required":
              if (!value) this.state.errors[field] = pattern[`${pro}Error`] || `${field} required`;
              else this.state.errors[field] = undefined;
              break;

            case "pattern":
              if (!value) break;
              console.log(pattern["pattern"]);
              const regex = RegExp(pattern["pattern"]);
              if (!regex.test(value)) this.state.errors[field] = pattern[`${pro}Error`] || `${field} invalid`;
              else this.state.errors[field] = undefined;
              break;

            case "customValidate":
              var customValidate = pattern["customValidate"];
              var error = customValidate(value);
              if (error) this.state.errors[field] = error;
              else this.state.errors[field] = undefined;
              break;

          }
          if (this.state.errors[field]) break;
        }
      }
      // console.log(field);
      // console.log(value);
      // console.log(this.state.errors);
    }

    setFieldValue = (field, value) => {
      this.state.values[field] = value;
      this.validateFieldValue(field, value);

      if (this.fieldChange[field])
        this.fieldChange[field](this.state.values, this.updateFieldComponent);
    }

    getFormData = (params) => {
      console.log("getFormData");
      this.state.isSubmitted = false;
      eventHanlders.getFormData(params, data => {

        for (var pro in this.state.errors) {
          delete this.state.errors[pro];
        }

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

      for (var pro in this.validatePattern) {
        this.validateFieldValue(pro, this.state.values[pro]);
      }
      if (this.bodyEvent["validate"]) this.bodyEvent["validate"]();


      console.log(this.state.values);
      this.state.isSubmitted = true;
      console.log(this.state.errors);

      for (var pro in this.state.errors) {
        if (pro && this.state.errors[pro]) {
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
      // console.log('componentDidMount'); 

      // sessionStorage["currentURL"] = window.location.href;

      // if(sessionStorage[window.location.href]){
      //   this.state.values = JSON.parse(sessionStorage[window.location.href]);
      //   this.setState({});
      // } 
      // console.log(this.state.values);

    }

    componentWillUnmount() {
      // console.log('componentWillUnmount'); 
      // sessionStorage[sessionStorage["currentURL"]] = JSON.stringify(this.state.values);
    }

    render() {

      console.log('render');
      var { values, onSubmit, getFormData, validatePattern, ...passEventHanlders } = eventHanlders;

      return (
        <TargetForm {...this.props} {...passEventHanlders}
          values={this.state.values}
          formComponents={this.formComponents}
          errors={this.state.errors}
          isSubmitted={this.state.isSubmitted}
          isGetFormData={this.state.isGetFormData}
          isAfterSave={this.isAfterSave}
          setFieldValue={this.setFieldValue}
          validateFieldValue={this.validateFieldValue}
          onSubmit={this.onSubmit}
          getFormData={this.getFormData}
          bodyEvent={this.bodyEvent}
        />
      );
    }
  };

}

export default WithFormEvent;
