import HeaderBody from '../../views/Master/HeaderBody'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost } from '../../global';


export default WithFormEvent(HeaderBody, {

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
    Code: {
      required: "",
      requiredError: "test",
    },
    Description: {
      required: "",
      requiredError: "Description is required",
      pattern: /^[a-zA-Z\s]+$/,
      customValidate: function (value) {
        if (value && value.length > 10) {
          return "Maximum length of Description is 10"
        }
      }
    },
    HeaderDate: {
      required: "",
    },
    HeaderDateTime: {
      required: "",
    },
    Combo1: {
      required: "",
    },
  },
  fieldChange: {
    Description: function (values, updateFieldComponent) {


      var url = 'HttpHandler/AjaxHandler.ashx';
      var data = { action: 'getGeneralMaster', Category: 'Combo1' };
      ajaxPost(url, data).then(response => {

        if (response && response[0]) {

          values.Combo1 = response[0].CategoryDesc;
          updateFieldComponent('Combo1');
          console.log("updateFieldComponent");
        }

      });

      console.log("updateFieldComponent 2");

    }
  }


})
