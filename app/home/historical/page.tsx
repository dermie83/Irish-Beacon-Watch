import { fetchLighthouses, fetchLighthousePages, fetchHistoricalWeather} from "@/app/lib/data";
import LineGraph from "@/app/ui/historical";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import MetricsTable from "@/app/ui/historical/metricsTable";
import YearRangeButtons from "@/app/ui/historical/button/index";
import Map from "@/app/ui/map";
import Footer from "@/app/ui/footer";
import ErrorMessage from "@/app/ui/error";
import { reformatDate } from "@/app/lib/utils";

const currentdate = new Date().toISOString();
const formattedCurrentDate = reformatDate(currentdate);
console.log("formattedDate...",formattedCurrentDate);

export default async function getServerSideProps(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
    startDate?: string;
    endDate?: string;
  }>;
  }) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    const startDate = searchParams?.startDate || '2025-01-01';
    const endDate = searchParams?.endDate || formattedCurrentDate;
    console.log("query...",query)
    const lighthouses = await fetchLighthouses(currentPage, query);
    const totalPages = await fetchLighthousePages(query);

    const error = false;
    const errorMessage = "Failed to load data. Please refresh the page.";
    
   
  return (
    <>{error && <ErrorMessage message={errorMessage} />}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center my-4">
        Historical Weather
      </h1>
      <div className="p-2 sm:p-4">
        <YearRangeButtons />
      </div>
      <div className="col-span-1 row-span-1 text-sm sm:text-lg md:text-2xl text-center tracking-wide text-blue-600 dark:text-sky-400">
        Start Date: {startDate}
      </div>
      <div className="col-span-1 row-span-1 text-sm sm:text-lg md:text-2xl text-center tracking-wide text-blue-600 dark:text-sky-400">
        End Date: {endDate}
      </div>
      <Search placeholder="Search For Lighthouse..." />
      {lighthouses.map(async(lighthouse, index) => {
        const { daily } = await fetchHistoricalWeather(
          lighthouse.latitude, 
          lighthouse.longitude,
          startDate,
          endDate
        );
        const maxWind = daily.map(item => item.wind);
        const maxWindValue = Math.max(...maxWind);
        const maxGust = daily.map(item => item.gust);
        const maxGustValue = Math.max(...maxGust);
        return (
          <>
            <div key={lighthouse.name} className="grid grid-cols-1 md:grid-cols-8 grid-rows-4 md:grid-rows-2 gap-4 border-2 shadow-md p-4 md:p-6">
              <div className="col-span-1 md:col-span-8 row-span-1 text-lg md:text-3xl text-center tracking-narrow text-blue-600 dark:text-sky-400">
                {lighthouse.name}
              </div>
              <div className="col-span-1 md:col-span-8 row-span-1">
                <MetricsTable 
                  maxGust={maxGustValue} 
                  maxWind={maxWindValue}
                />
              </div>
              <div className="col-span-1 md:col-span-6 row-span-1">
                <LineGraph daily = {daily}/>
              </div>
              <div className="col-span-1 md:col-span-2 row-span-1">
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
