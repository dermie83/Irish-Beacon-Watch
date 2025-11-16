'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

type LighthouseTowerProps = {
  ageData: {
    name: string;
    age:number;
  }[]
}


export default function AgeGraph({ageData} : LighthouseTowerProps) {
        return (
            <div className="w-full h-full p-4 bg-white rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Age
                <span className="text-sm font-medium text-600 ml-1"> - Oldest 15</span>
              </h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ageData}
                      margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-90}
                      textAnchor="end"
                      interval={0}
                      height={90}
                      tick={{ fontSize: 12, width: 60, dy: 5 }}
                    />
                    <YAxis
                      label={{
                      value: 'Yrs',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fontSize: 12 }
                      }}
                    />
                    <Tooltip formatter={(value) => `${value} yrs`} />
                    <Legend verticalAlign="top" height={36} />
                    <Bar
                      dataKey="age"
                      name="Age"
                      fill="#a74f3aff"
                      radius={[6, 6, 0, 0]}
                    />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
            </div>
        )}
 