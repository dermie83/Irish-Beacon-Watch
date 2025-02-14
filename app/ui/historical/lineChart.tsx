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


type DailyHistoricaltWeatherType = {
  daily: {
    timestamp:string
    maxWind:number
    maxGust:number
  }[]
}

export default function LineGraph({daily} : DailyHistoricaltWeatherType) {
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={300}>
              <LineChart data={daily}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dot={false} type="monotone" dataKey="maxGust" stroke="#8884d8" />
                  <Line dot={false} type="monotone" dataKey="maxWind" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </>
           
        )}
 