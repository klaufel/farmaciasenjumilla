import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FarmaciaGuardia from './components/FarmaciaGuardia';
import FarmaciasGuardiaListado from './components/FarmaciasGuardiaListado';
import Farmacias from './components/Farmacias';

const version = "v0.0.1a";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="farmacia-guardia-content">
          <div className="container">
            <FarmaciaGuardia />
          </div>
        </div>
        <div className="farmacias-guardia-listado-content">
          <div className="container">
            <FarmaciasGuardiaListado />
          </div>
        </div>
        <div className="farmacias-content">
          <div className="container">
            <Farmacias />
          </div>
        </div>
        <Footer version={version} />
      </div>
    )
  }
}

export default App;
