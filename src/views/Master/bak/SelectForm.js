import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import Yup from 'yup';

import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css';


import InputMask from 'react-input-mask';
 
class MyDateTime extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this); 
    }

    handleChange(value){
      this.props.onChange("startDate", value); 
    }

    render() {

      return (
          <DateTime  closeOnSelect={true}
          onChange={this.handleChange}
          value={this.props.value}

          />
      )
    
    }

}


const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'), 
  }),
  mapPropsToValues: props => ({
    email: '',
    topics: [],
    startDate: new Date(),
  }),
  handleSubmit: (values, { setSubmitting }) => {
 
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }, 1000);

  },
  displayName: 'MyForm',
});
 
class PhoneInput extends React.Component {
  render() {
    return <InputMask {...this.props} mask="+4\9 99 999 99" maskChar=" " />;
  }
}

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;

  return (

    <form onSubmit={handleSubmit}>

    <InputMask  />
      <label htmlFor="email" style={{ display: 'block' }}>
        Email
      </label>
      <input
        id="email"
        placeholder="Enter your email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email &&
      touched.email && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>
          {errors.email}
        </div>
      )} 

      <MyDateTime 
        value={values.startDate}
        onChange={setFieldValue}
      />

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
 
    </form>
  );
};
 

const MyEnhancedForm = formikEnhancer(MyForm);
 export default MyEnhancedForm