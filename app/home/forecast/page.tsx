import { fetchLighthouses, getWeather } from "@/app/lib/data";
import Header from "@/app/ui/forecast/dailyTable";
import DayCard from "@/app/ui/forecast/dayCard";
import Map from "@/app/ui/forecast/map";

export default async function Page() {
  const lighthouses = await fetchLighthouses();
  return (
    <>
      {lighthouses.map(async(lighthouse) => {
        const { current, daily, hourly } = await getWeather(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        // console.log("Current....",current);
        // console.log(lighthouse.name);

        return (
          <>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 flex items-center border-2 shadow-md">
              <div className="col-span-1 row-span-1 text-2xl text-center tracking-wide text-blue-600 dark:text-sky-400">{ lighthouse.name }
              </div>
              <section className="grid col-span-3 row-span-1 grid-cols-[repeat(auto-fit,100px)] gap-2">
                {daily.map((item, index) => (
                  <DayCard
                    key={index}
                    iconCode={item.iconCode}
                    timestamp={item.timestamp}
                    degree={item.maxTemp}
                  />
                ))}
              </section>
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
              <div className="col-span-3 row-span-1">
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
            </div>
          </>
        )
      })}
    </>
  )
}
