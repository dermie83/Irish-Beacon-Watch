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


type LighthouseCharacterType = {
  characters: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    towerHeight:number;
    lightHeight:number;
    range:number;
    age:number;
  }[]
}

export default function BarGraph({characters} : LighthouseCharacterType) {
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={characters}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="range" stroke="#8884d8" />
                  <Bar dataKey="towerheight" stroke="#8884d7" />
                  <Bar dataKey="lightheight" stroke="#8884d6" />
                  <Bar dataKey="age" stroke="#8884d5" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 