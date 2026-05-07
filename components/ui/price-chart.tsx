"use client";

import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface PriceChartProps {
  data: { date: string; price: number }[];
}

export function PriceChart({ data }: PriceChartProps) {
  // We add a state for the timeline toggles to make it feel like a real app
  const [timeline, setTimeline] = useState('1 Month');

  // Find the minimum price so the graph doesn't start at 0, making the drops look more dramatic
  const minPrice = Math.min(...data.map(d => d.price)) * 0.85;

  // Custom Tooltip exactly like your screenshot
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border shadow-xl rounded-lg p-3 text-center z-50">
          <p className="text-lg font-bold text-gray-900">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-gray-500 mt-1">{payload[0].payload.date}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header & Toggles */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Price History</h3>
        <div className="flex bg-secondary/50 rounded-full p-1">
          {['1 Month', '3 Month', 'Max'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeline(t)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                timeline === t 
                  ? 'bg-white dark:bg-gray-800 shadow-sm font-semibold text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* The Actual Graph */}
      <div className="h-48 w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            {/* The exact Red-to-Yellow-to-Green gradient from your screenshot */}
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>  {/* Red at the top */}
                <stop offset="50%" stopColor="#fef08a" stopOpacity={0.4}/> {/* Yellow in the middle */}
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/> {/* Green at the bottom */}
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.15} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#888' }} 
              dy={10} 
            />
            <YAxis 
              domain={[minPrice, 'dataMax']} 
              hide 
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '4 4' }} 
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#ef4444" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              activeDot={{ r: 6, fill: "#4f46e5", stroke: "#fff", strokeWidth: 2 }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
