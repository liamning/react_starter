import Login from '../../views/Pages/Login'
import WithFormEvent from '../../components/WithFormEvent'
import { ajaxPost, loginInfo, history } from '../../global';

const LoginCtrl = WithFormEvent(Login, {

  onSubmit: function (values, callback) {

    console.log("================");
    //var url = 'HttpHandler/LoginHandler.ashx';
    var url = 'Login';
    //var data = { action: 'login', ...values };
    var data = { UserCode: values.UserID, Password:values.Password };

    ajaxPost(url, data).then(response => {

      console.log("================");
      
      console.log(response);
      if (response.Session) {
        Object.assign(loginInfo, response);
        loginInfo.UserID = values.UserID;

        loginInfo.save();
        console.log(loginInfo);
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