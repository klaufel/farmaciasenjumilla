import React, { Component } from "react";
import { Offline, Online } from "react-detect-offline";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import * as helper from "../../helper.js";
import pharmaciesDateJSON from "../../json/pharmaciesDate.json";
import pharmaciesListJSON from "../../json/pharmaciesList.json";

//const debug = withProps(console.log)

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    </GoogleMap>
  ))
);

function farmaciaWeb(web) {
  if (web) {
    return (
      <span>
        &nbsp;-&nbsp;&nbsp;
        <a href={web} target="_blank">
          Ver web
        </a>
      </span>
    );
  }
}

function getFarmaciaGuardia() {
  const dateActual = helper.getDateActual();
  let dateIndex = helper.getIndex(dateActual, pharmaciesDateJSON, "date");

  const hourActual = helper.getHourActual();
  if (hourActual >= 0 && hourActual < 9) {
    dateIndex = dateIndex - 1;
  }

  const dateId = pharmaciesDateJSON[dateIndex].id;

  let farmaciaIndex = helper.getIndex(dateId, pharmaciesListJSON, "id");

  const farmaciaActual = pharmaciesListJSON[farmaciaIndex];

  const farmacia = {
    name: farmaciaActual.name,
    address: farmaciaActual.address,
    phone: farmaciaActual.phone,
    web: farmaciaActual.web,
    map: {
      url: farmaciaActual.map.url,
      lat: farmaciaActual.map.lat,
      lng: farmaciaActual.map.lng
    }
  };
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
      web: farmaciaActual.web,
      map: {
        url: farmaciaActual.map.url,
        lat: farmaciaActual.map.lat,
        lng: farmaciaActual.map.lng
      }
    };
  }

  componentDidMount() {
    setInterval(() => {
      const farmaciaActual = getFarmaciaGuardia();
      this.setState({
        name: farmaciaActual.name,
        address: farmaciaActual.address,
        phone: farmaciaActual.phone,
        web: farmaciaActual.web,
        map: {
          url: farmaciaActual.map.url,
          lat: farmaciaActual.map.lat,
          lng: farmaciaActual.map.lng
        }
      });
    }, 1000);
  }

  render() {
    return (
      <div className="farmacia-guardia">
        <div className="row">
          <div className="col col-sm-7">
            <h3 className="farmacia-guardia__title">
              Farmacia de guardia abierta:
            </h3>
            <p>
              <span className="c-icon c-icon--clock"></span> Hoy{" "}
              {helper.getDayWeekString()}, {helper.getDateActual()}
            </p>
            <h1 style={{ fontWeight: "bold" }}>{this.state.name}</h1>
            <p>
              <a href={this.state.map.url} target="_blank">
                <span className="c-icon c-icon--address"></span>
                {this.state.address}
              </a>
            </p>
            <p>
              <a href={"tel:" + helper.removeWhiteSpaces(this.state.phone)}>
                <span className="c-icon c-icon--phone"></span>{" "}
                {this.state.phone}
              </a>{" "}
              {farmaciaWeb(this.state.web)}
            </p>
            <span className="c-tag" style={{ backgroundColor: "#40ba8c" }}>
              Abierta ahora (Farmacia de Guardia)
            </span>
            <p className="farmacia-guardia__info">
              Es recomendable llamar al número de teléfono de la farmacia para
              confirmar el turno de guardia.
            </p>
          </div>
          <div className="col col-sm-5">
            {/*
            <iframe title="test"
              width="100%"
              height="300"
              frameBorder="0"
              src={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyBlX6u11oFQ8wP1LPJs38sf1hKnLUhwom0" +
                "&q=" + helper.convertUrl('Farmacia+' + this.state.name + this.state.address) +
              ""}
              allowFullScreen>
            </iframe>
            */}
            <Online>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBlX6u11oFQ8wP1LPJs38sf1hKnLUhwom0&libraries=places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                key="map"
                lat={this.state.map.lat}
                lng={this.state.map.lng}
              />
            </Online>
            <Offline>
              <span>
                Para poder ver el mapa con la localización de la farmacia debes
                de conectar tu dispositivo a internet.
              </span>
            </Offline>
          </div>
        </div>
      </div>
    );
  }
}

export default FarmaciaGuardia;
