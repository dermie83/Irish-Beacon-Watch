import { fetchLighthouses, fetchLighthousePages } from "../lib/data";
import Map from '@/app/ui/home/map/index';
import RangeGraph from "../ui/home/rangeChart";
import Pagination from "../ui/forecast/pagination";

export default async function Page(props: {
    searchParams?: Promise<{
      page?: string;
    }>;
    }){
        const searchParams = await props.searchParams;
        // console.log("searchparams...",searchParams)
        const currentPage = Number(searchParams?.page) || 1;
        // console.log("currentPage...",currentPage)
        const lighthouses = await fetchLighthouses(currentPage);
        // const totalPages = await fetchLighthousePages();
        // console.log("totalpages....",totalPages)
        // console.log("fetch....",lighthouses)

    return (
        <>
         <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="col-span-2 row-span-4"><Map/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
         </div>
         {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
         </div> */}
        </>
    )
}