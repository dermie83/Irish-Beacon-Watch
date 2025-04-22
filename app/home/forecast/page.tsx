import { fetchLighthouses, fetchLighthousePages, fetchWeatherForecast } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import ErrorMessage from "@/app/ui/error";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/forecast/dailyHeader";
import DayCard from "@/app/ui/forecast/dayCard";
import Map from "@/app/ui/forecast/map";
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
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const lighthouses = await fetchLighthouses(currentPage, query);
    const totalPages = await fetchLighthousePages(query);

    const error = false;
    const errorMessage = "Failed to load data. Please refresh the page.";
    
  return (
    <>{error && <ErrorMessage message={errorMessage} />}
    <h1 className="text-xl md:text-2xl font-bold text-center my-4">Weather Forecast</h1>
     <Search placeholder="Search Lighthouse..." />
      {lighthouses.map(async(lighthouse, index) => {
        const { current, daily, hourly } = await fetchWeatherForecast(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        const visibility = hourly.map((visible)=> visible.visibility);
        return (
        <>
          <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-1 gap-2 md:flex md:items-center border-2 shadow-md">
            <section className="flex flex-col md:grid md:col-span-2 md:row-span-1 md:grid-cols-[repeat(auto-fit,100px)] gap-2 md:items-center">
              {daily.map((item, index) => (
                <DayCard
                  key={index}
                  iconCode={item.iconCode}
                  timestamp={item.timestamp}
                  degree={item.maxTemp}
                />
              ))}
            </section>
            <div className="text-2xl text-center tracking-narrow text-blue-600 dark:text-sky-400 my-4 md:my-0">
              <Image
                src={lighthouse.image_url}
                className="rounded-full"
                alt={lighthouse.name}
                width={250}
                height={150}
              />
            </div>
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
            <div className="col-span-2 row-span-1">
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

