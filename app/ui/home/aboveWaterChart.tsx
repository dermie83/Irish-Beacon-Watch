'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

type LighthouseABWProps = {
  abwData: {
    name: string;
    abovewater: number;
  }[]
}

export default function AboveWaterGraph({abwData} : LighthouseABWProps) {
        return (
          <>
            <div className="w-full h-full p-4 bg-white rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Beacon Above Water
                <span className="text-sm font-medium text-600 ml-1"> - Tallest 15</span>
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={abwData}
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
                    value: 'Meters',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fontSize: 12 }
                    }}
                  />
                  <Tooltip formatter={(value) => `${value} m`} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar
                    dataKey="abovewater"
                    name="Above Water"
                    radius={[6, 6, 0, 0]}
                  />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
              </div>
          </>
        )}
 