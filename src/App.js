import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FarmaciaGuardia from './components/FarmaciaGuardia';
import FarmaciasGuardiaListado from './components/FarmaciasGuardiaListado';
import Farmacias from './components/Farmacias';

const version = "v0.7";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Main} />
          <Route exact path="/listado/" component={Listado} />
          <Footer version={version} />
        </div>
      </Router>
    )
  }
}

class Listado extends Component {
  render() {
    return (
      <div className="farmacias-guardia-listado-content">
        <div className="container">
          <FarmaciasGuardiaListado />
        </div>
      </div>
    )
  }
}
class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="farmacia-guardia-content">
          <div className="container">
            <FarmaciaGuardia />
          </div>
        </div>
        <div className="farmacias-content">
          <div className="container">
            <Farmacias />
          </div>
          <div className="container" style={{textAlign: 'center'}}>
          <span style={{fontStyle: 'italic'}} >Los horarios y el estado de apertura o cierre pueden variar dependiendo de los días festivos.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
