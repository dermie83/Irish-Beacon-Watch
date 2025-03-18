'use client';

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
  ageData: {
    id: string;
    name: string;
    age:number;
  }[]
}


export default function AgeGraph({ageData} : LighthouseTowerProps) {
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={ageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="age" stroke="#1184d8" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 