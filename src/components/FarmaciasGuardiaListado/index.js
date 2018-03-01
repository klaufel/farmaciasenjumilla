import React, { Component } from 'react';
import * as helper from '../../helper.js';
import pharmaciesDateJSON from '../../json/pharmaciesDate.json';
import pharmaciesListJSON from '../../json/pharmaciesList.json';

function getDateIndex(slice = 0) {
  const dateActual = helper.getDateActual();
  const dateIndex = helper.getIndex(dateActual, pharmaciesDateJSON, 'date');
  return dateIndex + slice;
}

function getFarmacia(farmaciaId) {
  const farmaciaIndex = helper.getIndex(farmaciaId, pharmaciesListJSON, 'id');
  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  const farmacia = {
    id: farmaciaActual.id,
    name: farmaciaActual.name,
    address: farmaciaActual.address,
    phone: farmaciaActual.phone
  }
  return farmacia;
}


class FarmaciasGuardiaListado extends Component {
  render() {
    return (
      <div>
        <h3 className="title">Farmacias de guardia de los próximos días:</h3>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Farmacia</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <FarmaciasGuardiaListadoRow farmaciasListado={pharmaciesDateJSON} />
        </table>
      </div>
    )
  }
}


class FarmaciasGuardiaListadoRow extends Component {
  constructor(props) {
    super(props);
    const dateIndex = getDateIndex(-1);
    const dateLimit = dateIndex + 5;

    this.item = this.props.farmaciasListado.slice(dateIndex, dateLimit).map((item, idx) => {
      return(
        <FarmaciasGuardiaListadoCol
          farmaciaDate={item.date}
          farmaciaId={item.id}
          farmaciaKey={idx}
          key={idx}
        />
      )
    });
  }

  render() {
    return( <tbody>{this.item}</tbody> );
  }
}


class FarmaciasGuardiaListadoCol extends Component {
  constructor(props) {
    super(props);
    const farmaciaActual = getFarmacia(this.props.farmaciaId);
    this.state = {
      key: this.props.farmaciaKey,
      date: this.props.farmaciaDate,
      id: this.props.farmaciaId,
      name: farmaciaActual.name,
      address: farmaciaActual.address,
      phone: farmaciaActual.phone
    }
  }

  componentDidMount() {
    setInterval( () => {
      const farmaciaActual = getFarmacia(this.props.farmaciaId);
      this.setState({
        key: this.props.farmaciaKey,
        date: this.props.farmaciaDate,
        id: this.props.farmaciaId,
        name: farmaciaActual.name,
        address: farmaciaActual.address,
        phone: farmaciaActual.phone
      })
    }, 1000)
  }
  render() {
    var nameDay = '';
    if(this.state.key === 0) {
      nameDay = 'Ayer ';
    } else if(this.state.key === 1) {
      nameDay = 'Hoy ';
    } else if(this.state.key === 2) {
      nameDay = 'Mañana ';
    }
    return(
      <tr className={(this.state.key === 1 ? 'is-actual' : '')}>
        <td>{nameDay}{this.state.date}</td>
        <td>{this.state.name}</td>
        <td><a href={"https://www.google.es/maps/search/" + this.state.address} target="_blank">{this.state.address}</a></td>
        <td><a href={"tel:" + helper.removeWhiteSpaces(this.state.phone)}>{this.state.phone}</a></td>
      </tr>
    );
  }
}

export default FarmaciasGuardiaListado;
