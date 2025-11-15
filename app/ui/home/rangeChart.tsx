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
    name: string;
    range_w:number;
    range_r:number;
  }[]
}

export default function RangeGraph({rangeData} : LighthouseRangeProps) {
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={rangeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name"/>
                  <YAxis label={{ value: 'Nm', angle: -90, position: 'upper left', offset: 100 }}/>
                  <Tooltip formatter={(value) => [`${value} Nm`]}/>
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="range_w" fill="#8884d8" name="White Light" />
                  <Bar dataKey="range_r" fill="#8B0000" name="Red Light" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 