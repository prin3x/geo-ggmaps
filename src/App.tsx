import React, { useEffect } from "react";
import "./styles/style.css";
import GeoMaps from "./components/GeoMaps";
import LoadingComp from "./components/LoadingComp";
import { setLocalStorage } from "./functions/localstorage.functions";

function App() {
  const [currentPosition, setCurrentPosition] = React.useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const requestGeolocation = () => {
    if (navigator.geolocation) {
      setCurrentPosition(() => {
        const lat = localStorage.getItem("latitude");
        const lng = localStorage.getItem("longitude");
        if (!lat || !lng) return null;


        return {
          lat: parseFloat(lat) + Math.random() / 10000000000,
          lng: parseFloat(lng) + Math.random() / 10000000000,
        };
      });

    } else {
      console.error(`Error: Geolocation is not supported by this browser.`);
    }
  };

  const successCallback = (position: any) => {
    const { latitude, longitude } = position.coords;
    setLocalStorage(latitude, longitude);

    setCurrentPosition({
      lat: latitude,
      lng: longitude,
    });
  };

  const errorCallback = (error: any) => {
    console.error(`Error: ${error.code} ${error.message}`);
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
        <GeoMaps
          lat={currentPosition.lat}
          lng={currentPosition.lng}
          requestGeolocation={requestGeolocation}
          data-testid="geo-maps"
        />
      ) : (
        <LoadingComp data-testid="loading-comp" />
      )}
    </div>
  );
}

export default App;
