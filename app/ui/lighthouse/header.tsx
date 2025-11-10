import { LighthouseType } from "@/app/lib/definitions";

interface HeaderProps {
  lighthouses: Pick<LighthouseType, "id" | "abovewater" | "towerheight" | "range_w" | "range_r">;
}

export default function Header({lighthouses}: HeaderProps) {
  return (
    <div className="w-full max-w-md mx-auto my-4 grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Tower Height */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center md:items-start text-center md:text-left shadow-sm">
        <span className="uppercase font-bold text-xs md:text-sm text-gray-600">Tower Height</span>
        <span className="mt-1 text-sm md:text-base">{lighthouses.towerheight} Meters</span>
      </div>

      {/* Red Light Range */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center md:items-start text-center md:text-left shadow-sm">
        <span className="uppercase font-bold text-xs md:text-sm text-gray-600">Red Light Range</span>
        <span className="mt-1 text-sm md:text-base">{lighthouses.range_r} Nautical Miles</span>
      </div>

      {/* Above Water */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center md:items-start text-center md:text-left shadow-sm">
        <span className="uppercase font-bold text-xs md:text-sm text-gray-600">Above Water</span>
        <span className="mt-1 text-sm md:text-base">{lighthouses.abovewater} Meters</span>
      </div>

      {/* White Light Range */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col items-center md:items-start text-center md:text-left shadow-sm">
        <span className="uppercase font-bold text-xs md:text-sm text-gray-600">White Light Range</span>
        <span className="mt-1 text-sm md:text-base">{lighthouses.range_w} Nautical Miles</span>
      </div>
    </div>
  );
}