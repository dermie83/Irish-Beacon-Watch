import { DailyHistoricaltWeatherType } from "@/app/lib/definitions";
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    Legend,
  } from "recharts";

 export default function LineGraph(daily:DailyHistoricaltWeatherType[]) {
         return (
           <>
             <LineChart width={730} height={250} data={daily}
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="name" />
                 <YAxis />
                 <Tooltip />
                 <Legend />
                 <Line type="monotone" dataKey="maxGust" stroke="#8884d8" />
                 <Line type="monotone" dataKey="maxWind" stroke="#82ca9d" />
               </LineChart>
           </>
           
           )}
 