'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface DonutChartProps {
  title: string;
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
  className?: string;
}

const DEFAULT_COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6', '#06b6d4'];

export function DonutChart({
  title,
  data,
  height = 300,
  className
}: DonutChartProps) {
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  data={dataWithColors}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dataWithColors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {dataWithColors.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.value} ({Math.round((item.value / total) * 100)}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}