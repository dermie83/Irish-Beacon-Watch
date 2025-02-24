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
}: WeatherHeaderProps) {
  const Icon = getIcon(iconCode);
  const vizText = convertVisibilityToText(visibility);
  return (
    <header className="flex items-center my-4 mx-10">
      Weather Now....
      <div className="flex w-1/2 justify-center items-center m-0.5 p-0.5 border-r-2 border-foregroundColor">
        {Icon && <Icon className="w-20 h-20 object-contain" />}
        <div className="text-3xl ml-4">
          <span data-current-temp>{currentTemp}</span>&deg;
        </div>
      </div>
      <div className="grid w-1/2 gap-4 justify-around grid-cols-3 grid-rows-2">
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            High
          </div>
          <div>
            <span data-current-high>{highTemp}</span>&deg;
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Low
          </div>
          <div>
            <span data-current-low>{lowTemp}</span>&deg;
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Wind Speed
          </div>
          <div>
            <span data-current-wind>{windSpeed}</span>
            <span className="font-normal text-sm">km/h</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Wind Gust
          </div>
          <div>
            <span data-current-wind-gust>{windGust}</span>
            <span className="font-normal text-sm">km/h</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Precip
          </div>
          <div>
            <span data-current-precip>{precip}</span>
            <span className="font-normal text-sm">in</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
          visibility
          </div>
          <div>
            <span data-current-visibility>{vizText}</span>
            {/* <span className="font-normal text-sm">m</span> */}
          </div>
        </div>
      </div>
    </header>
  );
}