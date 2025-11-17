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
import styles from '@/app/lib/LighthouseMap.module.css';

export interface MapProps {
  lighthouses: Pick<
    LighthouseType,
    "id" | "name" | "latitude" | "longitude" | "coast" | "image_url" | "country"
  >[];
}

const coasts = ["All", "North Atlantic Ocean", "North Channel", "Irish Sea", "Celtic Sea"] as const;
const countries = ["All", "Ireland", "Northern Ireland"] as const;
const defaultCenter = { lat: 53.4462988, lng: -7.5265753 };

export default function LighthouseMap({ lighthouses = [] }: MapProps) {
  const [selectedCoast, setSelectedCoast] = useState<(typeof coasts)[number]>("All");
  const [selectedCountry, setSelectedCountry] = useState<(typeof countries)[number]>("All");

  const router = useRouter();
  const mapRef = useRef<LeafletMap | null>(null);

  const filtered = lighthouses
    .filter((l) => selectedCoast === "All" ? true : l.coast === selectedCoast)
    .filter((l) => selectedCountry === "All" ? true : l.country?.trim().toLowerCase() === selectedCountry.toLowerCase());

  const zoom = 7;

  const handleMarkerDoubleClick = useCallback(
    (lighthouseName: string) => {
      router.push(`/home/lighthouse?page=1&query=${encodeURIComponent(lighthouseName)}`);
    },
    [router]
  );

  // Recenter map to filtered markers whenever filters change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (filtered.length === 0) {
      map.flyTo(defaultCenter, zoom);
      return;
    }

    const bounds = L.latLngBounds(filtered.map(l => [l.latitude, l.longitude]));
    map.flyToBounds(bounds, { padding: [50, 50] });
  }, [filtered]);

  return (
    <div className="space-y-1">
      {/* Filters Buttons */}
      <div className="space-y-1 w-full md:w-1/3 relative">
        <select
          value={selectedCoast}
          onChange={(e) => setSelectedCoast(e.target.value as typeof coasts[number])}
          className="w-full appearance-none bg-white border border-gray-300 text-gray-700 px-4 py-2 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {coasts.map((coast) => (
            <option key={coast} value={coast}>{coast}</option>
          ))}
        </select>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value as (typeof countries)[number])}
          className="w-full appearance-none bg-white border border-gray-300 text-gray-700 px-4 py-2 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Map container */}
      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          ref={mapRef}
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
            maxClusterRadius={40}
            showCoverageOnHover={false}
            iconCreateFunction={(cluster: any) => {
              const count = cluster.getChildCount();
              let size = "30px";
              if (count >= 10 && count < 50) size = "40px";
              else if (count >= 50) size = "50px";
              let bgColor = "#06b6d4";
              if (count >= 10 && count < 50) bgColor = "#3b82f6";
              else if (count >= 50) bgColor = "#ef4444";

              return L.divIcon({
                html: `<div style="background-color: ${bgColor}; color: white; width: ${size}; height: ${size}; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid white; font-weight: bold; font-size: ${parseInt(size)/2}px;">${count}</div>`,
                className: "",
                iconSize: L.point(parseInt(size), parseInt(size)),
              });
            }}
          >
            {filtered.map((lighthouse: any) => {
              const lighthouseIcon = L.divIcon({
                html: `<div style="width:32px; height:32px; text-align:center;"><img src='/lighthouses/lighthouseIcon.png' alt='Lighthouse' style='width:100%; height:100%; object-fit:cover;' /></div>`,
                className: "",
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              });

              return (
                <Marker
                  key={lighthouse.id}
                  position={{lat: lighthouse.latitude, lng: lighthouse.longitude}}
                  icon={lighthouseIcon}
                  draggable={false}
                  eventHandlers={{
                    click: (e) => e.originalEvent.stopPropagation(),
                    dblclick: () => handleMarkerDoubleClick(lighthouse.name),
                  }}
                >
                  <Popup>
                    <div className={styles.popup}>
                      <img className={styles.popupImage} src={lighthouse.image_url} alt={lighthouse.name} />
                      <div className={styles.popupName}>{lighthouse.name}</div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
