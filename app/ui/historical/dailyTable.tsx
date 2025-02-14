import { DailyHistoricaltWeatherProp} from "@/app/lib/definitions";
import { formatTimestampToDay, formatTimestampToNumericHour } from "@/app/lib/utils";

export default function TableRow({
  timestamp = "",
  maxGust = 31,
  maxWind = 19,
}: DailyHistoricaltWeatherProp) {

  
  // const dayDate = formatTimestampToDay(timestamp);
  // const hourDate = formatTimestampToNumericHour(timestamp);

  return (
    <tr className="[&>td]:p-2 [&>td>*]:gap-1 even:bg-sky-300/60 odd:bg-sky-300/30 ">
      {/* [&>*:nth-child(even)]:bg-borwn-50 */}
      <td>
        <div className="flex flex-col items-center ">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">{timestamp}</div>
          <div className="uppercase">{timestamp}</div>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">TEMP</div>
          <div>{maxWind}&deg;</div>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">FL TEMP</div>
          <div>{maxGust}&deg;</div>
        </div>
      </td>
    </tr>
  );
}