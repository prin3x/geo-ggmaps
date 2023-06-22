import React, { useCallback, useEffect } from "react";
import "./styles/style.css";
import GeoMaps from "./components/GeoMaps";
import LoadingComp from "./components/LoadingComp";
import { setLocalStorage } from "./functions/localstorage.functions";
import ErrorLocation from "./components/ErrorLocation";

interface ICurrentPosition {
  lat: number;
  lng: number;
}

function App() {
  const [
    currentPosition,
    setCurrentPosition,
  ] = React.useState<null | ICurrentPosition>(null);

  const [errorCode, setErrorCode] = React.useState<null | number>(null);

  const successCallback = (position: any) => {
    const { latitude, longitude } = position.coords;
    setLocalStorage(latitude, longitude);

    changeCurrentPosition(latitude, longitude);
  };

  const changeCurrentPosition = (lat: number, lng: number) => {
    setCurrentPosition({
      lat,
      lng,
    });
  };

  const errorCallback = (error: any) => {
    console.error(
      `Error Geolocation WatchPosition - ${error.code} ${error.message}`
    );
    setErrorCode(error.code);
  };

  useEffect(() => {
    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    if (lat && lng) changeCurrentPosition(parseFloat(lat), parseFloat(lng));

    let watchId: number;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        {
          enableHighAccuracy: true,
        }
      );
    }

    return () => {
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className="App" data-testid="app">
      {currentPosition && errorCode !== 1 ? (
        <GeoMaps lat={currentPosition.lat} lng={currentPosition.lng} />
      ) : errorCode === 1 ? (
        <ErrorLocation />
      ) : (
        <LoadingComp />
      )}
    </div>
  );
}

export default App;
