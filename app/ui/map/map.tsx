import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LighthouseType } from "@/app/lib/definitions";
import { useState } from "react";

//lat: 53.4462988 , lng: -7.5265753

export default function Map(lighthouse: LighthouseType) {
    const zoom = 10;
    const center = { lat: lighthouse.latitude, lng: lighthouse.longitude };
    // const [marker, setMarker] = useState<LighthouseType>(lighthouse);
    function MapView() {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
    
    return (
        <MapContainer
            center={{lat: lighthouse.latitude , lng: lighthouse.longitude}}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        
            <Marker key = {lighthouse.id} 
                    position={{lat: lighthouse.latitude , lng: lighthouse.longitude}} 
                    draggable={false}>
                <Popup> 
                    Name: {lighthouse.name}, Constructed: {lighthouse.constructed}, Age: {lighthouse.age} years
                </Popup>
            </Marker>
            <MapView />
        </MapContainer>
    )}
