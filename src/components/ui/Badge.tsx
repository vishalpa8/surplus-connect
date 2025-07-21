'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-primary-800 ring-primary-600/20',
        secondary: 'bg-secondary-100 text-secondary-800 ring-secondary-600/20',
        success: 'bg-success-100 text-success-800 ring-success-600/20',
        warning: 'bg-warning-100 text-warning-800 ring-warning-600/20',
        error: 'bg-error-100 text-error-800 ring-error-600/20',
        gray: 'bg-gray-100 text-gray-800 ring-gray-600/20',
        outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };