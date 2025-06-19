import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import MarkerClusterGroup from 'react-leaflet-cluster';

function SetViewOnUserLocation({ fallback }) {
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.setView([position.coords.latitude, position.coords.longitude], 11);
      },
      () => {
        map.setView(fallback, 5); // fallback to India
      }
    );
  }, [map, fallback]);

  return null;
}

export default function MapComponent({ stations }) {
  const validStations = stations.filter(
    (station) =>
      station.latitude &&
      station.longitude &&
      station.latitude !== "NA" &&
      station.longitude !== "NA" &&
      !isNaN(parseFloat(station.latitude)) &&
      !isNaN(parseFloat(station.longitude))
  );

  const fallbackCenter = [20.5937, 78.9629]; // India

  return (
    <MapContainer
      center={fallbackCenter}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <SetViewOnUserLocation fallback={fallbackCenter} />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {validStations.map((station) => (
          <Marker
            key={station.stationid || station._id}
            position={[
              parseFloat(station.latitude),
              parseFloat(station.longitude),
            ]}
          >
            <Popup>
              <strong>{station.name}</strong><br />
              {station.address}<br />
              {station.city}, {station.state}<br />
              Pricing: {station.pricing}<br />
              {station.connectors?.length > 0 && (
                <>Connectors: {station.connectors.join(", ")}<br /></>
              )}
              Status: <b>{station.availability ? "Available" : "Unavailable"}</b>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
