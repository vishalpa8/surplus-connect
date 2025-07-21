'use client';

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface BarChartProps {
  title: string;
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  className?: string;
}

export function BarChart({
  title,
  data,
  dataKey,
  xAxisKey,
  color = '#22c55e',
  height = 300,
  className
}: BarChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data}>
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}