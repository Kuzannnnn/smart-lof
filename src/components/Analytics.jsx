// src/components/Analytics.jsx
import React, { useMemo } from 'react';
import { Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { smoothData } from '../utils/analytics.js';

const rawSensorLogs = [
  { time: '08:00', ph: 6.2, temp: 24, methane: 10 },
  { time: '10:00', ph: 7.8, temp: 28, methane: 18 }, 
  { time: '12:00', ph: 6.8, temp: 26, methane: 25 },
  { time: '14:00', ph: 7.2, temp: 27, methane: 35 },
  { time: '16:00', ph: 7.0, temp: 26, methane: 40 },
];

const Analytics = () => {
  // The algorithm calculation is moved here so the Dashboard doesn't need to compute it
  const processedData = useMemo(() => smoothData(rawSensorLogs, 0.4), []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Data Analytics</h1>
        <p className="text-sm md:text-base text-gray-500 font-medium mt-1">Algorithmic Smoothing for Sensor Noise Reduction.</p>
      </div>
      
      <div className="bg-white p-4 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-100 h-[350px] md:h-[500px] w-full flex flex-col">
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#9ca3af" fontSize={12} />
              <YAxis axisLine={false} tickLine={false} stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} itemStyle={{ fontWeight: 'bold' }} />
              <Legend verticalAlign="top" height={40} iconType="circle" />
              <Line type="monotone" dataKey="ph" stroke="#059669" strokeWidth={4} dot={{ r: 6, fill: '#059669', strokeWidth: 2, stroke: '#fff' }} name="Smoothed pH" />
              <Line type="monotone" dataKey="methane" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} name="Methane Trend" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-2xl md:rounded-3xl border border-emerald-100 w-full flex flex-col">
        <h4 className="text-emerald-900 font-bold flex items-center gap-2">
          <Activity size={18} /> SES Algorithm Implementation
        </h4>
        <p className="text-emerald-700 text-sm mt-2 font-medium leading-relaxed">
          Applying a smoothing factor of $\alpha = 0.4$. This algorithm mathematically weights previous states 
          to stabilize real-time reactor readings against environmental noise.
        </p>
      </div>
    </div>
  );
};

export default Analytics;