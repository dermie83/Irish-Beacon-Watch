import { DayCardWeatherProps } from "@/app/lib/definitions";
import { getIcon } from "@/app/lib/IconCode";
import { reformatDate, formatDateToLocal, formatTimestampToDay, formatTimestampToDate } from "@/app/lib/utils";


export default function DayCard({
  iconCode = 0,
  timestamp = 0,
  degree = 0,
  ...props
}: DayCardWeatherProps) {
  const Icon = getIcon(iconCode);
  const dayDate = formatTimestampToDay(timestamp);
  const formattedDate = formatTimestampToDate(timestamp);
  return (
    <div className={`flex flex-col items-center justify-center border border-foregroundColor rounded-md p-1 md:p-2 ${props.className}`}>
      <div><Icon className="w-10 h-10 md:w-16 md:h-16" /></div>
      <div className="text-xs md:text-base text-foregroundSecondaryColor mt-1">{formattedDate}</div>
      <div className="text-xs md:text-base text-foregroundSecondaryColor mt-1">{dayDate}</div>
      <div className="text-sm md:text-xl">{degree}&deg;</div>
    </div>
  );
}