import Login from '../../views/Pages/Login'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost, loginInfo, history } from '../../global';

const LoginCtrl = WithFormEvent(Login, {

  onSubmit: function (values, callback) {

    //console.log("================");
    var url = 'HttpHandler/LoginHandler.ashx';
    var data = { action: 'login', ...values };

    ajaxPost(url, data).then(response => {

      //console.log("================");
      
      //console.log(response);
      if (response.StaffNo) {
        loginInfo.UserID = response.StaffNo;
        loginInfo.save();
        //console.log(loginInfo);
        history.push('/');

        // if (callback)
        //   callback(response);

      } else {
        alert('failure to login');
      }

    });

  },


})

export default LoginCtrl;
