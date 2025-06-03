import { convertWindDirectionToText } from "@/app/lib/convertNumberToText";
import { MarineHeaderProps } from "@/app/lib/definitions";
  
export default function Header({
  waveHeight = 2,
  wind_wave_height=2,
  swell_wave_height=2,
  wave_direction=2,
  wave_period=2,
  ocean_current_velocity=2,
  ocean_current_direction=2,
}: MarineHeaderProps) {

  const waveDirection = convertWindDirectionToText(wave_direction);
  const oceanDirection = convertWindDirectionToText(ocean_current_direction);
  
  return (
    <header className="flex flex-col md:flex-row items-center my-4 mx-4 md:mx-10 text-sm md:text-base">
      <div className="flex w-full md:w-1/2 justify-center items-center m-0.5 p-0.5 border-r-0 md:border-r-2 border-foregroundColor">
        <div className="text-lg md:text-2xl ml-4">
          <p> Current Height </p>
          <span>{waveHeight}</span>
          <span className="font-normal text-xs md:text-sm"> m</span>
        </div>
      </div>
      <div className="grid w-full md:w-full gap-2 md:gap-4 justify-around grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2">
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">
            Wind Wave Height
          </div>
          <div>
            <span>{wind_wave_height}</span>
            <span className="font-normal text-xs md:text-sm"> m</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">
            Swell Height
          </div>
          <div>
            <span>{swell_wave_height}</span>
            <span className="font-normal text-xs md:text-sm"> m</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">
            Direction
          </div>
          <div>
            <span>{waveDirection}</span>&deg;
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">
            Periods
          </div>
          <div>
            <span>{wave_period}</span>
            <span className="font-normal text-xs md:text-sm"> sec</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">
            Current Velocity
          </div>
          <div>
            <span>{ocean_current_velocity}</span>
            <span className="font-normal text-xs md:text-sm"> m/sec</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">
            Ocean Direction
          </div>
          <div>
            <span>{oceanDirection}</span>&deg;
          </div>
        </div>
      </div>
    </header>
  );
}