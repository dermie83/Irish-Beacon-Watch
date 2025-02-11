import { fetchLighthouses } from "../lib/data";
import Map from '@/app/ui/home/map';

export default async function Page() {

    const lighthouses = await fetchLighthouses();
    console.log(lighthouses);

    return (
        <>
        {lighthouses.map((lighthouse) => (
            <div className="bg-white-700 mx-auto my-5 w-[40%] h-[40%]">
                <Map 
                 id={lighthouse.id} 
                 name={lighthouse.name} 
                 latitude={lighthouse.latitude} 
                 longitude={lighthouse.longitude} 
                />
            </div>
        ))}
        </>
    )
}