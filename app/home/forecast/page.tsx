import { fetchLighthouses, fetchLighthousePages, fetchWeatherForecast } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import Header from "@/app/ui/forecast/dailyHeader";
import DayCard from "@/app/ui/forecast/dayCard";
import Map from "@/app/ui/forecast/map";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Image from 'next/image';

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
  })  {
    const searchParams = await props.searchParams;
    // console.log("searchparams...",searchParams)
    const query = searchParams?.query || '';
    console.log("query...",query)
    const currentPage = Number(searchParams?.page) || 1;
    // console.log("currentPage...",currentPage)
    const lighthouses = await fetchLighthouses(currentPage, query);
    const totalPages = await fetchLighthousePages(query);
    // console.log("totalpages....",totalPages)
    // console.log("fetch....",lighthouses)
  return (
    <>
      {lighthouses.map(async(lighthouse) => {
        const { current, daily, hourly } = await fetchWeatherForecast(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        // console.log("hourly....",hourly.visibility);
        const visibility = hourly.map((visible)=> visible.visibility);
        // console.log("visibility....",visibility.slice(0)[0]);
        // console.log("visibility....",visibility);
        
        // console.log(lighthouse.name)

        return (
          <>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 flex items-center border-2 shadow-md">
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
              <div className="col-span-1 row-span-1 text-2xl text-center tracking-wide text-blue-600 dark:text-sky-400">
              <Image
                    src={lighthouse.image_url}
                    className="sqaure-full"
                    alt={lighthouse.name}
                    width={250}
                    height={150}
                    />
              </div>
              <Map
                  id={lighthouse.id}
                  name={lighthouse.name} 
                  latitude={lighthouse.latitude} 
                  longitude={lighthouse.longitude} 
                  aboveWater={lighthouse.aboveWater}
                  towerHeight={lighthouse.towerHeight}
                  range={lighthouse.range}
                  greatLighthouse={lighthouse.greatLighthouse}
                  constructed={formatDateToLocal(lighthouse.constructed)}
                  currentDate= {lighthouse.currentDate}
                  age={lighthouse.age}
                  image_url={lighthouse.image_url}
              />
              <div className="col-span-3 row-span-1">
                <Header
                    currentTemp={current?.currentTemp}
                    highTemp={current?.highTemp}
                    lowTemp={current?.lowTemp}
                    highFeelsLike={current?.highFeelsLike}
                    lowFeelsLike={current?.lowFeelsLike}
                    windSpeed={current?.windSpeed}
                    windGust={current?.windGust}
                    precip={current?.precip}
                    iconCode={current?.iconCode}
                    visibility={visibility?.slice(-1)[0]}
                    name={lighthouse.name}
                  />
              </div>
            </div>
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

