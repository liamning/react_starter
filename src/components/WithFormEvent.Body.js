import React from 'react';

 const WithFormEventBody = function(TargetBodyForm, eventHanlders) {

  return class extends React.Component {
    constructor(props) {
      super(props);

      console.log("props");
      console.log(props);
      this.state = {
        data: props.data,
        errors: {}, 
      };

      this.validatePattern = eventHanlders.validatePattern || {};
      this.fieldChange = eventHanlders.fieldChange || {};

    } 

    formComponents = {}

    updateFieldComponent = (field, index)=>{
      this.state.formComponents[`${field}${index}`].setState({});
    }

    validateFieldValue = (field, index, value) => {
      var pattern = this.validatePattern[field];
      //console.log(pattern);
      if(pattern){
        for(var pro in pattern){
          switch(pro){
            case "required":
            if(!value) this.state.errors[field] = pattern[`${pro}Error`] || `${field} required`;
            else this.state.errors[field] = undefined;
            break; 

            case "pattern":
            if(!value) break;
            console.log(pattern["pattern"]);
            const regex = RegExp(pattern["pattern"]);
            if(!regex.test(value)) this.state.errors[field] =pattern[`${pro}Error`] ||  `${field} invalid`;
            else this.state.errors[field] = undefined;
            break;

            case "customValidate":
            var customValidate = pattern["customValidate"];
            var error = customValidate(value);
            if(error) this.state.errors[field] = error;
            else this.state.errors[field] = undefined;
            break; 
             
          }
          if(this.state.errors[field]) break;
        }
      }
      // console.log(field);
      // console.log(value);
      // console.log(this.state.errors);
    }

    setFieldValue = (field,index, value) => {
      let fieldIndex = `${field}${index}`;

      this.state.data[fieldIndex] = value;
      return;

      this.validateFieldValue(field, value);

      if(this.fieldChange[fieldIndex])
        this.fieldChange[fieldIndex](this.state.data, this.updateFieldComponent);
    }

    render() {

      console.log('render'); 
      var { ...passEventHanlders } = eventHanlders;

      return (
        <TargetBodyForm {...this.props} {...passEventHanlders}
          errors={this.state.errors}
          formComponents={this.formComponents}
          setFieldValue={this.setFieldValue}
        />
      );
    }
  };

}

export default WithFormEventBody;
