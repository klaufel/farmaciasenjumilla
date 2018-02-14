import React, { Component } from 'react';
import pharmaciesDateJSON from './json/pharmaciesDate.json';
import pharmaciesListJSON from './json/pharmaciesList.json';

function getIndex(value, arr, prop) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i][prop] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
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
      <tr>
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

class FarmaciaGuardia extends Component {
  render() {
    const dateActual = getDateActual();
    const dateIndex = getIndex(dateActual, pharmaciesDateJSON, 'date');
    const dateId = pharmaciesDateJSON[dateIndex].id;

    const farmaciaIndex = getIndex(dateId, pharmaciesListJSON, 'id')
    const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

    return (
      <div className="jumbotron">
        <p>Farmacia de guardia (hoy {getDateActual()})</p>
        <h1>{farmaciaActual.name}</h1>
        <p>{farmaciaActual.address}</p>
        <p>{farmaciaActual.phone}</p>
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
            <span className="navbar-brand">Farmacia de Guardia Jumilla</span>
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
        <Farmacias />
      </div>
    )
  }
}


export default App;
