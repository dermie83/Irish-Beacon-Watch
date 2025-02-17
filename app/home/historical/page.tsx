import { fetchLighthouses, getHistoricalWeather} from "@/app/lib/data";
import TableRow from "@/app/ui/historical/dailyTable";
import LineGraph from "@/app/ui/historical";
import { LineChart } from "recharts";

export default async function Page() {
  const lighthouses = await fetchLighthouses();
  return (
    <>
      <h1>Historical Weather</h1>
      {lighthouses.map(async(lighthouse) => {
        const { daily } = await getHistoricalWeather(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
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
    </>
  )
}
