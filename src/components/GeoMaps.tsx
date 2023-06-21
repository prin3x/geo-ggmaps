import React from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface IMapProps {
  lat: number;
  lng: number;
}

export default function GeoMaps(props: IMapProps) {
  return (
    <div style={{ height: "100vh", width: "100%" }} className="map-container" data-testid="geo-maps">
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
  <div className="marker" data-testid="marker">
    <FontAwesomeIcon
      icon={faLocationDot}
      style={{ color: "#58b3f9" }}
      size={"2xl"}
    />
  </div>
);
