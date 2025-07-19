'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { LatLngExpression } from 'leaflet';

const position: LatLngExpression = [51.505, -0.09]; // Default position

const markers = [
  {
    geocode: [51.505, -0.09] as LatLngExpression,
    popUp: "Hello, I am a pop up 1"
  },
  {
    geocode: [51.51, -0.1] as LatLngExpression,
    popUp: "Hello, I am a pop up 2"
  },
  {
    geocode: [51.49, -0.08] as LatLngExpression,
    popUp: "Hello, I am a pop up 3"
  }
];

export function Map() {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-2xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode}>
          <Popup>
            {marker.popUp}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
