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

export default function AboveWaterGraph() {
  const aboveData = [...lighthouses]

  const sortedData = aboveData.sort((a,b) => a.aboveWater - b.aboveWater);
  // console.log("above...", sortedData);
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={sortedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="aboveWater" stroke="#8884d8"/>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 