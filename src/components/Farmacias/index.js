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
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Farmacia</th>
              <th>Horario</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Web</th>
            </tr>
          </thead>
          <FarmaciasRow farmaciasListado={pharmaciesListJSON} />
        </table>
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
  const dateActual = date.getHours() + '' + date.getMinutes();

  const dateOpenSplit = open.split(':');
  const dateOpen = dateOpenSplit[0] + '' + dateOpenSplit[1];

  const dateCloseSplit = close.split(':');
  const dateClose = dateCloseSplit[0] + '' + dateCloseSplit[1];

  if( (dateActual >= dateOpen) && (dateActual <= dateClose) ) {
    return true;
  }
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

      let farmaciaAbierta = {
        'state': 'Abierta',
        'color': 'green'
      };


      if(isFarmaciaGuardia(farmacia.id)) {
        farmaciaAbierta.state = 'Abierta (Guardia)';
        farmaciaAbierta.color = 'green';
      } else if(isOpen(farmacia.morningOpening, farmacia.morningClosing) ) {
        farmaciaAbierta.state = 'Abierta';
        farmaciaAbierta.color = 'green';
      } else if(isOpen(farmacia.lateOpening, farmacia.lateClosing) ) {
        farmaciaAbierta.state = 'Abierta';
        farmaciaAbierta.color = 'green';
      } else {
        farmaciaAbierta.state = 'Cerrada';
        farmaciaAbierta.color = 'red';
      }

      return(
        <tr key={idx}>
          <td>
            <span style={{color: farmaciaAbierta.color}}>{farmaciaAbierta.state}</span>
          </td>
          <td>{farmacia.name}</td>
          <td>
            Hoy {dayWeekString}:&nbsp;
            {farmacia.morningOpening} - {farmacia.morningClosing}
            &nbsp;/&nbsp;
            {farmacia.lateOpening} - {farmacia.lateClosing}
          </td>
          <td><a href={"https://www.google.es/maps/search/" + farmacia.address} target="_blank">{farmacia.address}</a></td>
          <td><a href={"tel:" + helper.removeWhiteSpaces(farmacia.phone)}>{farmacia.phone}</a></td>
          <td>{farmaciaWeb(farmacia.web)}</td>
        </tr>
      )
    });

  }

  render() {
    return( <tbody>{this.item}</tbody> );
  }
}



export default Farmacias;
