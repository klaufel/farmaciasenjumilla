import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6">
              <p className="copyright">Farmacias en Jumilla.</p>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-dev">
              <a
                href="http://juancaruiz.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Desarrollado con{" "}
                <span role="img" aria-labelledby="heart">
                  ❤️
                </span>{" "}
                por Juan Carlos Ruiz.
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
