import React, { Component } from 'react';
import * as helper from '../../helper.js';
import pharmaciesDateJSON from '../../json/pharmaciesDate.json';
import pharmaciesListJSON from '../../json/pharmaciesList.json';

class Farmacias extends Component {
  render() {
    return (
      <div>
        <h3 className="title">Listado de todas las farmacias:</h3>
        <FarmaciasRow farmaciasListado={pharmaciesListJSON} />
      </div>
    )
  }
}

function isFarmaciaGuardia(idFarmacia) {
  const dateActual = helper.getDateActual();
  const dateIndex = helper.getIndex(dateActual, pharmaciesDateJSON, 'date');
  const dateId = pharmaciesDateJSON[dateIndex].id;

  let farmaciaIndex = helper.getIndex(dateId, pharmaciesListJSON, 'id')

  const hourActual = helper.getHourActual();

  if(hourActual >= 0 && hourActual < 9) {
    farmaciaIndex = farmaciaIndex - 1;
  }
  
  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  if(idFarmacia === farmaciaActual.id) {
    return <span>Farmacia de Guardia</span>;
  }
}


function isOpen(open, close) {
  const date = new Date();

  var dateHours = date.getHours();
  var dateMinutes = date.getMinutes();
  if (date.getMinutes() < 10) {
    dateMinutes = '0' + date.getMinutes();
  }

  const dateActual = parseInt(dateHours + '' + dateMinutes, 10);
  if(dateActual >= open && dateActual < close) {
    return true;
  }
}

function convertDateToNumber(date) {
  const dateSplit = date.split(':');
  const dateNumber = dateSplit[0] + '' + dateSplit[1];
  return parseInt(dateNumber, 10);
}



function farmaciaWeb(web) {
  if(web) {
    return (
      <span>&nbsp;-&nbsp;&nbsp;<a href={web} target="_blank">Ver web</a></span>
    );
  }
}

class FarmaciasRow extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.farmaciasListado.map((item, idx) => {
      return(
        <FarmaciasCol
          farmaciaId={item.id}
          farmaciaName={item.name}
          farmaciaAddress={item.address}
          farmaciaPhone={item.phone}
          farmaciaWeb={item.web}
          farmaciaHours={item.hours}
          key={idx}
        />
      )
    });
  }

  render() {
    return( <div className="farmacia">{this.item}</div> );
  }
}



function getFarmaciaAbiertaStatus(id, morningOpening, morningClosing, lateOpening, lateClosing) {
  var farmaciaAbierta = {
    'state': 'Abierta',
    'color': 'green'
  };

  if(isFarmaciaGuardia(id)) {
    farmaciaAbierta.state = 'Abierta (Farmacia de Guardia)';
    farmaciaAbierta.color = 'green';
  } else if(isOpen(convertDateToNumber(morningOpening), convertDateToNumber(morningClosing)) ) {
    farmaciaAbierta.state = 'Abierta';
    farmaciaAbierta.color = 'green';
  } else if(isOpen(convertDateToNumber(lateOpening), convertDateToNumber(lateClosing)) ) {
    farmaciaAbierta.state = 'Abierta';
    farmaciaAbierta.color = 'green';
  } else {
    farmaciaAbierta.state = 'Cerrada';
    farmaciaAbierta.color = 'red';
  }
  return farmaciaAbierta;
}


class FarmaciasCol extends Component {
  constructor(props) {
    super(props);
    const dayWeekNumber = helper.getDayWeekNumber();
    this.state = {
      id: this.props.farmaciaId,
      dayWeekNumber:  helper.getDayWeekString(),
      name: this.props.farmaciaName,
      address: this.props.farmaciaAddress,
      phone: this.props.farmaciaPhone,
      web: this.props.farmaciaWeb,
      morningOpening: this.props.farmaciaHours[dayWeekNumber].morning.opening,
      morningClosing: this.props.farmaciaHours[dayWeekNumber].morning.closing,
      lateOpening: this.props.farmaciaHours[dayWeekNumber].late.opening,
      lateClosing: this.props.farmaciaHours[dayWeekNumber].late.closing,
      farmaciaAbierta: getFarmaciaAbiertaStatus(
        this.props.farmaciaId,
        this.props.farmaciaHours[dayWeekNumber].morning.opening,
        this.props.farmaciaHours[dayWeekNumber].morning.closing,
        this.props.farmaciaHours[dayWeekNumber].late.opening,
        this.props.farmaciaHours[dayWeekNumber].late.closing
      )
    }
  }


  componentDidMount() {
    setInterval( () => {
      const dayWeekNumber = helper.getDayWeekNumber();
      this.setState({
        id: this.props.farmaciaId,
        dayWeekNumber:  helper.getDayWeekString(),
        name: this.props.farmaciaName,
        address: this.props.farmaciaAddress,
        phone: this.props.farmaciaPhone,
        web: this.props.farmaciaWeb,
        morningOpening: this.props.farmaciaHours[dayWeekNumber].morning.opening,
        morningClosing: this.props.farmaciaHours[dayWeekNumber].morning.closing,
        lateOpening: this.props.farmaciaHours[dayWeekNumber].late.opening,
        lateClosing: this.props.farmaciaHours[dayWeekNumber].late.closing,
        farmaciaAbierta: getFarmaciaAbiertaStatus(
          this.props.farmaciaId,
          this.props.farmaciaHours[dayWeekNumber].morning.opening,
          this.props.farmaciaHours[dayWeekNumber].morning.closing,
          this.props.farmaciaHours[dayWeekNumber].late.opening,
          this.props.farmaciaHours[dayWeekNumber].late.closing
        )
      })

    }, 1000);
  }

  render() {
    return(
      <div className="farmacia__item">
        <div className="farmacia__content">
          <h4 className="farmacia__title">{this.state.name}</h4>
          <p><a href={"https://www.google.es/maps/search/" + this.state.address} target="_blank">{this.state.address}</a></p>
          <p><a href={"tel:" + helper.removeWhiteSpaces(this.state.phone)}>{this.state.phone}</a> {farmaciaWeb(this.state.web)}</p>
          <p>Horario, hoy {this.state.dayWeekNumber}:&nbsp;
            {this.state.morningOpening} a {this.state.morningClosing}
            &nbsp;y&nbsp;
            {this.state.lateOpening} a {this.state.lateClosing}
          </p>
          <p style={{fontWeight: 'bold', color: this.state.farmaciaAbierta.color}}>{this.state.farmaciaAbierta.state}</p>
        </div>
      </div>
    );
  }
}

export default Farmacias;
