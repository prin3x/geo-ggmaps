import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'


interface IMapProps {
    lat: number;
    lng: number;
}

export default function SimpleMap(props: IMapProps) {
  const [currentPosition, setCurrentPosition] = useState({
    lat: props.lat,
    lng: props.lng,
  });

  console.log(currentPosition,'currentPosition')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updateCurrentPosition);
    } else {
      // Geolocation is not supported by the browser
      // Handle this case appropriately
    }
  }, []);

  const updateCurrentPosition = (position: any) => {
    const { latitude, longitude } = position.coords;
    setCurrentPosition({ lat: latitude, lng: longitude });
  };

  const defaultProps = {
    center: {
      lat: 13.9035369,
      lng: 100.6679599,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={16}
      >
          <Marker lat={currentPosition.lat} lng={currentPosition.lng} />
      </GoogleMapReact>
    </div>
  );
}


const Marker = (props: any) => <div className="marker"><FontAwesomeIcon icon={faLocationDot} style={{color: "#58b3f9"}} size={'2xl'} /></div>;
