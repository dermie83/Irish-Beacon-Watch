'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { Map as LeafletMap } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { lighthouses } from  "@/app/lib/placeholder-data";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";


export interface Lighthouse {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    image_url: string;
    abovewater: number;
    towerheight: number;
    range_w: number;
    range_r: number;
    coast: "North Atlantic Ocean" |
            "North Channel" | "Irish Sea" | "Celtic Sea";
    constructed: string;
    currentdate: string;
};

const coasts = ["All", "North Atlantic Ocean",
                "North Channel" , "Irish Sea" , "Celtic Sea"] as const;


// Default center of Ireland
const defaultCenter = { lat: 53.4462988, lng: -7.5265753 };

export default function LighthouseMap() {
  const [selectedProvince, setSelectedProvince] =
    useState<(typeof coasts)[number]>("All");

  const router = useRouter();
  const mapRef = useRef<LeafletMap | null>(null); // ⭐ reference to map instance

  const filtered =
    selectedProvince === "All"
      ? lighthouses
      : lighthouses.filter((l) => l.coast === selectedProvince);

  const zoom = 7;

  const handleMarkerDoubleClick = useCallback(
    (lighthouseName: string) => {
      router.push(
        `/home/forecast?page=1&query=${encodeURIComponent(lighthouseName)}`
      );
    },
    [router]
  );

  // ⭐ When coast changes, recenter the map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedProvince === "All") {
      map.flyTo(defaultCenter, zoom);
    } else {
      const coastMarkers = lighthouses.filter((l) => l.coast === selectedProvince);
      if (coastMarkers.length > 0) {
        const bounds = L.latLngBounds(
          coastMarkers.map((l) => [l.latitude, l.longitude])
        );
        map.flyToBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [selectedProvince]);

  return (
    <div className="space-y-1">
      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {coasts.map((coast) => (
          <button
            key={coast}
            className={`px-3 py-2 rounded ${
              selectedProvince === coast
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedProvince(coast)}
          >
            {coast}
          </button>
        ))}
      </div>

      {/* Map container */}
      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          ref={mapRef} // ✅ Use ref directly
          center={defaultCenter}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={15}
            showCoverageOnHover={false}
          >
            {filtered.map((lighthouse) => (
              <Marker
                key={lighthouse.id}
                position={{ lat: lighthouse.latitude, lng: lighthouse.longitude }}
                draggable={false}
                eventHandlers={{
                  click: (e) => e.originalEvent.stopPropagation(),
                  dblclick: () => handleMarkerDoubleClick(lighthouse.name),
                }}
              >
                <Popup>{lighthouse.name}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}