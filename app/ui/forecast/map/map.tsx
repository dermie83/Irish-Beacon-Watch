import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LighthouseProps } from "@/app/lib/definitions";

//lat: 53.4462988 , lng: -7.5265753

export default function Map(lighthouse: LighthouseProps) {
    const zoom = 7;
    
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
        
            <Marker key = {lighthouse.id} position={{lat: lighthouse.latitude , lng: lighthouse.longitude}} draggable={false}>
                <Popup> 
                    Name: {lighthouse.name}
                </Popup>
            </Marker>
        </MapContainer>
    )}
