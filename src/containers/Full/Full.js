import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import AuthenRoute from '../../components/AuthenRoute';
import { routes } from '../../routes';
import LoginCtrl from '../Master/Login'
 
// const NotFound = () => (
//   <div>
//     <h1>Sorry, can’t find that.</h1>
//   </div>
// )


class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>

              <Switch>
                {routes.map((route, idx) => {
                  //console.log(route);
                    return  <AuthenRoute key={idx} path={route.path} exact={route.exact} name={route.name} component={route.component} />
                    // return  <Route key={idx} path={route.path} exact={route.exact} name={route.name} component={route.component} />
                  },
                )}
                <Route path="/login" name="Login" component={LoginCtrl} />
                <Redirect from="/" to="/Home" />

              </Switch>


            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
