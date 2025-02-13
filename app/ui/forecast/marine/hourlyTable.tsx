import { HourlyMarineProp } from "@/app/lib/definitions";
import { formatTimestampToDay, formatTimestampToNumericHour } from "@/app/lib/utils";

export default function TableRow({
  timestamp = 999,
  waveHeight=0.99,
}: HourlyMarineProp) {

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
          <div className="uppercase font-bold text-xs text-foregroundSecondaryColor">waveHeight</div>
          <div>{waveHeight}&deg;</div>
        </div>
      </td>
      {/* <td>
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
      </td> */}
    </tr>
  );
}