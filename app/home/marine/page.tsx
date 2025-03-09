import { fetchLighthousePages, fetchLighthouses, fetchMarineForecast} from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import LineGraph from "@/app/ui/marine";
import Search from "@/app/ui/search";
import Header from "@/app/ui/marine/dailyHearder";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
  })  {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    const lighthouses = await fetchLighthouses(currentPage, query);
    const totalPages = await fetchLighthousePages(query);
  return (
    <>
     <h1>Current Marine Forecast</h1>
      <Search placeholder="Search Lighthouse..." />
      {lighthouses.map(async(lighthouse) => {
      const { current, hourly } = await fetchMarineForecast(lighthouse.latitude, lighthouse.longitude, 'Europe/Dublin' );
        

        return (
          <>
            <div className="grid grid-cols-8 grid-rows-2 gap-1 flex items-center border-2 shadow-md">
              <div className="col-span-1 row-span-1 text-2xl text-center tracking-wide text-blue-600 dark:text-sky-400">{ lighthouse.name }
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
              <div className="col-span-8 row-span-1">
                <LineGraph hourly = {hourly}/>
              </div>
            </div>
          </>
        )
      })}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}