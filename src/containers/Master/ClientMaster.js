import ClientMaster from '../../views/Master/ClientMaster'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost } from '../../global';


export default WithFormEvent(ClientMaster, {

  onSubmit: function (values, callback) {

    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'saveClient', ClientInfo: JSON.stringify(values) };
    ajaxPost(url, data).then(response => {

      alert('Done');
      if (callback)
        callback(response);
    });

  },
  getFormData: function (params, callback) {

    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'getClient', Code: params.Code };
    ajaxPost(url, data).then(response => {

      if (!response) response = {
        ...params
      };

      if (callback)
        callback(response);
    });

  },
  validatePattern:{
    RegistrationDate:{
      required:"", 
    },
    Address:{
      required:"",
    },
    Phone:{
      required:"",
    }
  }


})
