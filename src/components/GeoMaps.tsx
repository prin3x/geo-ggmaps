import React, { useEffect, useState } from "react";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface IMapProps {
  lat: number;
  lng: number;
}

export default function GeoMaps(props: IMapProps) {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: "" }}
        defaultZoom={16}
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
