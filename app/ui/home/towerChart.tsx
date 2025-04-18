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
  towerData: {
    id: string;
    name: string;
    towerheight:number;
  }[]
}

export default function TowerGraph({towerData} : LighthouseTowerProps) {
        return (
          <>
            <ResponsiveContainer width="100%" minHeight={180}>
              <BarChart data={towerData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Meters', angle: -90, position: 'upper left', offset: 1000 }}/>
                  <Tooltip formatter={(value, name) => [`${value} m`, name === 'towerheight' ? 'Tower Height':'Tower Height']}/>
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="towerheight" fill="#4411FF" name="Tower Height" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
 