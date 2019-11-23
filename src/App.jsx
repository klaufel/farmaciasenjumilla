import React, { useState, useEffect } from "react";
import Box from "./components/Box";

function App() {
  const [pharmacies, setPharmacies] = useState([]);
  useEffect(() => {
    if (!pharmacies.length) {
      fetch("https://api.farmaciasenjumilla.com/list.json")
        .then(response => {
          return response.json();
        })
        .then(list => {
          setPharmacies(list);
        })
        .catch(error => {
          console.log(error);
        });
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Farmacias en Jumilla</p>
        {pharmacies.length ? (
          pharmacies.map(item => <Box key={item.name}>{item.name}</Box>)
        ) : (
          <div>cargando</div>
        )}
      </header>
    </div>
  );
}

export default App;
