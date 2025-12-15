import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ProgressChartProps {
  data: { date: string; percentage: number }[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const formattedData = data.map(d => ({
    ...d,
    day: new Date(d.date).toLocaleDateString('es-ES', { weekday: 'short' }),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis 
          dataKey="day" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
          dy={10}
        />
        <YAxis 
          hide 
          domain={[0, 100]} 
        />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.percentage >= 100 ? '#22c55e' : '#6366f1'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
