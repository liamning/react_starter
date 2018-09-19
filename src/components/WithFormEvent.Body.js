import React from 'react';

const WithFormEventBody = function (TargetBodyForm, eventHanlders) {

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.validatePattern = eventHanlders.validatePattern || {};
      this.fieldChange = eventHanlders.fieldChange || {};
      this.formComponents = {};
      this.props.bodyEvent["validate"] = this.validateAllFields;

    }

    validateAllFields = () => {

      this.props.data.forEach((values, index) => {
        for (var pro in this.validatePattern) {
          this.validateFieldValue(pro, index, values[pro]);
        }
      });

    }


    updateFieldComponent = (field, index) => {
      this.formComponents[`${field}${index}`].setState({});
    }

    validateFieldValue = (field, index, value) => {
      var pattern = this.validatePattern[field];
      let fieldIndex = `${field}${index || ''}`;
      //console.log(pattern);
      if (pattern) {
        for (var pro in pattern) {
          switch (pro) {
            case "required":
              if (!value) this.props.errors[fieldIndex] = pattern[`${pro}Error`] || `${field} required`;
              else this.props.errors[fieldIndex] = undefined;
              break;

            case "pattern":
              if (!value) break;
              console.log(pattern["pattern"]);
              const regex = RegExp(pattern["pattern"]);
              if (!regex.test(value)) this.props.errors[fieldIndex] = pattern[`${pro}Error`] || `${field} invalid`;
              else this.props.errors[fieldIndex] = undefined;
              break;

            case "customValidate":
              var customValidate = pattern["customValidate"];
              var error = customValidate(value);
              if (error) this.props.errors[fieldIndex] = error;
              else this.props.errors[fieldIndex] = undefined;
              break;

          }
          if (this.props.errors[fieldIndex]) break;
        }
      }
      // console.log(field);
      // console.log(value);
      // console.log(this.props.errors);
    }

    setFieldValue = (field, index, value) => {

      let fieldIndex = `${field}${index || ''}`;
      console.log(`setFieldValue: ${fieldIndex}`);
      this.props.data[index][field] = value;

      this.validateFieldValue(field, index, value);

      return;
      if (this.fieldChange[fieldIndex])
        this.fieldChange[fieldIndex](this.state.data, this.updateFieldComponent);
    }

    render() {

      console.log('render');
      var { ...passEventHanlders } = eventHanlders;

      return (
        <TargetBodyForm {...this.props} {...passEventHanlders}
          errors={this.props.errors}
          formComponents={this.formComponents}
          setFieldValue={this.setFieldValue}
        />
      );
    }
  };

}

export default WithFormEventBody;
