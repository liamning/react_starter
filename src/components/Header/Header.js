import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import { loginInfo } from '../../global';

class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          {/* <span className="navbar-toggler-icon"></span> */}
          <i class="fa fa-bars"></i>
        </NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          {/* <span className="navbar-toggler-icon"></span> */}
          <i class="fa fa-bars"></i>
        </NavbarToggler>
        {/* <NavbarBrand href="#"></NavbarBrand> */}
        <h5 className="mr-auto mb-0">Web Template</h5>
        <div className="ml-auto mr-2"  ><i className="fa fa-user-circle fa-2x"></i></div>
        <div className="mr-3" style={{ 'lineHeight': '29px' }}><span>{loginInfo.UserID}</span></div>
        {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler> */}
      </header>
    );
  }
}

export default Header;
