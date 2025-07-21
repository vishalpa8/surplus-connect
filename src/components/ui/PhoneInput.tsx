'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string | undefined;
  hint?: string;
  fullWidth?: boolean;
  countryCode?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, label, error, hint, fullWidth = true, countryCode = '+1', ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="form-label">
            {label}
          </label>
        )}
        <div className="relative flex">
          <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl text-sm text-gray-600">
            {countryCode}
          </div>
          <input
            ref={ref}
            type="tel"
            className={cn(
              'form-input rounded-l-none flex-1',
              error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
              className
            )}
            {...props}
          />
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

PhoneInput.displayName = 'PhoneInput';