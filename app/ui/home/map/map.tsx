import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LighthouseProps } from "@/app/lib/definitions";


export default function Map({
    id= '410544b8-4001-4271-9855-fec4b6a6442a',
    name= 'Muglins',
    latitude= 53.2755975,
    longitude= -6.0758683,
}: LighthouseProps) {
    const zoom = 7;
    
    return (
        <MapContainer
            center={{lat: latitude , lng: longitude}}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        
            <Marker key = {id} position={{lat:latitude,lng:longitude}} draggable={false}>
                <Popup>{name}</Popup>
            </Marker>
        </MapContainer>
    )}
