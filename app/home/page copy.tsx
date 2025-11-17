import { fetchAllLighthouses} 
from "../lib/data";
import Map from '@/app/ui/home/map';
import RangeGraph from "../ui/home/rangeChart";
import AboveWaterGraph from "../ui/home/aboveWaterChart";
import TowerGraph from "../ui/home/towerChart";
import MetricsTable from "../ui/home/metricsTable";
import AgeGraph from "../ui/home/ageChart";
import Footer from "../ui/footer";
import ErrorMessage from "../ui/error";

export default async function getServerSideProps(){

  if (typeof window == "undefined") {
    console.log("Application is on server side");
  } else {
    alert("Application is on client side");}

    const lighthouses = await fetchAllLighthouses();
    // console.log("list of lighthouse names ",lighthouses)

    const top15ByRangeW = [...lighthouses].sort((a, b) => (b.range_w ?? 0) - (a.range_w ?? 0)).slice(0, 15);
    const top15NamesAndRanges = top15ByRangeW.map(l => ({name: l.name, range_w: l.range_w, range_r: l.range_r,}));
    const maxRangeName = top15NamesAndRanges.map((item)=> item.name);
    const maxRange = top15NamesAndRanges.map((item)=> item.range_w);

    const top15ByABW = [...lighthouses].sort((a, b) => (b.abovewater ?? 0) - (a.abovewater ?? 0)).slice(0, 15);
    const top15NamesAndABW = top15ByABW.map(l => ({name: l.name, abovewater: l.abovewater,}));
    const maxABWName = top15NamesAndABW.map((item)=> item.name);
    const maxABW = top15NamesAndABW.map((item)=> item.abovewater);

    const top15ByTowerHeight = [...lighthouses].sort((a, b) => (b.towerheight ?? 0) - (a.towerheight ?? 0)).slice(0, 15);
    const top15NamesAndTowerHeight = top15ByTowerHeight.map(l => ({name: l.name, towerheight: l.towerheight,}));
    const maxTowerName = top15NamesAndTowerHeight.map((item)=> item.name);
    const maxTower = top15NamesAndTowerHeight.map((item)=> item.towerheight);

    const top15ByAge = [...lighthouses].sort((a, b) => (b.age ?? 0) - (a.age ?? 0)).slice(0, 15);
    const top15NamesAndAge = top15ByAge.map(l => ({name: l.name, age: l.age,}));
    const maxAgeName = top15NamesAndAge.map((item)=> item.name);
    const maxage = top15NamesAndAge.map((item)=> item.age);
    

    const error = false;
    const errorMessage = "Failed to load data. Please refresh the page.";
   
    return (
      <>
        {error && <ErrorMessage message={errorMessage} />}
          <div className="grid grid-cols-1 gap-4 min-h-screen">
            <div className="w-full">
            <Map
              lighthouses={lighthouses.map((lighthouse) => ({
                id: lighthouse.id,
                name: lighthouse.name,
                latitude: lighthouse.latitude,
                longitude: lighthouse.longitude,
                coast: lighthouse.coast,
                image_url: lighthouse.image_url,
                country: lighthouse.country,
              }))}
            />
          </div>
          <div className="text-sm md:text-base">
            <MetricsTable
              maxabovewater={Math.max(...maxABW) ?? ""}
              abovewatername={maxABWName?.slice(0)[0] ?? ""}
              maxtowerheight={Math.max(...maxTower) ?? ""}
              towerheightname={maxTowerName?.slice(0)[0] ?? ""}
              rangename={maxRangeName?.slice(0)[0] ?? ""}
              maxrange={Math.max(...maxRange) ?? ""}
              agename={maxAgeName?.slice(0)[0] ?? ""}
              maxage={Math.max(...maxage) ?? ""}
            />
          </div>

          <div className="w-full">
            <RangeGraph rangeData={top15NamesAndRanges} />
          </div>

          <div className="w-full">
            <AboveWaterGraph abwData={top15NamesAndABW} />
          </div>

          <div className="w-full">
            <TowerGraph towerData={top15NamesAndTowerHeight} />
          </div>

          <div className="w-full">
            <AgeGraph ageData={top15NamesAndAge} />
          </div>
        </div>

        <footer className="w-full bg-gray-800 text-white text-center p-4 mt-4">
          <Footer />
        </footer>
      </>
    );
    
}