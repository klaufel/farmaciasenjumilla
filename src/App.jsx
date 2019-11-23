import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pharmacies, setPharmacies] = useState([]);
  useEffect(() => {
    if (!pharmacies.length) {
      fetch("http://api.farmaciasenjumilla.com/list.json")
        .then(response => {
          return response.json();
        })
        .then(pharmacies => {
          setPharmacies(pharmacies);
        });
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Farmacias en Jumilla</p>
        {pharmacies.length ? (
          pharmacies.map(item => <div key={item.name}>{item.name}</div>)
        ) : (
          <div>cargando</div>
        )}
      </header>
    </div>
  );
}

export default App;
