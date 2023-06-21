import React, { useEffect } from "react";
import "./App.css";
import GeoMaps from "./components/GeoMaps";
import LoadingComp from "./components/LoadingComp";

function App() {
  const [currentPosition, setCurrentPosition] = React.useState<null | {
    lat: number;
    lng: number;
  }>(null);

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

  useEffect(() => {
    let watchId: any;

    const successCallback = (position: any) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      });
    };

    const errorCallback = (error: any) => {
      console.error("Location error:", error);
    };

    // Start watching for location updates
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
      // Stop watching for location updates when component is unmounted
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default browser prompt
    event.preventDefault();
    // Show your custom "Add to Home Screen" prompt
    // e.g., display a button or a custom UI element
    // and handle the user interaction to call the `prompt()` method
    showAddToHomeScreenPrompt(event);
  });
  
  function showAddToHomeScreenPrompt(event: any) {
    // Show your custom prompt UI and handle the user interaction
    // For example, display a button and call the prompt() method on click
    const addToHomeScreenButton = document.getElementById('add-to-home-screen-button');
    if (!addToHomeScreenButton) return;
    addToHomeScreenButton.addEventListener('click', () => {
      // Call the prompt() method to show the native "Add to Home Screen" prompt
      event.prompt();
      // Optionally, handle the user's choice and log the result
      event.userChoice.then((choiceResult: any) => {
        console.log('User choice:', choiceResult.outcome);
      });
    });
  }

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
