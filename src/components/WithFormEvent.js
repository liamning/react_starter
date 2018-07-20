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
          values: data,
          // isGetFormData: true
        });

        // this.setState({
        //   values: data,
        //   isGetFormData: false
        // });
      }); 
    }

    onSubmit = () => {
      console.log(this.state.values);
      eventHanlders.onSubmit(this.state.values, data => {

        this.setState({
          afterSave: true
        });
   
        this.setState({
          afterSave: false
        });
    
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
          afterSave={this.state.afterSave}
          setFieldValue={this.setFieldValue}
          onSubmit={this.onSubmit}
          getFormData={this.getFormData}
        />
      );
    }
  };

}

export default WithFormEvent;
