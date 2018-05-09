import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

class Header extends Component {
  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container" style={{position: 'relative'}}>
          <div className="navbar-header">
            <Link to="/" className="navbar-brand"><span><img src={logo} width="26" height="26" className="App-logo" alt="logo" /> Farmacias en Jumilla</span></Link>
            <div style={{position: 'absolute', top: '14px', right: '15px', display: 'block'}}>
              <Link to="/listado/" style={{textDecoration: 'none', color: '#40ba8c', fontWeight: 'bold'}}>Ver próximos días</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
