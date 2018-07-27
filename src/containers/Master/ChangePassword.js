import ChangePassword from '../../views/Master/ChangePassword'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost } from '../../global';


export default WithFormEvent(ChangePassword, {

  onSubmit: function (values, callback) {

    if(values.NewPassword != values.ConfirmedPassword){
      alert("Please input a valid password");
      return;
    }

    var url = 'HttpHandler/AjaxHandler.ashx';
    var data = { action: 'changePassword', ...values };
    ajaxPost(url, data).then(response => {

      alert('Done');
      if (callback)
        callback(response);
    });

  }


})
