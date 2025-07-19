import { ReactNode } from 'react';
import clsx from 'clsx';

interface AchievementBadgeProps {
  icon: ReactNode;
  title: string;
  description: string;
  count?: number;
  isLocked?: boolean;
  isNew?: boolean;
  className?: string;
}

export function AchievementBadge({
  icon,
  title,
  description,
  count,
  isLocked = false,
  isNew = false,
  className,
}: AchievementBadgeProps) {
  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-2xl p-4 transition-all duration-300',
        isLocked ? 'bg-gray-100' : 'bg-white shadow-soft hover:shadow-soft-lg',
        className
      )}
    >
      {isNew && (
        <div className="absolute right-2 top-2">
          <span className="badge-primary animate-pulse">New!</span>
        </div>
      )}
      
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={clsx(
            'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300',
            isLocked ? 'bg-gray-200 text-gray-400' : 'bg-primary-100 text-primary-600'
          )}
        >
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={clsx(
                'font-semibold',
                isLocked ? 'text-gray-400' : 'text-gray-900'
              )}
            >
              {title}
            </h3>
            {count !== undefined && (
              <span
                className={clsx(
                  'rounded-full px-2 py-0.5 text-sm',
                  isLocked
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-primary-50 text-primary-700'
                )}
              >
                {count}
              </span>
            )}
          </div>
          
          <p
            className={clsx(
              'mt-1 text-sm',
              isLocked ? 'text-gray-400' : 'text-gray-600'
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
