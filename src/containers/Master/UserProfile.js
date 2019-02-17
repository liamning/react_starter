import UserProfile from '../../views/Master/UserProfile'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost } from '../../global';


export default WithFormEvent(UserProfile, {

  onSubmit: function (values, callback) {

    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'saveUser', UserProfileInfo: JSON.stringify(values) };
    ajaxPost(url, data).then(response => {

      alert('Done');
      if (callback)
        callback(response);
    });

  },
  getFormData: function (params, callback) {

    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'getUser', StaffNo: params.Code };
    ajaxPost(url, data).then(response => {

      // if (!response) response = { 
      //   StaffNo: params.Code
      // };

      // if (callback)
      //   callback(response);

      
      if (!response) response = {
        ...params
      };

      if (callback)
        callback({
          values: response
        });

        
    });

  },
  validatePattern:{
    Age:{
      required:"",
      pattern: /^\d{2}$/,
      customValidate: value=>{
        if(value <= 0)
          return "Age must be greater than 0";
        
        return "";
      },
    },
    Mobile:{
      required:"",
    },
    Role:{
      required:"",
    }
  }



})
