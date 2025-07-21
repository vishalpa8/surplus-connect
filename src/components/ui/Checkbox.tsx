'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string | undefined;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, ...props }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className={cn(
              'sr-only'
            )}
            {...props}
          />
          <div
            className={cn(
              'h-4 w-4 rounded border-2 border-gray-300 bg-white transition-all duration-200 flex items-center justify-center',
              'peer-checked:bg-primary-600 peer-checked:border-primary-600',
              'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'
            )}
          >
            {checked && (
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            )}
          </div>
        </div>
        
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label className="text-sm font-medium text-gray-900 cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}
        
        {error && (
          <p className="form-error mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';