import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import AuthenRoute from '../../components/AuthenRoute';
import routes from '../../routes';


// Base
import Cards from '../../views/Base/Cards/';
import Forms from '../../views/Base/Forms/';
import Switches from '../../views/Base/Switches/';
import Tables from '../../views/Base/Tables/';
import Tabs from '../../views/Base/Tabs/';
import Breadcrumbs from '../../views/Base/Breadcrumbs/';
import Carousels from '../../views/Base/Carousels/';
import Collapses from '../../views/Base/Collapses/';
import Dropdowns from '../../views/Base/Dropdowns/';
import Jumbotrons from '../../views/Base/Jumbotrons/';
import ListGroups from '../../views/Base/ListGroups/';
import Navbars from '../../views/Base/Navbars/';
import Navs from '../../views/Base/Navs/';
import Paginations from '../../views/Base/Paginations/';
import Popovers from '../../views/Base/Popovers/';
import ProgressBar from '../../views/Base/ProgressBar/';
import Tooltips from '../../views/Base/Tooltips/';

// Buttons
import Buttons from '../../views/Buttons/Buttons/';
import ButtonDropdowns from '../../views/Buttons/ButtonDropdowns/';
import ButtonGroups from '../../views/Buttons/ButtonGroups/';
import SocialButtons from '../../views/Buttons/SocialButtons/';

// Icons
import Flags from '../../views/Icons/Flags/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';


import Dashboard from '../../views/Dashboard/';
import Home from '../../views/Home/'; 
import ClientMasterCtrl from '../ClientMasterCtrl'

import DataTable from '../../views/Form/TableTest'

const NotFound = () => (
  <div>
    <h1>Sorry, can’t find that.</h1>
  </div>
)


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
                <AuthenRoute path="/home" name="Home" component={Home} />
                <AuthenRoute path="/dashboard" name="Dashboard" component={Dashboard} />
                <AuthenRoute path="/base/forms" name="Forms" component={ClientMasterCtrl} />
                <AuthenRoute path="/DataTable" name="Forms" component={DataTable} />

                <Redirect from="/" to="/home" />
                <Route component={NotFound} />
              </Switch>

              

              {/* <Switch>
                {routes.map((route, idx) => {
                    return  <AuthenRoute key={idx} path={route.path} name={route.name} component={route.component} />
                  },
                )}
                <Redirect from="/" to="/home" />

              </Switch> */}


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
