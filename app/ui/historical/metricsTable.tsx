export type WindMetricsPropr = {
  maxGust:number;
  maxWind:number;
};


export default function MetricsTable({
  maxGust=0,
  maxWind=0,
}: WindMetricsPropr) {

  return (
    <header className="flex items-center my-4 mx-10">
    <div className="flex w-1/2 justify-center items-center m-0.5 p-0.5 border-r-2 border-foregroundColor">
      <div className="text-2xl ml-4">
          <p> Max Wind </p>
        <span data-maxwind>{maxWind}</span>
        <span className="font-normal text-sm">km/h</span>
      </div>
    </div>
    <div className="flex w-1/2 justify-center items-center m-0.5 p-0.5 border-r-2 border-foregroundColor">
      <div className="text-2xl ml-4">
          <p> Max Gust </p>
        <span data-maxgust>{maxGust}</span>
        <span className="font-normal text-sm">km/h</span>
      </div>
    </div>
  </header>
  );
}