import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LighthouseType } from "@/app/lib/definitions";

interface MapProps {
  lighthouse: Pick<LighthouseType, "id" | "name" | "latitude" | "longitude">;
}

export default function Map({ lighthouse }: MapProps) {
    const zoom = 5;
    const center = { lat: lighthouse.latitude, lng: lighthouse.longitude };
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
                    {lighthouse.name}
                </Popup>
            </Marker>
            <MapView />
        </MapContainer>
    )}
