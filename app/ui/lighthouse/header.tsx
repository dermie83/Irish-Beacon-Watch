import { LighthouseType } from "@/app/lib/definitions";

export default function Header({
  abovewater = 0,
  towerheight = 0,
  range_w = 0,
  range_r = 0,
  constructed = "None",
  age = 0
}: LighthouseType) {
  return (
    <header className="flex flex-col md:flex-row items-center my-4 mx-2 md:mx-10">
      <div className="grid w-full md:w-full gap-2 md:gap-2 justify-around grid-cols-3 grid-rows-1 text-center">
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Tower Height</div>
          <div><span>{towerheight}</span> Meters</div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Red Light Range</div>
          <div><span>{range_r}</span> <span className="text-sm"> Nautical Miles</span></div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Constructed</div>
          <div><span>{constructed}</span> <span className="text-sm"></span></div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Above Water</div>
          <div><span>{abovewater}</span> Meters</div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">White Light Range</div>
          <div><span>{range_w}</span> <span className="text-sm"> Nautical Miles</span></div>
        </div>
        <div>
          <div className="uppercase font-bold text-xs md:text-sm text-foregroundSecondaryColor">Age</div>
          <div><span>{age}</span> Years</div>
        </div>
      </div>
    </header>
  );
}