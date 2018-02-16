import React, { Component } from 'react';
import pharmaciesDateJSON from './json/pharmaciesDate.json';
import pharmaciesListJSON from './json/pharmaciesList.json';
import logo from './img/logo.svg';

function getIndex(value, arr, prop) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i][prop] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}


class FarmaciasGuardiaListado extends Component {
  render() {
    return (
      <div>
        <br/>
        <h3>Listado de farmacias de guardia Jumilla:</h3>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Farmacia</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <FarmaciasGuardiaListadoRow farmaciasListado={pharmaciesDateJSON} />
        </table>
      </div>
    )
  }
}


class FarmaciasGuardiaListadoRow extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.farmaciasListado.map((item, idx) => {
      return(
        <FarmaciasGuardiaListadoCol
          farmaciaDate={item.date}
          farmaciaId={item.id}
          key={idx}
        />
      )
    });
  }

  render() {
    return( <tbody>{this.item}</tbody> );
  }
}


class FarmaciasGuardiaListadoCol extends Component {
  constructor(props) {
    super(props);
    const farmaciaActual = getFarmacia(this.props.farmaciaId);
    this.state = {
      date: this.props.farmaciaDate,
      id: this.props.farmaciaId,
      name: farmaciaActual.name,
      address: farmaciaActual.address,
      phone: farmaciaActual.phone
    }
  }

  componentDidMount() {
    setInterval( () => {
      const farmaciaActual = getFarmacia(this.props.farmaciaId);
      this.setState({
        date: this.props.farmaciaDate,
        id: this.props.farmaciaId,
        name: farmaciaActual.name,
        address: farmaciaActual.address,
        phone: farmaciaActual.phone
      })
    }, 10000)
  }
  render() {
    const dateActual = getDateActual();
    return(
      <tr className={(this.state.date === dateActual ? 'is-actual' : '')}>
        <td>{this.state.date}</td>
        <td>{this.state.name}</td>
        <td><a href={"https://www.google.es/maps/search/" + this.state.address} target="_blank">{this.state.address}</a></td>
        <td><a href={"tel:" + removeWhiteSpaces(this.state.phone)}>{this.state.phone}</a></td>
      </tr>
    );
  }
}

function removeWhiteSpaces(string) {
  var i = 0, length = string.length;

   for (i; i < length; i++) {
     string = string.replace(' ', '');

   }

  return string;
}


class Farmacias extends Component {
  render() {
    return (
      <div>
        <br/>
        <h3>Listado de farmacias de Jumilla:</h3>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>address</th>
              <th>phone</th>
            </tr>
          </thead>
          <FarmaciasRow farmaciasListado={pharmaciesListJSON} />
        </table>
      </div>
    )
  }
}

class FarmaciasRow extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.farmaciasListado.map((item, idx) =>
      <tr key={idx}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
      </tr>
    );
  }

  render() {
    return( <tbody>{this.item}</tbody> );
  }
}

function getDateActual() {
  const date = new Date();
  return date.getDate() + '/' + ((date.getMonth() < 9 ? '0': '') + (date.getMonth()+1))  + '/' + date.getFullYear();
}

function getFarmaciaGuardia() {
  const dateActual = getDateActual();
  const dateIndex = getIndex(dateActual, pharmaciesDateJSON, 'date');
  const dateId = pharmaciesDateJSON[dateIndex].id;

  const farmaciaIndex = getIndex(dateId, pharmaciesListJSON, 'id')
  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  const farmacia = {
    name: farmaciaActual.name,
    address: farmaciaActual.address,
    phone: farmaciaActual.phone
  }
  return farmacia;
}


function getFarmacia(farmaciaId) {
  const farmaciaIndex = getIndex(farmaciaId, pharmaciesListJSON, 'id')
  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  const farmacia = {
    id: farmaciaActual.id,
    name: farmaciaActual.name,
    address: farmaciaActual.address,
    phone: farmaciaActual.phone
  }
  return farmacia;
}

class FarmaciaGuardia extends Component {

  constructor() {
    super();
    const farmaciaActual = getFarmaciaGuardia();
    this.state = {
      name: farmaciaActual.name,
      address: farmaciaActual.address,
      phone: farmaciaActual.phone
    }
  }

  componentDidMount() {
    setInterval( () => {
      const farmaciaActual = getFarmaciaGuardia();
      this.setState({
        name: farmaciaActual.name,
        address: farmaciaActual.address,
        phone: farmaciaActual.phone
      })
    }, 10000)
  }

  render() {
    return (
      <div className="jumbotron">
        <p>Farmacia de guardia (hoy {getDateActual()})</p>
        <h1>{this.state.name}</h1>
        <p>{this.state.address}</p>
        <p>{this.state.phone}</p>
      </div>
    )
  }
}


class Header extends Component {
  render() {
    return(

      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">

            <span className="navbar-brand"><img src={logo} width="24" height="24" className="App-logo" alt="logo" /> Farmacia de Guardia Jumilla</span>
          </div>
        </div>
      </nav>
    )
  }
}

class App extends Component {

  render() {

    return (

      <div className="App container">
        <Header />
        <FarmaciaGuardia />
        <FarmaciasGuardiaListado />
        {/*<Farmacias />*/}
      </div>
    )
  }
}


export default App;
