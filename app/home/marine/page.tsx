import { fetchLighthousePages, fetchLighthouses, fetchMarineForecast} from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import LineGraph from "@/app/ui/marine";
import Search from "@/app/ui/search";
import Header from "@/app/ui/marine/dailyHearder";
import Footer from "@/app/ui/footer";
import ErrorMessage from "@/app/ui/error";

export default async function getServerSideProps(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
  })  {

    if (typeof window == "undefined") {
      console.log("Application is on server side");
    } else {
      alert("Application is on client side");}
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    const lighthouses = await fetchLighthouses(currentPage, query);
    const totalPages = await fetchLighthousePages(query);

    const error = false;
    const errorMessage = "Failed to load data. Please refresh the page.";


  return (
    <>{error && <ErrorMessage message={errorMessage} />}
    <h1 className="text-xl md:text-2xl font-bold text-center my-4">Current Marine Forecast</h1>
    <Search placeholder="Search Lighthouse..."/>
    <div className="space-y-4">
      {lighthouses.map(async (lighthouse) => {
        const { current, hourly } = await fetchMarineForecast(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin');

        return (
          <div key={lighthouse.name} className="grid grid-cols-1 md:grid-cols-8 grid-rows-2 gap-1 border-2 shadow-md p-4 md:p-6 items-center">
            <div className="col-span-1 row-span-1 text-lg md:text-2xl text-center tracking-wide text-blue-600 dark:text-sky-400">
              {lighthouse.name}
            </div>
            <div className="col-span-7 row-span-1">
              <Header
                waveHeight={current?.waveHeight}
                wind_wave_height={current?.wind_wave_height}
                swell_wave_height={current?.swell_wave_height}
                wave_direction={current?.wave_direction}
                wave_period={current?.wave_period}
                ocean_current_velocity={current?.ocean_current_velocity}
                ocean_current_direction={current?.ocean_current_direction}
              />
            </div>
            <div className="col-span-1 md:col-span-8 row-span-1">
              <LineGraph hourly={hourly} />
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
    <footer className="w-full bg-gray-800 text-white text-center p-4 mt-4 text-sm md:text-base">
      <Footer />
    </footer>
  </>
  )
}