import { TableRowWeatherProps } from "@/app/lib/definitions";
import { getIcon } from "@/app/lib/IconCode";
import { formatTimestampToDay, formatTimestampToNumericHour } from "@/app/lib/utils";

export default function TableRow({
  timestamp = 999,
  iconCode = 999,
  maxTemp = 31,
  feelsLike = 30,
  windSpeed = 19,
  precip = 0.1,
}: TableRowWeatherProps) {

  const Icon = getIcon(iconCode);
  const dayDate = formatTimestampToDay(timestamp);
  const hourDate = formatTimestampToNumericHour(timestamp);

  return (
    <tr className="[&>td]:p-2 [&>td>*]:gap-1 even:bg-sky-300/60 odd:bg-sky-300/30 ">
      {/* [&>*:nth-child(even)]:bg-borwn-50 */}
      <td>
        <div className="flex flex-col items-center ">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">{dayDate}</div>
          <div className="uppercase">{hourDate}</div>
        </div>
      </td>
      <td>
        {/* <FaSun className="w-12 h-12 object-contain" /> */}
        <Icon className="w-12 h-12 object-contain" />
      </td>
      <td>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">TEMP</div>
          <div>{maxTemp}&deg;</div>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">FL TEMP</div>
          <div>{feelsLike}&deg;</div>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">WIND</div>
          <div>
            {windSpeed}<span className="font-normal text-sm">mph</span>
          </div>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center">
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">PRECIP</div>
          <div>
            {precip}<span className="font-normal text-sm">in</span>
          </div>
        </div>
      </td>
    </tr>
  );
}