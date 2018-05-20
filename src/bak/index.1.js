import 'babel-polyfill';
import "isomorphic-fetch"
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

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

// Containers
import Full from './containers/Full/'
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import loginInfo from './loginInfo';

const store = createStore(rootReducer)

// Log the initial state
console.log(store.getState())

// store.dispatch(addTodo('Learn about actions'))
// store.dispatch(addTodo('Learn about reducers'))
// store.dispatch(addTodo('Learn about store'))

loginInfo.host =  window.host;
for (var pro in window.loginInfo) {
  loginInfo[pro] = window.loginInfo[pro];
}

console.log(loginInfo);

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" name="Login" component={Login} />
        <Route exact path="/register" name="Register Page" component={Register} />
        <Route path="/" name="Home" component={Full} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
