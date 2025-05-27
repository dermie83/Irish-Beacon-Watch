import { fetchLighthouses, fetchLighthousePages } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import ErrorMessage from "@/app/ui/error";
import Footer from "@/app/ui/footer";
import LighthouseImageButtons from "@/app/ui/image";
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
        return (
        <>
          <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-1 gap-2 md:flex md:items-center border-4 shadow-md">
            <div className="text-2xl text-center tracking-narrow text-blue-600 dark:text-sky-400 my-4 md:my-0">
              <LighthouseImageButtons id={lighthouse.id} name={lighthouse.name} latitude={0} longitude={0} abovewater={0} towerheight={0} range_w={0} range_r={0} coast={""} constructed={""} currentdate={""} age={0} image_url={lighthouse.image_url}/>
              {/* <Image
                src={lighthouse.image_url}
                className="rounded-full"
                alt={lighthouse.name}
                width={250}
                height={150}
              /> */}
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

