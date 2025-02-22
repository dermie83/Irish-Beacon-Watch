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
    // console.log("searchparams...",searchParams)
    const currentPage = Number(searchParams?.page) || 1;
    // console.log("currentPage...",currentPage)
    const query = searchParams?.query || '';
    console.log("query...",query)
    const lighthouses = await fetchLighthouses(currentPage, query);
    const totalPages = await fetchLighthousePages(query);
    // console.log("totalpages....",totalPages)
    // console.log("fetch....",lighthouses)
  return (
    <>
      <h1>Historical Weather</h1>
      {lighthouses.map(async(lighthouse) => {
        const { daily } = await fetchHistoricalWeather(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        // console.log("Current....",daily);
        // console.log(lighthouse.name);

        return (
          <>
            <h1>{ lighthouse.name }</h1>
            <div>  
              <LineGraph daily = {daily}/>
            </div>
            {/* <Header
              currentTemp={current?.currentTemp}
              highTemp={current?.highTemp}
              lowTemp={current?.lowTemp}
              highFeelsLike={current?.highFeelsLike}
              lowFeelsLike={current?.lowFeelsLike}
              windSpeed={current?.windSpeed}
              precip={current?.precip}
              iconCode={current?.iconCode}
            /> */}
            {/* <section className="grid grid-cols-[repeat(auto-fit,100px)] gap-2 justify-center p-4">
              {daily.map((item, index) => (
                <DayCard
                  key={index}
                  iconCode={item.iconCode}
                  timestamp={item.timestamp}
                  degree={item.maxTemp}
                />
              ))}
            </section> */}
             {/* <table className="w-full text-center border-spacing-0">
                <tbody>
                  {daily.map((item, index) => (
                    <TableRow
                      key={index}
                      maxWind={item.maxWind}
                      timestamp={item.timestamp}
                      maxGust={item.maxGust}
                    
                    />
                  ))}
                </tbody>
            </table> */}
          </>
        )
      })}
      <Search placeholder="Search Lighthouse..." />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
