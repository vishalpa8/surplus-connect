'use client';

import { ReactNode } from 'react';
import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: ReactNode;
  description?: string;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  description,
  className,
  trend
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case 'increase':
        return <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success-600" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-error-600" />;
      default:
        return <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    if (!change) return '';
    
    switch (change.type) {
      case 'increase':
        return 'text-success-600';
      case 'decrease':
        return 'text-error-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className={cn('transition-all duration-200 hover:shadow-soft-lg', className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
            <div className="mt-1 sm:mt-2 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">{value}</p>
              {change && (
                <div className={cn('flex items-center gap-1 text-xs sm:text-sm font-medium', getChangeColor())}>
                  {getTrendIcon()}
                  <span>{typeof change.value === 'string' ? change.value : `${change.value}%`}</span>
                </div>
              )}
            </div>
            {description && (
              <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">{description}</p>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 flex-shrink-0">
              <div className="scale-75 sm:scale-100">
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}