import GeneralMaster from '../../views/Master/GeneralMaster'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost } from '../../global';


export default WithFormEvent(GeneralMaster, {

  onSubmit: function (values, callback) {

    var url = 'HttpHandler/AjaxHandler.ashx';

    values.BodyList.forEach(element => {
      element.CategoryDesc = values.CategoryDesc;
    });
    var data = { action: 'saveGeneralMaster', GeneralMasterList: JSON.stringify(values.BodyList) };
    ajaxPost(url, data).then(response => {

      alert(response.message);
      if (callback)
        callback(response);
    });

  },
  getFormData: function (params, callback) {

    //console.log("General master getFormData");

    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'getGeneralMaster', Category: params.Code };
    ajaxPost(url, data).then(response => {

      if (response && response[0]) {
        response = {
          Category: response[0].Category,
          CategoryDesc: response[0].CategoryDesc,
          IsLocked: response[0].IsLocked,
          BodyList: response || []
        };
      } else {
        response = {
          Category: params.Code || '',
          BodyList: []
        };
      }

      if (callback)
        callback(response);
    });

  },
  defaultValues: {
    BodyList: []
  },
  validatePattern: {
    CategoryDesc: {
      required: "",
      // pattern: /^\d[2]$/
    },
  }


})
