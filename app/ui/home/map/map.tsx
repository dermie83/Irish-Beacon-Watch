'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { Map as LeafletMap } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LighthouseType } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// ✅ Define props for your map
export interface MapProps {
  lighthouses: Pick<
    LighthouseType,
    "id" | "name" | "latitude" | "longitude" | "coast"
  >[];
}

const coasts = ["All", "North Atlantic Ocean",
                "North Channel" , "Irish Sea" , "Celtic Sea"] as const;


// Default center of Ireland
const defaultCenter = { lat: 53.4462988, lng: -7.5265753 };

export default function LighthouseMap({ lighthouses = [] }: MapProps) {
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
        `/home/lighthouse?page=1&query=${encodeURIComponent(lighthouseName)}`
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
      <div className="space-y-1 w-full md:w-1/3 relative">
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value as typeof coasts[number])}
          className="w-full appearance-none bg-white border border-gray-300 text-gray-700 px-4 py-2 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {coasts.map((coast) => (
            <option key={coast} value={coast}>
              {coast}
            </option>
          ))}
        </select>
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
            maxClusterRadius={40} // adjust how far markers cluster together
            showCoverageOnHover={false}
            iconCreateFunction={(cluster: any) => {
              const count = cluster.getChildCount(); // number of markers in this cluster

              // Dynamic size based on number of markers
              let size = "30px";
              if (count >= 10 && count < 50) size = "40px";
              else if (count >= 50) size = "50px";

              // Dynamic color based on count
              let bgColor = "#06b6d4"; // teal
              if (count >= 10 && count < 50) bgColor = "#3b82f6"; // blue
              else if (count >= 50) bgColor = "#ef4444"; // red

              return L.divIcon({
                html: `
                  <div style="
                    background-color: ${bgColor};
                    color: white;
                    width: ${size};
                    height: ${size};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    border: 2px solid white;
                    font-weight: bold;
                    font-size: ${parseInt(size) / 2}px;
                  ">
                    ${count}
                  </div>
                `,
                className: "", // remove default cluster styles
                iconSize: L.point(parseInt(size), parseInt(size)),
              });
            }}
          >
            {filtered.map((lighthouse: any) => (
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