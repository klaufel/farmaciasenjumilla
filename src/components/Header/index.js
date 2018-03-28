import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';

class Header extends Component {
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">

            <span className="navbar-brand"><img src={logo} width="26" height="26" className="App-logo" alt="logo" /> Farmacias en Jumilla</span>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
