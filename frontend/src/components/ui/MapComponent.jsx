import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapComponent({ stations }) {
  const validStations = stations.filter(
    (station) =>
      station.latitude !== "NA" &&
      station.longitude !== "NA" &&
      !isNaN(parseFloat(station.latitude)) &&
      !isNaN(parseFloat(station.longitude))
  );

  const center =
    validStations.length > 0
      ? [parseFloat(validStations[0].latitude), parseFloat(validStations[0].longitude)]
      : [20.5937, 78.9629]; // Default India center

  return (
    <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validStations.map((station) => (
        <Marker key={station._id} position={[station.latitude, station.longitude]}>
          <Popup>
            <strong>{station.name}</strong><br />
            {station.address}<br />
            {station.city}, {station.state}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
