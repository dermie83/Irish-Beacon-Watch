import { DayCardWeatherProps } from "@/app/lib/definitions";
import { getIcon } from "@/app/lib/IconCode";
import { formatTimestampToDay } from "@/app/lib/utils";


export default function DayCard({
  iconCode = 999,
  timestamp = 999,
  degree = 32,
  ...props
}: DayCardWeatherProps) {
  const Icon = getIcon(iconCode);
  const dayDate = formatTimestampToDay(timestamp);

  return (
    <div className={`flex flex-col items-center justify-center border border-foregroundColor rounded-md p-1 md:p-2 ${props.className}`}>
      <div><Icon className="w-10 h-10 md:w-16 md:h-16" /></div>
      <div className="text-xs md:text-base text-foregroundSecondaryColor mt-1">{dayDate}</div>
      <div className="text-sm md:text-xl">{degree}&deg;</div>
    </div>
  );
}