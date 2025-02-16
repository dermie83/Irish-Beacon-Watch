import { fetchLighthouses, getWeather } from "@/app/lib/data";
import Header from "@/app/ui/forecast/dailyTable";
import DayCard from "@/app/ui/forecast/dayCard";
import TableRow from "@/app/ui/forecast/hourlyTable";
import Map from "@/app/ui/forecast/map";

export default async function Page() {
  const lighthouses = await fetchLighthouses();
  return (
    <>
      <h1>Current Weather</h1>
      {lighthouses.map(async(lighthouse) => {
        const { current, daily, hourly } = await getWeather(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        // console.log("Current....",current);
        // console.log(lighthouse.name);

        return (
          <>
          <div className="grid grid-cols-2 gap-4">
            {/* <h1>{ lighthouse.name }</h1> */}
            {/* <div className="col-span-2 bg-white-700 mx-auto my-5 w-[40%] h-[40%]"> */}
            <Map
                id={lighthouse.id}
                name={lighthouse.name} 
                latitude={lighthouse.latitude} 
                longitude={lighthouse.longitude} 
                towerHeight={lighthouse.towerHeight}
                lightHeight={lighthouse.lightHeight}
                range={lighthouse.range}
                greatLighthouse={lighthouse.greatLighthouse}
              />
            {/* </div> */}
              <Header
                currentTemp={current?.currentTemp}
                highTemp={current?.highTemp}
                lowTemp={current?.lowTemp}
                highFeelsLike={current?.highFeelsLike}
                lowFeelsLike={current?.lowFeelsLike}
                windSpeed={current?.windSpeed}
                precip={current?.precip}
                iconCode={current?.iconCode}
              />
          </div>
            <section className="grid grid-cols-[repeat(auto-fit,100px)] gap-2 justify-center p-4">
              {daily.map((item, index) => (
                <DayCard
                  key={index}
                  iconCode={item.iconCode}
                  timestamp={item.timestamp}
                  degree={item.maxTemp}
                />
              ))}
            </section>
          
            {/* <div className="grid grid-cols-3 gap-4">
              <div className="...">01</div>
              <div className="...">02</div>
              <div className="...">03</div>
              <div className="col-span-2 ...">04</div>
              <div className="...">05</div>
              <div className="...">06</div>
              <div className="col-span-2 ...">07</div>
            </div> */}
             {/* <table className="w-full text-center border-spacing-0">
                <tbody>
                  {hourly.map((item, index) => (
                    <TableRow
                      key={index}
                      maxTemp={item.maxTemp}
                      feelsLike={item.feelsLike}
                      precip={item.precip}
                      timestamp={item.timestamp}
                      windSpeed={item.windSpeed}
                      iconCode={item.iconCode}
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
