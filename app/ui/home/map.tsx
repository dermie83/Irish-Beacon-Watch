"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
// import { LighthouseProps } from '@/app/lib/definitions';


// interface Lighthouses {
//     posix: LatLngExpression | LatLngTuple,
//     zoom?: number,
// }

// const defaults = {
//     zoom: 7,
// }

const lighthouses = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'Hook',
      latitude: 52.1237453,
      longitude: -6.9293683,
      posix: [52.1237453,-6.9293683]

    },
    {
      id: '410544b8-4001-4271-9855-fec4b6a6442a',
      name: 'Muglins',
      latitude: 53.2755975,
      longitude: -6.0758683,
      posix: [53.2755975,-6.0758683]
    },
  ];

  const zoom = 7;




export default function Map() {
    
    return (
        <MapContainer
            center={{lat: lighthouses[0].latitude, lng:lighthouses[0].longitude}}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        {lighthouses.map((item, i) => (
            <Marker key = {i} position={{lat: item.latitude, lng:item.longitude}} draggable={false}>
                <Popup>{item.name}</Popup>
            </Marker>))}
        </MapContainer>
    )}
