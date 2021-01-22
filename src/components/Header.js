import React from 'react';
import logo from '../assets/images/logo.png'

class Header extends React.Component {
  render() {
    return (
      <div className="logo-bx">
        <img src={logo}/>
      </div>
    )
  }
}
export default Header;