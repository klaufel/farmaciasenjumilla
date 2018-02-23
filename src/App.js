import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FarmaciaGuardia from './components/FarmaciaGuardia';
import FarmaciasGuardiaListado from './components/FarmaciasGuardiaListado';
import Farmacias from './components/Farmacias';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          {/*<FarmaciaGuardia />
          <FarmaciasGuardiaListado />*/}
          <Farmacias />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
