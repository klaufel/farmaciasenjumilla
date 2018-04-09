import React, { Component } from 'react';
import * as helper from '../../helper.js';
import pharmaciesDateJSON from '../../json/pharmaciesDate.json';
import pharmaciesListJSON from '../../json/pharmaciesList.json';


function farmaciaWeb(web) {
  if(web) {
    return (
      <span>&nbsp;-&nbsp;&nbsp;<a href={web} target="_blank">Ver web</a></span>
    );
  }
}


function getFarmaciaGuardia() {
  const dateActual = helper.getDateActual();
  const dateIndex = helper.getIndex(dateActual, pharmaciesDateJSON, 'date');
  const dateId = pharmaciesDateJSON[dateIndex].id;

  let farmaciaIndex = helper.getIndex(dateId, pharmaciesListJSON, 'id');

  const hourActual = helper.getHourActual();
  if(hourActual >= 0 && hourActual < 9) {
    farmaciaIndex = farmaciaIndex - 1;
  }

  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  const farmacia = {
    name: farmaciaActual.name,
    address: farmaciaActual.address,
    phone: farmaciaActual.phone,
    web: farmaciaActual.web
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
      phone: farmaciaActual.phone,
      web: farmaciaActual.web
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
    }, 1000)
  }

  render() {
    return (
      <div className="farmacia-guardia">
        <div className="row">
          <div className="col col-sm-7">
            <h3 className="farmacia-guardia__title">Farmacia de guardia abierta:</h3>
            <p><span className="c-icon c-icon--clock"></span> Hoy {helper.getDayWeekString()}, {helper.getDateActual()}</p>
            <h1 style={{fontWeight: 'bold'}}>{this.state.name}</h1>
            <p>
              <a href={"https://www.google.es/maps/search/" + this.state.address} target="_blank">
              <span className="c-icon c-icon--address"></span>
              {this.state.address}
              </a>
            </p>
            <p><a href={"tel:" + helper.removeWhiteSpaces(this.state.phone)}><span className="c-icon c-icon--phone"></span> {this.state.phone}</a> {farmaciaWeb(this.state.web)}</p>
            <span className="c-tag" style={{backgroundColor: '#40ba8c'}}>Abierta ahora (Farmacia de Guardia)</span>
            <p className="farmacia-guardia__info">Es recomendable llamar al número de teléfono de la farmacia para confirmar el turno de guardia.</p>
          </div>
          <div className="col col-sm-5">
            <iframe title="test"
              width="100%"
              height="300"
              frameBorder="0"
              src={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyAinME4vNifx6zHH5LgovkSnqiu2lMiV9Q" +
                "&q=" + helper.convertUrl('Farmacia+' + this.state.name + this.state.address) +
              ""}
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    )
  }
}

export default FarmaciaGuardia;
