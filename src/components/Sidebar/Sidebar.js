import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
//import SidebarMinimizer from './../SidebarMinimizer';
import { ajaxPost, logout, loginInfo, history } from '../../global';
import nav from '../../nav';


import AnimateHeight from 'react-animate-height';
// import { func } from '../../../node_modules/@types/prop-types';

class SubMenu extends Component {

  constructor(props) {
    super(props);


    var routeName = props.item.url;
    var isActive = props.parentProps.location.pathname.indexOf(routeName) > -1;

    this.state = {
      height: isActive ? 'auto' : 0,
      openClass: isActive ? 'open' : ''
    }
  }


  handleClick = (e) => {
    e.preventDefault();
    //e.target.parentElement.classList.toggle('open');

    this.state.openClass = !this.state.openClass ? 'open' : '';
    this.state.height = !this.state.height ? 'auto' : 0;

    this.setState({});

  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

  }

  render() {
    const { item, navList, parentProps } = this.props;

    //console.log(item)
    return (
      <li
        className={`nav-item nav-dropdown ${this.state.openClass}`}>
        <a className="nav-link nav-dropdown-toggle" href="#" onClick={(e) => {
          this.handleClick(e);
        }} ><i className={item.icon}></i>{item.name}</a>
        <AnimateHeight
          duration={300}
          height={this.state.height}
        >
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </AnimateHeight>
      </li>
    )
  }
}

class MenuItem extends Component {

  constructor(props) {
    super(props); 
  }

  shouldComponentUpdate() {

    console.log("MenuItem", window.lastURL);
    
    if(window.lastURL && window.lastURL.indexOf(this.props.item.url) >= 0) return true;
    if(window.location.hash.indexOf(this.props.item.url) >= 0) return true;

    return false;
  }

  badge = (badge) => {
    if (badge) {
      const classes = classNames(badge.class);
      return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
    }
  };

  
  hideMobile() { 
    window.lastURL = window.location.hash;
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }

  // isExternal = (url) => {
  //   const link = url ? url.substring(0, 4) : '';
  //   return link === 'http';
  // };

  render() {
    const { item, classes, url } = this.props;
 
    return (

      <NavItem className={classes.item}>
        {
          // this.isExternal(url) ?
          // <RsNavLink href={url} className={classes.link} active>
          //   <i className={classes.icon}></i>{item.name}{this.badge(item.badge)}
          // </RsNavLink>
          // :
          <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
            <i className={classes.icon}></i>{item.name}{this.badge(item.badge)}
          </NavLink>
        }
      </NavItem>


    )
  }
}

class Sidebar extends Component {

  constructor(props) {
    super(props);
 
  }


  // shouldComponentUpdate(){
  //   return false;
  // }
 
  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }
  // state = {
  //   height: {},
  // };


  render() {


    const props = this.props;


    // // simple wrapper for nav-title item
    // const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name) };

    // // nav list section title
    // const title = (title, key) => {
    //   const classes = classNames('nav-title', title.class);
    //   return (<li key={key} className={classes}>{wrapper(title)} </li>);
    // };

    // // nav list divider
    // const divider = (divider, key) => {
    //   const classes = classNames('divider', divider.class);
    //   return (<li key={key} className={classes}></li>);
    // };

    // // nav label with nav link
    // const navLabel = (item, key) => {
    //   const classes = {
    //     item: classNames('hidden-cn', item.class),
    //     link: classNames('nav-label', item.class ? item.class : ''),
    //     icon: classNames(
    //       !item.icon ? 'fa fa-circle' : item.icon,
    //       item.label.variant ? `text-${item.label.variant}` : '',
    //       item.label.class ? item.label.class : ''
    //     )
    //   };
    //   return (
    //     navLink(item, key, classes)
    //   );
    // };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: classNames(item.icon)
      };
      //console.log(classes);
      return (
        navLink(item, key, classes)
      )
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      return (
        <MenuItem item={item} key={key} classes={classes} url={url}></MenuItem>
      )
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <SubMenu item={item} key={key} navList={navList} parentProps={props}></SubMenu>
      )
    };

    // nav type
    const navType = (item, idx) =>
      // item.title ? title(item, idx) :
      //   item.divider ? divider(item, idx) :
      //     item.label ? navLabel(item, idx) :
            item.children ? navDropdown(item, idx)
              : navItem(item, idx);

    // nav list
    const navList = (items) => {
      return items.map((item, index) => navType(item, index));
    };


    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}

            <li className="nav-item"><a className="nav-link" aria-current="false" onClick={() => {


              var url = 'HttpHandler/LogOutHandler.ashx';
              // var data = {};
              // ajaxPost(url, data).then(response => {
              //   logout();
              // });
              logout();
              history.replace(url);

            }} ><i className="fa fa-sign-out"></i>Logout</a></li>
          </Nav>
        </nav>
        <SidebarFooter />
        {/* <SidebarMinimizer/> */}
      </div>
    )
  }
}

export default Sidebar;
