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
                  <YAxis label={{ value: 'Meters', angle: -90, position: 'upper left', offset: 1000 }} />
                  <Tooltip formatter={(value, name) => [`${value} m`, name === 'abovewater' ? 'ABW':'ABW']}/>
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="abovewater" fill="#0099FF" name="Above Water"/>
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 