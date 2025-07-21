'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-primary-500',
        soft: 'bg-primary-100 text-primary-700 hover:bg-primary-200 focus-visible:ring-primary-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-primary-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    isLoading,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || 'Loading...'}
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
