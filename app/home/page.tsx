import { fetchLighthouseABWMetrics, fetchLighthouseRanges, fetchLighthouseTowerMetrics } from "../lib/data";
import Map from '@/app/ui/home/map/index';
import RangeGraph from "../ui/home/rangeChart";
import AboveWaterGraph from "../ui/home/aboveWaterChart";
import TowerGraph from "../ui/home/towerChart";
import Pagination from "../ui/pagination";
import Search from "../ui/search";

export default async function Page(){
    const ranges = await fetchLighthouseRanges();
    const abwMetrics = await fetchLighthouseABWMetrics();
    const towerHeights = await fetchLighthouseTowerMetrics();
    // console.log("fetch Toewer 2.....", towerHeights);

    return (
        <>
         <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="col-span-2 row-span-4"><Map/></div>
            <div className="col-span-1 row-span-1"><RangeGraph rangeData={ranges}/></div>
            <div className="col-span-1 row-span-1"><AboveWaterGraph abwData={abwMetrics}/></div>
            <div className="col-span-1 row-span-1"><TowerGraph towerData={towerHeights}/></div>
         </div>
        </>
    )
}