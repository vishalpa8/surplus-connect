'use client';

import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface AreaChartProps {
  title: string;
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  className?: string;
}

export function AreaChart({
  title,
  data,
  dataKey,
  xAxisKey,
  color = '#22c55e',
  height = 300,
  className
}: AreaChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsAreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${dataKey})`}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}