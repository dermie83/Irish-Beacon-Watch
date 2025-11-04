import { fetchWeatherForecast, fetchMarineForecast, fetchLighthouses, fetchLighthousePages } from "@/app/lib/data";
import ErrorMessage from "@/app/ui/error";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/forecast/dailyHeader";
import MarineHeader from "@/app/ui/marine/dailyHearder";
import DayCard from "@/app/ui/forecast/dayCard";
import Map from "@/app/ui/map";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import LineGraph from "@/app/ui/marine";
import LighthouseArticles1 from "@/app/ui/forecast/lighthouseArticles";


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
    <h1 className="text-xl md:text-2xl font-bold text-center my-4">Weather and Marine Forecast</h1>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
     {<Search placeholder="Search For Lighthouse..." />}
      {lighthouses.map(async(lighthouse, index) => {
        const { current, daily, hourlyWeather } = await fetchWeatherForecast(lighthouse.latitude, lighthouse.longitude);
        const { currentMarine, hourly } = await fetchMarineForecast(lighthouse.latitude, lighthouse.longitude);
        const visibility = hourlyWeather.map((visible)=> visible.visibility);
        return (
        <>
          <div key={lighthouse.name} className="grid grid-cols-1 md:grid-cols-8 grid-rows-3 md:grid-rows-2 gap-4 border-2 shadow-md p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold text-center my-4">Weather</h1>
            <div className="col-span-1 md:col-span-7 row-span-1 text-2g md:text-3xl text-center tracking-narrow text-blue-600 dark:text-sky-400 md:p-100">
              {lighthouse.name}
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
                  lighthouse={{
                    id: lighthouse.id,
                    name: lighthouse.name,
                    latitude: lighthouse.latitude,
                    longitude: lighthouse.longitude,
                  }}
                />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-8 grid-rows-3 md:grid-rows-2 gap-4 border-2 shadow-md p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold text-center my-4">Marine</h1>
            <div className="col-span-1 md:col-span-7 row-span-1">
              <MarineHeader
                key = {index}
                waveHeight={currentMarine?.waveHeight}
                wind_wave_height={currentMarine?.wind_wave_height}
                swell_wave_height={currentMarine?.swell_wave_height}
                wave_direction={currentMarine?.wave_direction}
                wave_period={currentMarine?.wave_period}
                ocean_current_velocity={currentMarine?.ocean_current_velocity}
                ocean_current_direction={currentMarine?.ocean_current_direction}
              />
            </div>
            <div className="col-span-1 md:col-span-8 row-span-1">
              <LineGraph hourly={hourly} />
            </div>
          </div>
          <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-left text-gray-900 leading-snug px-2">
            Google Search Results for Articles Related to{" "}
            <span className="text-teal-600 font-bold">{lighthouse.name}</span>{" "}
            Lighthouse
            <span className="block mt-1 text-sm sm:text-base font-normal text-gray-500">
              — The results may include unrelated articles
            </span>
          </h1>
            <LighthouseArticles1 lighthouseName= {lighthouse.name}/>
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

