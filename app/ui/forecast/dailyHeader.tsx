import { WeatherHeaderProps } from "@/app/lib/definitions";
import { getIcon } from "@/app/lib/IconCode";
import { convertVisibilityToText } from "@/app/lib/convertNumberToText";
  
export default function Header({
  currentTemp = 31,
  highTemp = 32,
  lowTemp = 9,
  windSpeed = 9,
  windGust =10,
  precip = 0.1,
  iconCode = 999,
  visibility= 1000,
  name="hook",
}: WeatherHeaderProps) {
  const Icon = getIcon(iconCode);
  const vizText = convertVisibilityToText(visibility);
  return (
    <header className="flex items-center my-4 mx-10">
      Weather Now at {name}
      <div className="flex flex-col md:flex-row w-full md:w-1/2 justify-center items-center m-1 p-1 border-b md:border-r-2 border-foregroundColor">
        {Icon && <Icon className="w-12 h-12 md:w-20 md:h-20 object-contain" />}
      <div className="text-2xl md:text-3xl ml-2 md:ml-4">
        <span data-current-temp>{currentTemp}</span>&deg;
      </div>
      </div>
      <div className="grid w-full md:w-1/2 gap-2 md:gap-4 justify-around grid-cols-2 grid-rows-3 text-center">
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">High</div>
          <div><span data-current-high>{highTemp}</span>&deg;</div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Low</div>
          <div><span data-current-low>{lowTemp}</span>&deg;</div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Wind Speed</div>
          <div><span data-current-wind>{windSpeed}</span> <span className="text-sm">km/h</span></div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Wind Gust</div>
          <div><span data-current-wind-gust>{windGust}</span> <span className="text-sm">km/h</span></div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Precip</div>
          <div><span data-current-precip>{precip}</span> <span className="text-sm">in</span></div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Visibility</div>
          <div><span data-current-visibility>{vizText}</span></div>
        </div>
      </div>
    </header>
  );
}