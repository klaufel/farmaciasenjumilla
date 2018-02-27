import React, { Component } from 'react';
import * as helper from '../../helper.js';
import pharmaciesDateJSON from '../../json/pharmaciesDate.json';
import pharmaciesListJSON from '../../json/pharmaciesList.json';

function getFarmaciaGuardia() {
  const dateActual = helper.getDateActual();
  const dateIndex = helper.getIndex(dateActual, pharmaciesDateJSON, 'date');
  const dateId = pharmaciesDateJSON[dateIndex].id;

  const farmaciaIndex = helper.getIndex(dateId, pharmaciesListJSON, 'id')
  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  const farmacia = {
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
        <h3>Farmacia de guardia:</h3>
        <div className="row">
          <div className="col col-sm-7">
            <p>Hoy {helper.getDayWeekString()}, {helper.getDateActual()}</p>
            <h1>{this.state.name}</h1>
            <p><a href={"https://www.google.es/maps/search/" + this.state.address} target="_blank">{this.state.address}</a></p>
            <p><a href={"tel:" + helper.removeWhiteSpaces(this.state.phone)}>{this.state.phone}</a></p>
          </div>
          <div className="col col-sm-5">
            <iframe title="test"
              width="100%"
              height="300"
              frameborder="0"
              src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAinME4vNifx6zHH5LgovkSnqiu2lMiV9Q&q=" + helper.convertUrl(this.state.address) + ""}
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    )
  }
}

export default FarmaciaGuardia;
