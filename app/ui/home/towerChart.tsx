'use client';

import { lighthouses } from  "@/app/lib/placeholder-data";

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


type LighthouseTowerProps = {
  towerData: {
    id: string;
    name: string;
    towerHeight:number;
  }[]
}


export default function TowerGraph({towerData} : LighthouseTowerProps) {
  // const towerData_ = [...towerData]
  // const sortedData = towerData.sort((a,b) => a.towerHeight - b.towerHeight);
  // console.log("tower sorted...", towerData);
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={towerData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="towerheight" stroke="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 