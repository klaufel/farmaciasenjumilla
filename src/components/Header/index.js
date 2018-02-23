import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';

class Header extends Component {
  render() {
    return(

      <nav className="navbar navbar-default navbar-fixed-top has-nav">
        <div className="container">
          <div className="navbar-header">

            <span className="navbar-brand"><img src={logo} width="24" height="24" className="App-logo" alt="logo" /> Farmacia de Guardia Jumilla</span>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
