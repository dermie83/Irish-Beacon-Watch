export type WindMetricsPropr = {
  maxGust:number;
  maxWind:number;
};


export default function MetricsTable({
  maxGust=0,
  maxWind=0,
}: WindMetricsPropr) {

  return (
    <header className="flex flex-col md:flex-row items-center my-4 mx-4 md:mx-10">
      <div className="flex w-full md:w-1/2 justify-center items-center m-1 p-1 border-b md:border-r-2 border-foregroundColor">
        <div className="text-lg sm:text-xl md:text-2xl ml-2 md:ml-4">
          <p className="text-sm sm:text-base md:text-lg">Max Wind</p>
          <span data-maxwind>{maxWind}</span>
          <span className="font-normal text-xs sm:text-sm">km/h</span>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center m-1 p-1 border-b md:border-r-2 border-foregroundColor">
        <div className="text-lg sm:text-xl md:text-2xl ml-2 md:ml-4">
          <p className="text-sm sm:text-base md:text-lg">Max Gust</p>
          <span data-maxgust>{maxGust}</span>
          <span className="font-normal text-xs sm:text-sm">km/h</span>
        </div>
      </div>
    </header>
  );
}