import React, { useEffect, useState } from "react";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

interface IMapProps {
  lat: number;
  lng: number;
  requestGeolocation: () => void;
}

export default function GeoMaps(props: IMapProps) {
  return (
    <div style={{ height: "100vh", width: "100%" }} className="map-container">
      <div
        className="current-location-button"
        onClick={props.requestGeolocation}
      >
        <FontAwesomeIcon icon={faLocationArrow} />
      </div>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: "" }}
        defaultZoom={19}
        center={{ lat: props.lat, lng: props.lng }}
      >
        <Marker lat={props.lat} lng={props.lng} />
      </GoogleMapReact>
    </div>
  );
}

const Marker = (props: any) => (
  <div className="marker">
    <FontAwesomeIcon
      icon={faLocationDot}
      style={{ color: "#58b3f9" }}
      size={"2xl"}
    />
  </div>
);
