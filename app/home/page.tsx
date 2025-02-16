import { fetchLighthouses } from "../lib/data";
import Map from '@/app/ui/home/map/index';
import RangeGraph from "../ui/home/rangeChart";

export default async function Page() {

    const lighthouses = await fetchLighthouses();
    console.log(lighthouses);

    return (
        <>
        <Map/>
        <RangeGraph characters={lighthouses}/>
        </>
    )
}