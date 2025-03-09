import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    Legend,
    ResponsiveContainer,
  } from "recharts";


type hourlyMarinetForecastProps = {
  hourly: {
    timestamp:string
    waveHeight: number;
  }[]
}

export default function LineGraph({hourly} : hourlyMarinetForecastProps) {
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={300}>
              <LineChart data={hourly}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line activeDot={{ r: 8 }} type="monotone" dataKey="waveHeight" stroke="#8884d8" />
                  {/* <Line dot={false} type="monotone" dataKey="maxWind" stroke="#82ca9d" /> */}
              </LineChart>
            </ResponsiveContainer>
          </>
           
        )}
 