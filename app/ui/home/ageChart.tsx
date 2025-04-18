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
                  <YAxis label={{ value: 'Yrs', angle: -90, position: 'upper left', offset: 1000 }}/>
                  <Tooltip formatter={(value, name) => [`${value} yrs`, name === 'age' ? 'Age':'Age']}/>
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="age" fill="#2399b8" name="Age" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 