import { connect } from 'react-redux'
import { viewForm } from '../actions'
import Forms from '../views/Form/ProducerMaster'
const param = require('jquery-param');

 
const mapStateToProps = (state, ownProps) => ({
  formData: state.basicForm
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFormData: (value) => {

    var url = 'http://localhost/HttpHandler/WebAPI.ashx';
    var data = { action: 'getIntroducer', IntroducerCode: value};

    fetch(url, {
      method: 'POST', 
      body:  param(data),  
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then(response => response.json())
      .then(response => {
        dispatch(viewForm(response));
      });

  },
  submitForm: (values) => console.log(values)
})


const StateForms = connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms)

export default StateForms