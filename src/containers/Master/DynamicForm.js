import DynamicForm from '../../views/Master/DynamicForm'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost } from '../../global';


export default WithFormEvent(DynamicForm, {


  onSubmit: function (values, callback) {

    console.log("onSubmit");
    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'saveHeader', HeaderInfo: JSON.stringify(values) };
    ajaxPost(url, data).then(response => {

      alert(response.message);
      if (callback)
        callback(response);
    });

  },
  getFormData: function (params, callback) {

    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'getHeader', Code: params.Code };
    ajaxPost(url, data).then(response => {

      if (!response) response = {
        ...params
      };

      if (callback)
        callback({
          values: response
        });
    });

  },
  validatePattern: {
    // RegistrationDate: {
    //   required: "",
    // },
    // Address: {
    //   required: "",
    // },
    // Phone: {
    //   required: "",
    // }
    HeaderDate: {
      required: "",
    },
    HeaderDateTime: {
      required: "",
    },
    Combo1: {
      required: "",
    },
  }


})
