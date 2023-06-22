import React, { useEffect } from "react";
import "./styles/style.css";
import GeoMaps from "./components/GeoMaps";
import LoadingComp from "./components/LoadingComp";
import { setLocalStorage } from "./functions/localstorage.functions";
import ErrorLocation from "./components/ErrorLocation";

function App() {
  const [currentPosition, setCurrentPosition] = React.useState<null | {
    lat: number;
    lng: number;
  }>(null);
  const [error, setError] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const successCallback = (position: any) => {
    const { latitude, longitude } = position.coords;
    setLocalStorage(latitude, longitude);

    changeCurrentPosition(latitude, longitude);
    setLoading(false);
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
    setLoading(false);
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
    if (loading && !error) {
      return <LoadingComp />;
    } else if (!loading && currentPosition) {
      return <GeoMaps lat={currentPosition.lat} lng={currentPosition.lng} />;
    } else if (!loading && error) {
      return <ErrorLocation />;
    } else {
      return null;
    }
  };

  return (
    <div className="App" data-testid="app">
      <RenderContent />
    </div>
  );
}

export default App;
