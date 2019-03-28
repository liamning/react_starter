import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import { loginInfo } from '../../global';


function whichTransitionEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

class Header extends Component {

  componentDidMount() {

    var e = document.getElementsByClassName('main')[0];


    var transitionEvent = whichTransitionEvent();
    transitionEvent && e.addEventListener(transitionEvent, function () {
      console.log('Transition complete!  This is the callback, no library needed!');
      window.dispatchEvent(new Event('resize'));
    });
  }

  shouldComponentUpdate() {
    return false;
  }

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
          <i className="fa fa-bars"></i>
        </NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          {/* <span className="navbar-toggler-icon"></span> */}
          <i className="fa fa-bars"></i>
        </NavbarToggler>
        {/* <NavbarBrand href="#"></NavbarBrand> */}
        <h5 className="mr-auto mb-0 font-weight-bold">Content Management System</h5>
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
