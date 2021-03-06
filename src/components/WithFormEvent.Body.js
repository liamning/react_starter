import React from 'react';
import { getFieldIndex } from '../global';

const WithFormEventBody = function (TargetBodyForm, eventHanlders) {

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.validatePattern = eventHanlders.validatePattern || {};
      this.fieldChange = eventHanlders.fieldChange || {};
      this.formComponents = {};
      this.props.bodyEvent["validate"] = this.validateAllFields;

      this.state = {
        disableds: { ...eventHanlders.disableds },
      };

    }

    validateAllFields = () => {

      this.props.data.forEach((values, index) => {
        for (var pro in this.validatePattern) {
          this.validateFieldValue(pro, index, values[pro]);
        }
      });

    }

    updateFieldComponent = (field, index) => {
      var fieldKey = `${field}${index}`;

      ////console.log(`updateFieldComponent ${fieldKey}`);


      setTimeout(() => {
        this.formComponents[fieldKey].setState({});
      }, 1);

    }

    validateFieldValue = (field, index, value) => {
      var pattern = this.validatePattern[field];
      let fieldIndex = getFieldIndex(field, index);
      ////console.log(pattern);
      if (pattern) {
        for (var pro in pattern) {
          switch (pro) {
            case "required":
              if (!value) this.props.errors[fieldIndex] = pattern[`${pro}Error`] || `${field} required`;
              else this.props.errors[fieldIndex] = undefined;
              break;

            case "pattern":
              if (!value) break;
              ////console.log(pattern["pattern"]);
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
      // ////console.log(field);
      // ////console.log(value);
      // ////console.log(this.props.errors);
    }

    setFieldValue = (field, value, index) => {

      this.props.data[index][field] = value;

      this.validateFieldValue(field, index, value);

      if (this.fieldChange[field])
        this.fieldChange[field](this.props.data, field, index, this.updateFieldComponent, this.setFieldValue);
    }

    render() {

      ////console.log('render');
      const { ...passEventHanlders } = eventHanlders;
      const { isSubmitted, data, errors, ...restProps } = this.props;
      const standardProps = {
        data: this.props.data,
        values: this.props.values,
        errors: this.props.errors,
        disableds: this.state.disableds,
        isSubmitted: this.props.isSubmitted,
        setFieldValue: this.setFieldValue,
        formComponents: this.formComponents
      };

      return (
        <TargetBodyForm {...restProps} {...passEventHanlders}
          standardProps={standardProps}
        />
      );
    }
  };

}

export default WithFormEventBody;
