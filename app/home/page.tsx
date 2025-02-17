import { fetchLighthouses } from "../lib/data";
import Map from '@/app/ui/home/map/index';
import RangeGraph from "../ui/home/rangeChart";

export default async function Page() {

    const lighthouses = await fetchLighthouses();
    console.log(lighthouses);

    return (
        <>
         <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="col-span-2 row-span-4"><Map/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
         </div>
        </>
    )
}