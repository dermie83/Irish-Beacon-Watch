import { fetchAllLighthouses, fetchLighthouseABWMetrics, 
        fetchLighthouseAges, 
        fetchLighthouseRanges, 
        fetchLighthouseTowerMetrics } 
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
    // console.log("list of lighouses ",lighthouses)

    const ranges = await fetchLighthouseRanges();
    const maxRangeName = ranges.map((item)=> item.name);
    const maxRange = ranges.map((item)=> item.range_w);

    const abwMetrics = await fetchLighthouseABWMetrics();
    const maxABWName = abwMetrics.map((item)=> item.name);
    const maxABW = abwMetrics.map((item)=> item.abovewater);

    const towerHeights = await fetchLighthouseTowerMetrics();
    const maxTowerName = towerHeights.map((item)=> item.name);
    const maxTower = towerHeights.map((item)=> item.towerheight);
    // console.log(maxTower.slice(-1)[0]);

    const ages = await fetchLighthouseAges();
    const maxAgeName = ages.map((item)=> item.name);
    const maxage = ages.map((item)=> item.age);
    // console.log(maxage.slice(-1)[0]);
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
                image_url: lighthouse.image_url
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
            <RangeGraph rangeData={ranges} />
          </div>

          <div className="w-full">
            <AboveWaterGraph abwData={abwMetrics} />
          </div>

          <div className="w-full">
            <TowerGraph towerData={towerHeights} />
          </div>

          <div className="w-full">
            <AgeGraph ageData={ages} />
          </div>
        </div>

        <footer className="w-full bg-gray-800 text-white text-center p-4 mt-4">
          <Footer />
        </footer>
      </>
    );
    
}