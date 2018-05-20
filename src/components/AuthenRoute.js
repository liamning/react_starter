import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loginInfo } from '../global';

const AuthenRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props => {
      console.log(Component);
      // return ((loginInfo.UserID && loginInfo.UserID.coun )
      //   ? <Component {...props} />
      //   : <Redirect
      //     to='/login'
      //   />)

      console.log(loginInfo);
      console.log(props);

      if (loginInfo.UserID){
        return (<Component {...props} />);
      }
        
      else{
        return (<Redirect to='/login' />);
      }
        

    }}

  />;

export default AuthenRoute;