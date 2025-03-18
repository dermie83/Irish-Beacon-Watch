import { fetchLighthouseABWMetrics, 
        fetchLighthouseAges, 
        fetchLighthouseRanges, 
        fetchLighthouseTowerMetrics } 
from "../lib/data";
import Map from '@/app/ui/home/map/index';
import RangeGraph from "../ui/home/rangeChart";
import AboveWaterGraph from "../ui/home/aboveWaterChart";
import TowerGraph from "../ui/home/towerChart";
import Pagination from "../ui/pagination";
import Search from "../ui/search";
import MetricsTable from "../ui/home/metricsTable";
import AgeGraph from "../ui/home/ageChart";

export default async function Page(){
    const ranges = await fetchLighthouseRanges();
    const maxRangeName = ranges.map((item)=> item.name);
    const maxRange = ranges.map((item)=> item.range);

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

    return (
        <>
         <div className="grid grid-cols-3 grid-rows-5 gap-4">
         <div className="col-span-3 row-span-1"><MetricsTable 
                maxabovewater={maxABW.slice(-1)[0]}
                abovewatername={maxABWName.slice(-1)[0]}
                maxtowerheight={maxTower.slice(-1)[0]}
                towerheightname={maxTowerName.slice(-1)[0]} 
                maxrange={maxRange.slice(-1)[0]}
                rangename={maxRangeName.slice(-1)[0]}
                agename={maxAgeName.slice(-1)[0]}
                maxage={maxage.slice(-1)[0]}
              />
            </div>
            <div className="col-span-2 row-span-4"><Map/></div>
            <div className="col-span-1 row-span-1"><RangeGraph rangeData={ranges}/></div>
            <div className="col-span-1 row-span-1"><AboveWaterGraph abwData={abwMetrics}/></div>
            <div className="col-span-1 row-span-1"><TowerGraph towerData={towerHeights}/></div>
            <div className="col-span-1 row-span-1"><AgeGraph ageData={ages}/></div>
         </div>
        </>
    )
}