"use client";

import { useState, useMemo } from "react";
import LighthouseFilter from "@/app/ui/home/lighthouseFilter";
import Map from "@/app/ui/home/map";
import RangeGraph from "../ui/home/rangeChart";
import AboveWaterGraph from "../ui/home/aboveWaterChart";
import TowerGraph from "../ui/home/towerChart";
import MetricsTable from "../ui/home/metricsTable";
import AgeGraph from "../ui/home/ageChart";

export default function HomeClient({ lighthouses }: { lighthouses: any[] }) {
  const [selectedCoast, setSelectedCoast] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // ⭐ FILTER APPLIED HERE — ONE TIME FOR ALL COMPONENTS
  const filtered = useMemo(() => {
    return lighthouses
      .filter(l => selectedCoast === "All" ? true : l.coast === selectedCoast)
      .filter(l => selectedCountry === "All" ? true :
        l.country?.trim().toLowerCase() === selectedCountry.toLowerCase()
      );
  }, [selectedCoast, selectedCountry, lighthouses]);

  // ⭐ TOP 15 calculations are performed again on filtered data
  const top15ByRangeW = [...filtered]
    .sort((a, b) => (b.range_w ?? 0) - (a.range_w ?? 0))
    .slice(0, 15)
    .map(l => ({ name: l.name, range_w: l.range_w, range_r: l.range_r }));

  const top15ByABW = [...filtered]
    .sort((a, b) => (b.abovewater ?? 0) - (a.abovewater ?? 0))
    .slice(0, 15)
    .map(l => ({ name: l.name, abovewater: l.abovewater }));

  const top15ByTower = [...filtered]
    .sort((a, b) => (b.towerheight ?? 0) - (a.towerheight ?? 0))
    .slice(0, 15)
    .map(l => ({ name: l.name, towerheight: l.towerheight }));

  const top15ByAge = [...filtered]
    .sort((a, b) => (b.age ?? 0) - (a.age ?? 0))
    .slice(0, 15)
    .map(l => ({ name: l.name, age: l.age }));

  return (
    <div className="space-y-6">

      {/* ⭐ FILTERS AT TOP */}
      <LighthouseFilter
        selectedCoast={selectedCoast}
        setSelectedCoast={setSelectedCoast}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      {/* ⭐ MAP UPDATES */}
      <Map lighthouses={filtered} />

      {/* ⭐ METRICS TABLE UPDATES */}
      <MetricsTable
        maxabovewater={Math.max(...top15ByABW.map(x => x.abovewater ?? 0))}
        abovewatername={top15ByABW[0]?.name ?? ""}
        maxtowerheight={Math.max(...top15ByTower.map(x => x.towerheight ?? 0))}
        towerheightname={top15ByTower[0]?.name ?? ""}
        rangename={top15ByRangeW[0]?.name ?? ""}
        maxrange={Math.max(...top15ByRangeW.map(x => x.range_w ?? 0))}
        agename={top15ByAge[0]?.name ?? ""}
        maxage={Math.max(...top15ByAge.map(x => x.age ?? 0))}
      />

      <RangeGraph rangeData={top15ByRangeW} />
      <AboveWaterGraph abwData={top15ByABW} />
      <TowerGraph towerData={top15ByTower} />
      <AgeGraph ageData={top15ByAge} />
    </div>
  );
}
