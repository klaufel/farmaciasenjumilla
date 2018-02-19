import React, { Component } from 'react';
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


class FarmaciasRow extends Component {
  constructor(props) {
    super(props);
    const dayWeekString= helper.getDayWeekString();
    const dayWeekNumber= helper.getDayWeekNumber();
    console.log(dayWeekNumber);
    this.item = this.props.farmaciasListado.map((item, idx) => {
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
