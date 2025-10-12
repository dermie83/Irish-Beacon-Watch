'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {lighthouses} from  "@/app/lib/placeholder-data";
import { useRouter } from "next/navigation";

//lat: 53.4462988 , lng: -7.5265753

export default function getServerSideProps() {
    const zoom = 7;
    const router = useRouter();
    const handleMarkerClick = (lighthouseName: string) => {
        router.push(`home/forecast?page=1&query=${encodeURIComponent(lighthouseName)}`);
  };
    return (
        <MapContainer
            center={{lat: 53.4462988 , lng: -7.5265753}}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        {lighthouses.map((lighthouse)=>
            <Marker key = {lighthouse.id} 
                    position={{lat: lighthouse.latitude , lng: lighthouse.longitude}} 
                    draggable={false}
                    eventHandlers={{
                        click: () => handleMarkerClick(lighthouse.name),
                    }}>
                <Popup> 
                    {lighthouse.name}
                </Popup>
            </Marker>
        )}
        </MapContainer>
    )}
