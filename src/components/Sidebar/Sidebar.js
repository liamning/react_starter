import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';
import { loginInfo } from '../../global';
import nav from '../../nav';


import AnimateHeight from 'react-animate-height';
// import { func } from '../../../node_modules/@types/prop-types';


class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }


  handleClick(e, key, item) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');

    const { height } = this.state;
    height[key] = height[key] || 0;
    height[key] = height[key] === 0 ? 'auto' : 0;

    this.setState({
      height: height,
    });

  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

  }

  hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }
  state = {
    height: {},
  };


  render() {

    console.log("=====render====");
    const { height } = this.state;
    const props = this.props;
    //console.log(height);


    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames(badge.class);
        return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name) };

    // nav list section title
    const title = (title, key) => {
      const classes = classNames('nav-title', title.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => {
      const classes = classNames('divider', divider.class);
      return (<li key={key} className={classes}></li>);
    };

    // nav label with nav link
    const navLabel = (item, key) => {
      const classes = {
        item: classNames('hidden-cn', item.class),
        link: classNames('nav-label', item.class ? item.class : ''),
        icon: classNames(
          !item.icon ? 'fa fa-circle' : item.icon,
          item.label.variant ? `text-${item.label.variant}` : '',
          item.label.class ? item.label.class : ''
        )
      };
      return (
        navLink(item, key, classes)
      );
    };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: classNames(item.icon)
      };
      return (
        navLink(item, key, classes)
      )
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      return (
        <NavItem key={key} className={classes.item}>
          {isExternal(url) ?
            <RsNavLink href={url} className={classes.link} active>
              <i className={classes.icon}></i>{item.name}{badge(item.badge)}
            </RsNavLink>
            :
            <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
              <i className={classes.icon}></i>{item.name}{badge(item.badge)}
            </NavLink>
          }
        </NavItem>
      )
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      //console.log("===========navDropdown===============");
      //console.log(key);
      //console.log(item);
      return (
        <li key={key} className={this.activeRoute(item.url, props)}>
          <a className="nav-link nav-dropdown-toggle" href="#" onClick={(e)=>{
            this.handleClick(e, key, item);
          }} ><i className={item.icon}></i>{item.name}</a>
          <AnimateHeight
            duration={300}
            height={height[key] || 0} // see props documentation bellow
          >
            <ul className="nav-dropdown-items">
              {navList(item.children)}
            </ul>
          </AnimateHeight>
        </li>)
    };

    // nav type
    const navType = (item, idx) =>
      item.title ? title(item, idx) :
        item.divider ? divider(item, idx) :
          item.label ? navLabel(item, idx) :
            item.children ? navDropdown(item, idx)
              : navItem(item, idx);

    // nav list
    const navList = (items) => {
      return items.map((item, index) => navType(item, index));
    };

    const isExternal = (url) => {
      const link = url ? url.substring(0, 4) : '';
      return link === 'http';
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
            <li className="nav-item"><a className="nav-link" aria-current="false" href={loginInfo.host + '/HttpHandler/LogOutHandler.ashx'}><i className="fa fa-sign-out"></i>Logout</a></li>
          </Nav>
        </nav>
        <SidebarFooter />
        {/* <SidebarMinimizer/> */}
      </div>
    )
  }
}

export default Sidebar;
