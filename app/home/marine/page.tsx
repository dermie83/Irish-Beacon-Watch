import { fetchLighthousePages, fetchLighthouses, getMarineForecast} from "@/app/lib/data";
import Pagination from "@/app/ui/forecast/pagination";
import LineGraph from "@/app/ui/marine";
import TableRow from "@/app/ui/marine/hourlyTable";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
  })  {
    const searchParams = await props.searchParams;
    // console.log("searchparams...",searchParams)
    const currentPage = Number(searchParams?.page) || 1;
    // console.log("currentPage...",currentPage)
    const lighthouses = await fetchLighthouses(currentPage);
    const totalPages = await fetchLighthousePages();
    // console.log("totalpages....",totalPages)
  return (
    <>
      <h1>Current Marine Forecast</h1>
      {lighthouses.map(async(lighthouse) => {
        const { hourly } = await getMarineForecast(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        // console.log("Current....",hourly);
        // console.log(lighthouse.name);

        return (
          <>
            <h1>{ lighthouse.name }</h1>
            <div>  
              <LineGraph hourly = {hourly}/>
            </div>
            {/* <div className="bg-white-700 mx-auto my-5 w-[40%] h-[40%]">
                    <Map 
                    id={lighthouse.id} 
                    name={lighthouse.name} 
                    latitude={lighthouse.latitude} 
                    longitude={lighthouse.longitude} 
                    />
            </div> */}


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
                  {hourly.map((item, index) => (
                    <TableRow
                      key={index}
                      timestamp={item.timestamp}
                      waveHeight={item.waveHeight}
                    />
                  ))}
                </tbody>
            </table> */}
          </>
        )
      })}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}