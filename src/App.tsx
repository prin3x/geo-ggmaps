import React, { useEffect } from "react";
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
  
  const [error, setError] = React.useState<null | string>(null);

  const successCallback = (position: any) => {
    const { latitude, longitude } = position.coords;
    setLocalStorage(latitude, longitude);

    changeCurrentPosition(latitude, longitude);
  };

  const changeCurrentPosition = (lat: number, lng: number) =>
    setCurrentPosition({
      lat,
      lng,
    });

  const errorCallback = (error: any) => {
    console.error(
      `Error Geolocation WatchPosition - ${error.code} ${error.message}`
    );
    setError(error);
  };

  useEffect(() => {
    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    if (lat && lng) changeCurrentPosition(parseFloat(lat), parseFloat(lng));

    let watchId: number;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback
      );
    }

    return () => {
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const RenderContent = () => {
    if (error) return <ErrorLocation />;

    if (!currentPosition) {
      return <LoadingComp />;
    } else {
      return <GeoMaps lat={currentPosition.lat} lng={currentPosition.lng} />;
    }
  };

  return (
    <div className="App" data-testid="app">
      <RenderContent />
    </div>
  );
}

export default App;
