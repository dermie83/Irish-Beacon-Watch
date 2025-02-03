import { getWeather } from "@/app/lib/data";
import { formatTimestampToNumericHour } from "@/app/lib/utils";
import Header from "@/app/ui/forecast/dailyTable";
import DayCard from "@/app/ui/forecast/dayCard";
import { CalendarIcon } from "@heroicons/react/24/outline";
// import TableRow from "@/app/ui/forecast/hourly-table";

const lighthouses = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Hook',
    latitude: 52.1237453,
    longitude: -6.9293683,
    posix: [52.1237453,-6.9293683]

  },
  {
    id: '410544b8-4001-4271-9855-fec4b6a6442a',
    name: 'Muglins',
    latitude: 53.2755975,
    longitude: -6.0758683,
    posix: [53.2755975,-6.0758683]
  },
];
const chartHeight = 200;
// const { yAxisLabels, topLabel } = generateYAxis(revenue);



export default async function Page() {

  const {current,daily,hourly} = await getWeather(lighthouses[0].latitude, lighthouses[0].longitude, 'Europe/Berlin' );
  const feelsLikeTemps = hourly.map((item) => item.feelsLike);

  const hourDate = hourly.map((item) => item.timestamp);

  return (
    <>
            <Header
              currentTemp={current?.currentTemp}
              highTemp={current?.highTemp}
              lowTemp={current?.lowTemp}
              highFeelsLike={current?.highFeelsLike}
              lowFeelsLike={current?.lowFeelsLike}
              windSpeed={current?.windSpeed}
              precip={current?.precip}
              iconCode={current?.iconCode}
            />
      <section className="grid grid-cols-[repeat(auto-fit,100px)] gap-2 justify-center p-4">
            {daily.map((item, index) => (
              <DayCard
                key={index}
                iconCode={item.iconCode}
                timestamp={item.timestamp}
                degree={item.maxTemp}
              />
          ))}
      </section>
        {/* <table className="w-full text-center border-spacing-0">
          <tbody>
            {hourly.map((item, index) => (
              <TableRow
                key={index}
                maxTemp={item.maxTemp}
                feelsLike={item.feelsLike}
                precip={item.precip}
                timestamp={item.timestamp}
                windSpeed={item.windSpeed}
                iconCode={item.iconCode}
              />
            ))}
          </tbody>
      </table> */}
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {hourDate.map((label, i) => (
              <p key={i}>{label}</p>
            ))}
          </div>

          {/* {hourDate.map((time) => (
            <div key={time} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight)}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {time}
              </p>
            </div>
          ))} */}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>

    </>
)
  }
