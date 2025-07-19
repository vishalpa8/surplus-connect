import { ReactNode } from 'react';
import clsx from 'clsx';

interface Stat {
  name: string;
  value: string | number;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease';
  };
  icon?: ReactNode;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={clsx('grid gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {stats.map((stat, index) => (
        <div
          key={stat.name}
          className="card-interactive relative overflow-hidden bg-white px-4 py-5 sm:px-6"
        >
          {/* Decorative background shapes */}
          <div
            className={clsx(
              'absolute right-0 top-0 -mt-6 -mr-6 h-24 w-24 rounded-full opacity-10',
              index % 4 === 0 && 'bg-primary-500',
              index % 4 === 1 && 'bg-accent-500',
              index % 4 === 2 && 'bg-success-500',
              index % 4 === 3 && 'bg-warning-500'
            )}
          />

          <dt className="flex items-center gap-2 truncate text-sm font-medium text-gray-500">
            {stat.icon && (
              <div
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-lg',
                  index % 4 === 0 && 'bg-primary-100 text-primary-600',
                  index % 4 === 1 && 'bg-accent-100 text-accent-600',
                  index % 4 === 2 && 'bg-success-100 text-success-600',
                  index % 4 === 3 && 'bg-warning-100 text-warning-600'
                )}
              >
                {stat.icon}
              </div>
            )}
            {stat.name}
          </dt>

          <dd className="mt-2">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              {stat.change && (
                <p
                  className={clsx(
                    'ml-2 flex items-baseline text-sm font-semibold',
                    stat.change.type === 'increase'
                      ? 'text-success-600'
                      : 'text-error-600'
                  )}
                >
                  {stat.change.type === 'increase' ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  )}
                  <span className="sr-only">
                    {stat.change.type === 'increase'
                      ? 'Increased by'
                      : 'Decreased by'}
                  </span>
                  {stat.change.value}
                </p>
              )}
            </div>
          </dd>
        </div>
      ))}
    </div>
  );
}
