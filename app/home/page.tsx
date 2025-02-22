import { fetchLighthouses, fetchLighthousePages } from "../lib/data";
import Map from '@/app/ui/home/map/index';
import RangeGraph from "../ui/home/rangeChart";
import Pagination from "../ui/pagination";
import Search from "../ui/search";

export default async function Page(props: {
    searchParams?: Promise<{
      page?: string;
      query?:string;
    }>;
    }){
        const searchParams = await props.searchParams;
        // console.log("searchparams...",searchParams)
        const currentPage = Number(searchParams?.page) || 1;
        // console.log("currentPage...",currentPage)
        const query = searchParams?.query || '';
        console.log("query...",query)
        const lighthouses = await fetchLighthouses(currentPage, query);
        const totalPages = await fetchLighthousePages(query);
        // console.log("totalpages....",totalPages)
        console.log("fetch....",lighthouses)

    return (
        <>
         <div className="grid grid-cols-3 grid-rows-3 gap-4">
            <div className="col-span-2 row-span-4"><Map/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
            <div className="col-span-1 row-span-1"><RangeGraph characters={lighthouses}/></div>
            <Search placeholder="Search Lighthouse..." />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
         </div>
         {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
         </div> */}
        </>
    )
}