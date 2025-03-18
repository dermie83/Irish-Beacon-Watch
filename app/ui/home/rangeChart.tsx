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


type LighthouseRangeProps = {
  rangeData: {
    id: string;
    name: string;
    range:number;
  }[]
}

<<<<<<< HEAD

=======
>>>>>>> 4514a1ce054d4476f644468e306c31739051e026
export default function RangeGraph({rangeData} : LighthouseRangeProps) {
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
                  <Bar dataKey="range" stroke="#3384d8" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 