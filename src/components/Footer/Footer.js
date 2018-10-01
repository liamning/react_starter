import React, {Component} from 'react';

class Footer extends Component {
  
  shouldComponentUpdate(){
    return false;
  }
  
  render() {
    return (
      <footer className="app-footer">
        <span><span className="font-weight-bold">Copyright</span> Sample Limited © 2018</span>
        {/* <span className="ml-auto">Powered by <a href="http://coreui.io">CoreUI</a></span> */}
      </footer>
    )
  }
}

export default Footer;
