'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

const inputVariants = cva(
  'flex w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
      variant: {
        default: 'focus-visible:border-primary-500 focus-visible:ring-primary-500',
        error: 'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string | undefined;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    fullWidth = true,
    size,
    variant,
    ...props
  }, ref) => {
    const inputVariant = error ? 'error' : variant;

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            className={cn(
              inputVariants({ size, variant: inputVariant }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {rightIcon}
            </div>
          )}
          
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          )}
        </div>
        
        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}
        
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { inputVariants };
