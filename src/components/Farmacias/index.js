import React, { Component } from 'react';
import * as helper from '../../helper.js';
import pharmaciesDateJSON from '../../json/pharmaciesDate.json';
import pharmaciesListJSON from '../../json/pharmaciesList.json';

class Farmacias extends Component {
  render() {
    return (
      <div>
        <br/>
        <h3>Listado de farmacias de Jumilla:</h3>
        <FarmaciasRow farmaciasListado={pharmaciesListJSON} />
      </div>
    )
  }
}

function isFarmaciaGuardia(idFarmacia) {
  const dateActual = helper.getDateActual();
  const dateIndex = helper.getIndex(dateActual, pharmaciesDateJSON, 'date');
  const dateId = pharmaciesDateJSON[dateIndex].id;

  const farmaciaIndex = helper.getIndex(dateId, pharmaciesListJSON, 'id')
  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  if(idFarmacia === farmaciaActual.id) {
    return <span>Farmacia de Guardia</span>;
  }
}


function isOpen(open, close) {
  const date = new Date();
  const dateActual = parseInt(date.getHours() + '' + date.getMinutes(), 10);

  if(dateActual >= open && dateActual <= close) {
    return true;
  }
}

function converDateToNumber(date) {
  const dateSplit = date.split(':');
  const dateNumber = dateSplit[0] + '' + dateSplit[1];
  return parseInt(dateNumber, 10);
}



function farmaciaWeb(web) {
  if(web) {
    return <a href={web} target="_blank">Ver web</a>;
  }
}

class FarmaciasRow extends Component {
  constructor(props) {
    super(props);
    const dayWeekString = helper.getDayWeekString();
    const dayWeekNumber = helper.getDayWeekNumber();

    this.item = this.props.farmaciasListado.map((item, idx) => {
      const farmacia = {
        'id': item.id,
        'name': item.name,
        'address': item.address,
        'phone': item.phone,
        'web': item.web,
        'morningOpening': item.hours[dayWeekNumber].morning.opening,
        'morningClosing': item.hours[dayWeekNumber].morning.closing,
        'lateOpening': item.hours[dayWeekNumber].late.opening,
        'lateClosing': item.hours[dayWeekNumber].late.closing
      };

      var farmaciaAbierta = {
        'state': 'Abierta',
        'color': 'green'
      };

      if(isFarmaciaGuardia(farmacia.id)) {
        farmaciaAbierta.state = 'Abierta (Guardia)';
        farmaciaAbierta.color = 'green';
      } else if(isOpen(converDateToNumber(farmacia.morningOpening), converDateToNumber(farmacia.morningClosing)) ) {
        farmaciaAbierta.state = 'Abierta';
        farmaciaAbierta.color = 'green';
      } else if(isOpen(converDateToNumber(farmacia.lateOpening), converDateToNumber(farmacia.lateClosing)) ) {
        farmaciaAbierta.state = 'Abierta';
        farmaciaAbierta.color = 'green';
      } else {
        farmaciaAbierta.state = 'Cerrada';
        farmaciaAbierta.color = 'red';
      }

      return(
        <div className="farmacia__item" key={idx}>
          <div className="farmacia__content">
            <h4>{farmacia.name}</h4>
            <p><a href={"https://www.google.es/maps/search/" + farmacia.address} target="_blank">{farmacia.address}</a></p>
            <p><a href={"tel:" + helper.removeWhiteSpaces(farmacia.phone)}>{farmacia.phone}</a></p>
            <p>{farmaciaWeb(farmacia.web)}&nbsp;</p>
            <p>Horario:
              Hoy {dayWeekString}:&nbsp;
              {farmacia.morningOpening} a {farmacia.morningClosing}
              &nbsp;y&nbsp;
              {farmacia.lateOpening} a {farmacia.lateClosing}
            </p>
            <p style={{fontWeight: 'bold', color: farmaciaAbierta.color}}>{farmaciaAbierta.state}</p>
          </div>
        </div>
      )
    });

  }

  render() {
    return( <div className="farmacia">{this.item}</div> );
  }
}



export default Farmacias;
