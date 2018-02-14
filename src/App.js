import React, { Component } from 'react';
import pharmaciesJSON from './pharmacies.json';
import './App.css';

class Farmacias extends Component {
  render() {

    return (
      <table width="100%" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <FarmaciasRow farmaciasListado={pharmaciesJSON} />
      </table>
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
  const today = new Date();
  return today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
}

class App extends Component {

  render() {

    return (

      <div className="App container">
        <div>{getDateActual()}</div>

        <Farmacias />
      </div>
    )
  }
}


export default App;
