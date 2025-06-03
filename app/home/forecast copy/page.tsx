import { fetchLighthouses, fetchLighthousePages, fetchWeatherForecast } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import ErrorMessage from "@/app/ui/error";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/forecast/dailyHeader";
import DayCard from "@/app/ui/forecast/dayCard";
import Map from "@/app/ui/map";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import Image from 'next/image';

export default async function getServerSideProps(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
  })  {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    // console.log("currentpage....",currentPage);
    const query = searchParams?.query || '';
    const lighthouses = await fetchLighthouses(currentPage, query);
    // console.log("lighthouses....",lighthouses);
    const totalPages = await fetchLighthousePages(query);

    const error = false;
    const errorMessage = "Failed to load data. Please refresh the page.";
    
  return (
    <>{error && <ErrorMessage message={errorMessage} />}
    <h1 className="text-xl md:text-2xl font-bold text-center my-4">Weather Forecast</h1>
     <Search placeholder="Search Lighthouse..." />
      {lighthouses.map(async(lighthouse, index) => {
        const { current, daily, hourlyWeather } = await fetchWeatherForecast(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        const visibility = hourlyWeather.map((visible)=> visible.visibility);
        return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-8 grid-rows-[auto_auto_1fr_auto] md:grid-rows-2 gap-4 border-4 shadow-md p-4 md:p-6">
            <div className="col-span-1 md:col-span-6 row-span-1 text-lg md:text-3xl text-center tracking-narrow text-blue-600 dark:text-sky-400 md:p-20">
              {lighthouse.name}
            </div>
             <div className="col-span-1 md:col-span-2 row-span-1 flex items-center justify-center">
              <Image
                src={lighthouse.image_url}
                className="rounded-full"
                alt={lighthouse.name}
                width={250}
                height={130}
              />
            </div>
            <div className="col-span-1 md:col-span-8 row-span-1 flex flex-row overflow-x-auto md:grid md:grid-cols-[repeat(auto-fit,minmax(80px,1fr))] md:gap-2 md:items-center">
              {daily.map((item, index) => (
                <DayCard
                  key={index}
                  iconCode={item.iconCode}
                  timestamp={item.timestamp}
                  degree={item.maxTemp}
                />
              ))}
            </div>
            <div className="col-span-1 md:col-span-6">
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
                coast={lighthouse.coast}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
                <Map
                  key={index}
                  id={lighthouse.id}
                  name={lighthouse.name}
                  latitude={lighthouse.latitude}
                  longitude={lighthouse.longitude}
                  abovewater={lighthouse.abovewater}
                  towerheight={lighthouse.towerheight}
                  range_w={lighthouse.range_w}
                  range_r={lighthouse.range_r}
                  coast={lighthouse.coast}
                  constructed={formatDateToLocal(lighthouse.constructed)}
                  currentdate={lighthouse.currentdate}
                  age={lighthouse.age}
                  image_url={lighthouse.image_url}
                />
              </div>
          </div>
        </>
        )
      })}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <footer className="w-full bg-gray-800 text-white text-center p-4 mt-4 text-sm md:text-base">
        <Footer />
      </footer>
    </>
  )
}

