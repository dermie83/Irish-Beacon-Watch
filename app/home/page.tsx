import { fetchLighthouses, fetchLighthousePages,fetchLighthouseRanges } from "../lib/data";
import Map from '@/app/ui/home/map/index';
import RangeGraph from "../ui/home/rangeChart";
import AboveWaterGraph from "../ui/home/aboveWaterChart";
import TowerGraph from "../ui/home/towerChart";
import Pagination from "../ui/pagination";
import Search from "../ui/search";

export default async function Page(){
    // const ranges = await fetchLighthouseRanges();
    // console.log("fetch Ranges.....", ranges);

    return (
        <>
         <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="col-span-2 row-span-4"><Map/></div>
            <div className="col-span-1 row-span-1"><RangeGraph/></div>
            <div className="col-span-1 row-span-1"><AboveWaterGraph/></div>
            <div className="col-span-1 row-span-1"><TowerGraph/></div>
         </div>
        </>
    )
}