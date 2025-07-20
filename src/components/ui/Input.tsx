'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, fullWidth = true, icon, ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="form-label">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'form-input',
              error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
              icon ? 'pl-10' : '',
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

Input.displayName = 'Input';
