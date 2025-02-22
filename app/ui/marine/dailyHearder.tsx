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
  
  return (
    <header className="flex items-center my-4 mx-10">
      <div className="flex w-1/2 justify-center items-center m-0.5 p-0.5 border-r-2 border-foregroundColor">
        <div className="text-2xl ml-4">
            <p> Current Height </p>
          <span data-current-waveheight>{waveHeight}</span>
          <span className="font-normal text-sm"> meters</span>
        </div>
      </div>
      <div className="grid w-1/2 gap-4 justify-around grid-cols-3 grid-rows-2">
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Wind Wave Height
          </div>
          <div>
            <span data-current-wind-wave>{wind_wave_height}</span>
            <span className="font-normal text-sm"> meters</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Swell Height
          </div>
          <div>
            <span data-current-swell-wave>{swell_wave_height}</span>
            <span className="font-normal text-sm"> meters</span>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Direction
          </div>
          <div>
            <span data-current-wave-direction>{wave_direction}</span>&deg;
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Periods
          </div>
          <div>
            <span data-current-low>{wave_period}</span>&deg;
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Current Velocity
          </div>
          <div>
            <span data-current-current-velocity>{ocean_current_velocity}</span>
            <span className="font-normal text-sm"> m/sec</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">
            Ocean Direction
          </div>
          <div>
            <span data-current-ocean-direction>{ocean_current_direction}</span>&deg;
          </div>
        </div>
      </div>
    </header>
  );
}