// import { connect } from 'react-redux'
// import { viewClient } from '../actions'
// import Forms from '../views/Form/ClientMaster'
// const param = require('jquery-param');




// const mapStateToProps = (state, ownProps) => ({
//   formData: state.clientForm
// })

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   getFormData: (value) => {

//     var url = 'http://localhost/HttpHandler/WebAPI.ashx';
//     var data = { action: 'getClient', ClientCode: value };

//     fetch(url, {
//       method: 'POST',
//       body: param(data),
//       headers: new Headers({
//         'Content-Type': 'application/x-www-form-urlencoded'
//       })
//     }).then(response => response.json())
//       .then(response => {
//         console.log(`getFormData ${response}`);
//         console.log(response);
//         if (!response)
//           dispatch(viewClient({ ClientCode: value }));
//         else
//           dispatch(viewClient(response));
//       });

//   },
//   submitForm: (values) => {


//     var url = 'http://localhost/HttpHandler/WebAPI.ashx';
//     var data = { action: 'saveClient', ClientInfo: JSON.stringify(values) };

//     fetch(url, {
//       method: 'POST',
//       body: param(data),
//       headers: new Headers({
//         'Content-Type': 'application/x-www-form-urlencoded'
//       })
//     }).then(response => response.json())
//       .then(response => {
//         dispatch(viewClient({ ...values, syncWithServer: true }));
//       });
//   }
// })


// const StateForms = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Forms)

// export default StateForms