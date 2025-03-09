import { fetchLighthouses, fetchLighthousePages, fetchHistoricalWeather} from "@/app/lib/data";
import TableRow from "@/app/ui/historical/dailyTable";
import LineGraph from "@/app/ui/historical";
import { LineChart } from "recharts";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    query?:string;
  }>;
  }) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    console.log("query...",query)
    const lighthouses = await fetchLighthouses(currentPage, query);
    const totalPages = await fetchLighthousePages(query);
   
  return (
    <>
      <h1>Historical Weather</h1>
      <Search placeholder="Search Lighthouse..." />
      {lighthouses.map(async(lighthouse) => {
        const { daily } = await fetchHistoricalWeather(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        
        return (
          <>
            <h1>{ lighthouse.name }</h1>
            <div>  
              <LineGraph daily = {daily}/>
            </div>
          </>
        )
      })}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
