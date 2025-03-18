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

type LighthouseABWProps = {
  abwData: {
    id: string;
    name: string;
    abovewater: number;
  }[]
}

export default function AboveWaterGraph({abwData} : LighthouseABWProps) {
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={abwData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="abovewater" stroke="#2284d8"/>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 