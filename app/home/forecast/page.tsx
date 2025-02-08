import { fetchLighthouses, getWeather } from "@/app/lib/data";
import Header from "@/app/ui/forecast/dailyTable";
import DayCard from "@/app/ui/forecast/dayCard";

export default async function Page() {
  const lighthouses = await fetchLighthouses();
  return (
    <>
      <h1>Current Weather</h1>
      {lighthouses.map(async(lighthouse) => {
        const { current, daily, hourly } = await getWeather(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        console.log("Current....",current);

        return (
          <>
            <h1>{ lighthouse.name }</h1>
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
