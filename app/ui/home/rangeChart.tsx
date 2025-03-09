'use client';

// import { lighthouses } from  "@/app/lib/placeholder-data";

import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    Legend,
    ResponsiveContainer,
  } from "recharts";


type LighthouseRangeProps = {
  rangeData: {
    id: string;
    name: string;
    range:number;
  }[]
}


export default function RangeGraph({rangeData} : LighthouseRangeProps) {
  // const sortedRangeData = data.sort((a,b) => a.range - b.range);
  // console.log("range...", sortedRangeData.map(item => item.range));
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={rangeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="range" stroke="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 