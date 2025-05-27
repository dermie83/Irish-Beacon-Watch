import { fetchLighthouses, fetchLighthousePages } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import ErrorMessage from "@/app/ui/error";
import Footer from "@/app/ui/footer";
import LighthouseImageButtons from "@/app/ui/lighthouse";
import Header from "@/app/ui/lighthouse/header";
import Map from "@/app/ui/map";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";

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
    <h1 className="text-xl md:text-2xl font-bold text-center my-4">Aids To Navigation</h1>
     <Search placeholder="Search Lighthouse..." />
      {lighthouses.map(async(lighthouse, index) => {
        return (
        <>
          <div key={lighthouse.name} className="grid grid-cols-1 md:grid-cols-8 grid-rows-3 md:grid-rows-1 gap-2 border-2 shadow-md p-4 md:p-4">
              <div className="col-span-1 md:col-span-2 row-span-1">
                <LighthouseImageButtons 
                  id={lighthouse.id} 
                  name={lighthouse.name} 
                  latitude={0} 
                  longitude={0} 
                  abovewater={0} 
                  towerheight={0} 
                  range_w={0} 
                  range_r={0} 
                  coast={""} 
                  constructed={""} 
                  currentdate={""} 
                  age={0} 
                  image_url={lighthouse.image_url}
                />
              </div>
              <div className="col-span-1 md:col-span-4 row-span-1 text-center my-5 md:p-2">
                <Header
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
              <div className="col-span-1 md:col-span-2 row-span-1">
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

