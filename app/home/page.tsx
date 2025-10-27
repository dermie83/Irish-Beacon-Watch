import { fetchLighthouseABWMetrics, 
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
    <>{error && <ErrorMessage message={errorMessage} />}
      <div className="grid grid-cols-1 md:grid-cols-1 grid-rows-6 gap-4 min-h-screen">
        <div className="col-span-1 row-span-1">
          <MetricsTable
            maxabovewater={maxABW.slice(0)[0]}
            abovewatername={maxABWName.slice(0)[0]}
            maxtowerheight={maxTower.slice(0)[0]}
            towerheightname={maxTowerName.slice(0)[0]}
            maxrange={maxRange.slice(0)[0]}
            rangename={maxRangeName.slice(0)[0]}
            agename={maxAgeName.slice(0)[0]}
            maxage={maxage.slice(0)[0]}
          />
        </div>
        <div className="col-span-1 row-span-1">
          <Map />
        </div>
        <div className="col-span-1 row-span-1">
          <RangeGraph rangeData={ranges} />
        </div>
        <div className="col-span-1 row-span-1">
          <AboveWaterGraph abwData={abwMetrics} />
        </div>
        <div className="col-span-1 row-span-1">
          <TowerGraph towerData={towerHeights} />
        </div>
        <div className="col-span-1 row-span-1">
          <AgeGraph ageData={ages} />
        </div>
      </div>
      <footer className="w-full bg-gray-800 text-white text-center p-4 mt-4">
        <Footer/>
      </footer>
  </>
  );
    
}