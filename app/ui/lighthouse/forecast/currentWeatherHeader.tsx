import { WeatherHeaderProps } from "@/app/lib/definitions";
import { getIcon } from "@/app/lib/IconCode";
import { convertVisibilityToText } from "@/app/lib/convertNumberToText";
  
export default function CurrentWeatherHeader({
  currentTemp = 0,
  highTemp = 0,
  lowTemp = 0,
  windSpeed = 0,
  windGust = 0,
  precip = 0,
  iconCode = 0,
  visibility = 0,
  name = "None",
  coast = "None"
}: WeatherHeaderProps) {
  const Icon = getIcon(iconCode);
  const vizText = convertVisibilityToText(visibility);
  return (
    <header className="flex flex-col md:flex-row items-center my-4 mx-4 md:mx-10 text-sm md:text-base">
      {/* Left side — Current Temp */}
      <div className="flex w-full md:w-1/2 justify-center items-center m-0.5 p-0.5 border-r-0 md:border-r-2 border-foregroundColor">
        <div className="flex items-center">
          {Icon && <Icon className="w-10 h-10 md:w-16 md:h-16 object-contain mr-3" />}
          <div className="text-center text-lg md:text-2xl ml-0 md:ml-4 flex flex-col items-center justify-center">
            <p className="font-semibold">Current Temp</p>
            <div>
              <span className="font-normal text-lg md:text-2xl">{currentTemp}&deg;C</span>
            </div>
          </div>
        </div>
      </div>
      {/* Right side — Weather metrics grid */}
      <div className="grid w-full md:w-full gap-2 md:gap-4 justify-around grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2">
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">High</div>
          <div>
            <span className="font-normal text-xs md:text-sm">{highTemp}&deg;C</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Low</div>
          <div>
            <span className="font-normal text-xs md:text-sm">{lowTemp}&deg;C</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Wind Speed</div>
          <div>
            <span className="font-normal text-xs md:text-sm">{windSpeed} km/h</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Wind Gust</div>
          <div>
            <span className="font-normal text-xs md:text-sm">{windGust} km/h</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Precip</div>
          <div>
            <span className="font-normal text-xs md:text-sm">{precip} in</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Visibility</div>
          <div>
            <span className="font-normal text-xs md:text-sm">{vizText}</span>
          </div>
        </div>
      </div>
    </header>
  );
}