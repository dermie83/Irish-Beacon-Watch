import { fetchLighthouses, fetchLighthousePages, fetchHistoricalWeather} from "@/app/lib/data";
import LineGraph from "@/app/ui/historical";
import { LineChart } from "recharts";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import MetricsTable from "@/app/ui/historical/metricsTable";
import Button from "@/app/ui/historical/button/index";

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
      <div style={{ padding: '20px' }}>
        <Button/>
      </div>
      <Search placeholder="Search Lighthouse..." />
      {lighthouses.map(async(lighthouse) => {
        const { daily } = await fetchHistoricalWeather(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin');
        const maxWind = daily.map(item => item.wind);
        const maxWindValue = Math.max(...maxWind);
        // console.log("maxWind......",maxWindValue);
        const maxGust = daily.map(item => item.gust);
        const maxGustValue = Math.max(...maxGust);
        // console.log("maxGust......",maxGustValue);
        
        return (
          <>
          <div className="grid grid-cols-8 grid-rows-2 gap-1 flex items-center border-2 shadow-md">
              <div className="col-span-1 row-span-1 text-2xl text-center tracking-wide text-blue-600 dark:text-sky-400">{ lighthouse.name }
              </div>
              <div className="col-span-7 row-span-1">
              <MetricsTable 
                maxGust={maxGustValue} 
                maxWind={maxWindValue}
              />
              </div>
              <div className="col-span-8 row-span-1">
                <LineGraph daily = {daily}/>
              </div>
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
