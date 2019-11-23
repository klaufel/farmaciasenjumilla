import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container" style={{ position: "relative" }}>
          <div className="navbar-header">
            <a href="/" className="navbar-brand">
              <span>
                <img
                  src={logo}
                  width="26"
                  height="26"
                  className="App-logo"
                  alt="logo"
                />{" "}
                Farmacias en Jumilla
              </span>
            </a>
            <div
              style={{
                position: "absolute",
                top: "14px",
                right: "15px",
                display: "block"
              }}
            ></div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
