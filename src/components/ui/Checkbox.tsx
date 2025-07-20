'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
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
            className={clsx(
              'sr-only',
              className
            )}
            {...props}
          />
          <div
            className={clsx(
              'flex h-5 w-5 items-center justify-center rounded border-2 transition-all',
              checked
                ? 'bg-primary-600 border-primary-600'
                : 'bg-white border-gray-300 hover:border-gray-400',
              error && 'border-error-300'
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