'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | undefined;
  hint?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, fullWidth = true, options, placeholder, ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="form-label">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'form-select appearance-none pr-10',
              error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {hint && !error && (
          <p className="form-hint">
            {hint}
          </p>
        )}
        {error && (
          <p className="form-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';