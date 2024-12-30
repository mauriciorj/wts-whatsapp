"use client";

import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jan", messages: 4000 },
  { date: "Feb", messages: 3000 },
  { date: "Mar", messages: 2000 },
  { date: "Apr", messages: 2780 },
  { date: "May", messages: 1890 },
  { date: "Jun", messages: 2390 },
];

export function UsageChart() {
  return (
    <div className="w-full h-[300px] bg-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Cliques</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="messages" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}