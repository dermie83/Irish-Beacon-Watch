'use client';

import { lighthouses } from  "@/app/lib/placeholder-data";
import { dynamicSort } from "@/app/lib/utils";

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


// type LighthouseCharacterProps = {
//   characters: {
//     id: string;
//     name: string;
//     latitude: number;
//     longitude: number;
//     aboveWater:number;
//     towerHeight:number;
//     range:number;
//     age:number;
//   }[]
// }


export default function RangeGraph() {

  const rangeData = [...lighthouses]
  const sortedRangeData = rangeData.sort((a,b) => a.range - b.range);
  // const Lighthouse = lighthouses.sort(dynamicSort("range"));
  console.log("range...", sortedRangeData.map(item => item.range));
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={sortedRangeData}
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
 