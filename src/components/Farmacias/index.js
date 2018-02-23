import React, { Component } from 'react';
import Moment from 'react-moment';
import * as helper from '../../helper.js';
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
            </tr>
          </thead>
          <FarmaciasRow farmaciasListado={pharmaciesListJSON} />
        </table>
      </div>
    )
  }
}

function isOpen(open, close) {
  const date = new Date();
  const dateActualHours = date.getHours() + ':' + date.getMinutes();

  console.log(open);
  console.log(close);
  console.log(dateActualHours);
  if( dateActualHours > open){
    return true;
  }
}

class FarmaciasRow extends Component {
  constructor(props) {
    super(props);
    const dayWeekString = helper.getDayWeekString();
    const dayWeekNumber = helper.getDayWeekNumber();


    this.item = this.props.farmaciasListado.map((item, idx) => {

      const date = new Date();
      const dateActualHours = date.getHours() + ':' + date.getMinutes();

      const opening = item.hours[dayWeekNumber].morning.opening;
      const closing = item.hours[dayWeekNumber].morning.closing;

      if(isOpen(opening, closing) ) {
        console.log('abierta');
      }

      console.log('----------');
      return(
        <tr key={idx}>
          <td>Abierta</td>
          <td>{item.name}</td>
          <td>
            Hoy {dayWeekString}&nbsp;
            {item.hours[dayWeekNumber].morning.opening} - {item.hours[dayWeekNumber].morning.closing}
            &nbsp;/&nbsp;
            {item.hours[dayWeekNumber].late.opening} - {item.hours[dayWeekNumber].late.closing}
          </td>
          <td>{item.address}</td>
          <td>{item.phone}</td>
        </tr>
      )
    });
  }

  render() {
    return( <tbody>{this.item}</tbody> );
  }
}



export default Farmacias;
