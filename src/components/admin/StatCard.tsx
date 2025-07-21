'use client';

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
  className
}: StatCardProps) {
  return (
    <Card className={cn('transition-all duration-200 hover:shadow-soft-lg', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {change && (
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  changeType === 'increase' ? 'text-success-600' : 'text-error-600'
                )}>
                  {changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{change}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}