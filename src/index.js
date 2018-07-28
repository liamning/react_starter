import 'babel-polyfill';
import "isomorphic-fetch"
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';


// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

//import fonts
import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Open+Sans:300,400,600,700', 'sans-serif']
  }
});

// Containers
import Full from './containers/Full/'
import LoginCtrl from './containers/Master/Login' 
import Register from './views/Pages/Register/'
import { loginInfo } from './global';

//get the config from index.html file
loginInfo.host = window.host;
for (var pro in window.loginInfo) {
  loginInfo[pro] = window.loginInfo[pro];
}

console.log(loginInfo);


ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/login" name="Login" component={LoginCtrl} />
      <Route path="/register" name="Register Page" component={Register} />
      <Route path="/" name="Home" component={Full} />
    </Switch>
  </HashRouter>
), document.getElementById('root'));
