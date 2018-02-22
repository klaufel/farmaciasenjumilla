import React, { Component } from 'react';
import * as helper from '../../helper.js';
import pharmaciesDateJSON from '../../json/pharmaciesDate.json';
import pharmaciesListJSON from '../../json/pharmaciesList.json';


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
        <br/>
        <h3>Listado de farmacias de guardia en Jumilla:</h3>
        <table className="table table-striped table-bordered table-hover">
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
    this.item = this.props.farmaciasListado.map((item, idx) => {
      return(
        <FarmaciasGuardiaListadoCol
          farmaciaDate={item.date}
          farmaciaId={item.id}
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
        date: this.props.farmaciaDate,
        id: this.props.farmaciaId,
        name: farmaciaActual.name,
        address: farmaciaActual.address,
        phone: farmaciaActual.phone
      })
    }, 10000)
  }
  render() {
    const dateActual = helper.getDateActual();
    return(
      <tr className={(this.state.date === dateActual ? 'is-actual' : '')}>
        <td>{this.state.date}</td>
        <td>{this.state.name}</td>
        <td><a href={"https://www.google.es/maps/search/" + this.state.address} target="_blank">{this.state.address}</a></td>
        <td><a href={"tel:" + helper.removeWhiteSpaces(this.state.phone)}>{this.state.phone}</a></td>
      </tr>
    );
  }
}

export default FarmaciasGuardiaListado;
