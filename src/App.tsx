import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SimpleMap from "./GoogleMap";

function App() {
  const [currentPosition, setCurrentPosition] = React.useState<null | {lat: number; lng:number}>(null);

  const handleSuccess = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);

    setCurrentPosition({
      lat: latitude,
      lng: longitude,
    });

    // Do something with the latitude and longitude, such as storing in state or sending to an API
  };

  const handleError = (error: any) => {
    // Handle geolocation error
    // You can check the error code and provide appropriate error messages or fallback behavior
  };

  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error(`Error`);
    }
  };

  return (
    <div className="App">
      <h2>Geolocation Component</h2>
      <button onClick={requestGeolocation}>Get Location</button>
      {currentPosition && (
        <SimpleMap lat={currentPosition.lat} lng={currentPosition.lng} />
      )}
    </div>
  );
}

export default App;
