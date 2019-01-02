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
  let dateIndex = helper.getIndex(dateActual, pharmaciesDateJSON, 'date');
  
  const hourActual = helper.getHourActual();
  if(hourActual >= 0 && hourActual < 9) {
    dateIndex = dateIndex - 1;
  }

  const dateId = pharmaciesDateJSON[dateIndex].id;

  let farmaciaIndex = helper.getIndex(dateId, pharmaciesListJSON, 'id');


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
          farmaciaMapUrl={item.map.url}
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


// function getMinutesTimeOut(timeOut) {
//   const timeOutMinutes = (timeOut * 30) / 70;
//   return timeOutMinutes;
// }



function getFarmaciaAbiertaStatus(id, morningOpening, morningClosing, lateOpening, lateClosing) {
  var farmaciaAbierta = {
    'state': 'Abierta',
    'color': '#40ba8c'
  };

  const dateNumber = {
    'morningOpening': helper.convertDateToNumber(morningOpening),
    'morningClosing': helper.convertDateToNumber(morningClosing),

    'lateOpening': helper.convertDateToNumber(lateOpening),
    'lateClosing': helper.convertDateToNumber(lateClosing)
  }

  const dateActual = helper.getHourMinutesActual();

  if(isFarmaciaGuardia(id)) {
    farmaciaAbierta.status = 'open-guard';
    farmaciaAbierta.text = 'Abierta ahora (Farmacia de Guardia)';
    farmaciaAbierta.color = '#40ba8c';
  } else if(isOpen(dateNumber.morningOpening, dateNumber.morningClosing) ) {
    farmaciaAbierta.status = 'open-morning';
    farmaciaAbierta.text = 'Abierta ahora';
    farmaciaAbierta.color = '#40ba8c';

    const timeOut = dateNumber.morningClosing - dateActual;
    if(timeOut <= 70) {
      const timeOutMinutes = 60 - dateActual.toString().substring(2, 4);
      farmaciaAbierta.time = ', cierra en ' + Math.round(timeOutMinutes) + ' minutos';
    }
  } else if(isOpen(dateNumber.lateOpening, dateNumber.lateClosing) ) {
    farmaciaAbierta.status = 'open-late';
    farmaciaAbierta.text = 'Abierta ahora';
    farmaciaAbierta.color = '#40ba8c';

    const timeOut = dateNumber.lateClosing - dateActual;
    if(timeOut <= 70) {
      farmaciaAbierta.time = ', cierra en ' + Math.round(timeOut) + ' minutos';
    }
  } else {
    farmaciaAbierta.status = 'close';
    farmaciaAbierta.text = 'Cerrada ahora';
    farmaciaAbierta.color = '#fc5d4a';

    if(dateActual >= dateNumber.morningClosing && dateActual < dateNumber.lateClosing) {
      farmaciaAbierta.time = ', abre a las ' + lateOpening;
    } else {
      farmaciaAbierta.time = ', abre a las ' + morningOpening;
    }
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
      mapUrl: this.props.farmaciaMapUrl,
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
        mapUrl: this.props.farmaciaMapUrl,
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

    }, 5000);
  }

  render() {
    let hourMorning, hourLate;

    if( this.state.morningOpening !== '' && this.state.morningClosing !== '') {
      hourMorning = this.state.morningOpening + ' a ' + this.state.morningClosing;
    }
    if( this.state.lateOpening !== '' && this.state.lateClosing !== '') {
      hourLate = ' y ' + this.state.lateOpening + ' a ' + this.state.lateClosing;
    }

    return(
      <div className="farmacia__item">
        <div className="farmacia__content">
          <h4 className="farmacia__title">{this.state.name}</h4>
          <p>
            <a href={this.state.mapUrl} target="_blank">
              <span className="c-icon c-icon--address"></span>
              {this.state.address}
            </a>
          </p>
          <p>
            <a href={"tel:" + helper.removeWhiteSpaces(this.state.phone)}>
              <span className="c-icon c-icon--phone"></span>
              {this.state.phone}
            </a>
            {farmaciaWeb(this.state.web)}</p>
          <p><span className="c-icon c-icon--clock"></span> Hoy {this.state.dayWeekNumber}:&nbsp;
            {hourMorning}{hourLate}
          </p>
          <p>
            <span className="c-tag" style={{backgroundColor: this.state.farmaciaAbierta.color}}>{this.state.farmaciaAbierta.text} </span>
            <FarmaciasStatus
              status={this.state.farmaciaAbierta.status}
              morningClosing={this.state.morningClosing}
              lateClosing={this.state.lateClosing}
            />
          </p>
        </div>
      </div>
    );
  }
}


function farmaciaStatusTimeOut(closing) {
  const dateActual = new Date();
  const dateActualH = dateActual.getHours();
  const dateActualM = dateActual.getMinutes();
  // Hours are worth 60 minutes.
  const dateActualMinutes = (+dateActualH) * 60 + (+dateActualM);

  const dateClosing = closing.split(':');
  const dateClosingH = parseInt(dateClosing[0], 10);
  const dateClosingM = parseInt(dateClosing[1], 10);

  const dateClosingMinutes = (+dateClosingH) * 60 + (+dateClosingM);

  const dateDifference = dateClosingMinutes - dateActualMinutes;

  if( dateDifference <= 30) {
    return 'Cierra en ' + dateDifference + ' minutos';
  }
}

class FarmaciasStatus extends Component {
  render() {
    var text;
    if(this.props.status === 'open-morning' || this.props.status === 'open-late') {
      if(this.props.status === 'open-morning') {
        text = farmaciaStatusTimeOut(this.props.morningClosing);
      } else {
        text = farmaciaStatusTimeOut(this.props.lateClosing);
      }
      return(
        <span className="c-tag__text">{text}</span>
      );
    } else {
      return false;
    }
  }
}

export default Farmacias;
