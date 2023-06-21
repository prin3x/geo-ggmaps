import React, { useEffect } from "react";
import "./styles/App.css";
import GeoMaps from "./components/GeoMaps";
import LoadingComp from "./components/LoadingComp";
import { setLocalStorage } from "./functions/localstorage.functions";

function App() {
  const [currentPosition, setCurrentPosition] = React.useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const successCallback = (position: any) => {
    const { latitude, longitude } = position.coords;
    setLocalStorage(latitude, longitude)

    setCurrentPosition({
      lat: latitude,
      lng: longitude,
    });
  };

  const errorCallback = (error: any) => {
    console.error("Location error:", error);
  };

  useEffect(() => {
    const lat = localStorage.getItem("latitude");
    const lng = localStorage.getItem("longitude");

    if (lat && lng) {
      setCurrentPosition({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }

    let watchId: any;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback
      );
    }

    return () => {
      // Stop watching for location updates when component is unmounted
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className="App">
      {currentPosition ? (
        <GeoMaps lat={currentPosition.lat} lng={currentPosition.lng} />
      ) : (
        <LoadingComp />
      )}
    </div>
  );
}

export default App;
