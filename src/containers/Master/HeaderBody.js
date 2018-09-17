import HeaderBody from '../../views/Master/HeaderBody'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost } from '../../global';


export default WithFormEvent(HeaderBody, {

  onSubmit: function (values, callback) {

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
        callback(response);
    });

  },
  validatePattern:{
    Code:{
      required:"", 
      requiredError:"test", 
    },
    Description:{
      required:"",
      requiredError:"Description is required", 
      pattern: /^[a-zA-Z\s]+$/,
      customValidate: function(value){
        if(value && value.length > 10){
          return "Maximum length of Description is 10"
        }
      }
    },
    HeaderDate:{
      required:"",
    },
    HeaderDateTime:{
      required:"",
    },
    Combo1:{
      required:"",
    }, 
  },
  fieldChange: {
    Description: function(values, updateFieldComponent){
      
      values.Combo1 = "Value1";
      updateFieldComponent('Combo1');
      
    }
  }


})
