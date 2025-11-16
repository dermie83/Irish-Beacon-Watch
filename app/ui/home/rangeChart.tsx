'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';


type LighthouseRangeProps = {
  rangeData: {
    name: string;
    range_w:number;
    range_r:number;
  }[]
}

export default function RangeGraph({rangeData} : LighthouseRangeProps) {
        return (
          <div className="w-full h-full p-4 bg-white rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Light Range
              <span className="text-sm font-medium text-600 ml-1"> - Farthest 15</span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={rangeData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-90}
                    textAnchor="end"
                    interval={0}
                    height={90}
                    tick={{ fontSize: 10, width: 60, dy: 5 }}
                  />
                  <YAxis
                    label={{
                    value: 'Nm',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fontSize: 12 }
                    }}
                  />
                  <Tooltip formatter={(value) => `${value} Nm`} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar
                    dataKey="range_w"
                    name="White Light"
                    fill="#4C9AFF"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="range_r"
                    name="Red Light"
                    fill="#fa2027ff"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}
 