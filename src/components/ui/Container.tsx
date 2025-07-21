'use client';

import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
      },
      padding: {
        none: '',
        sm: 'px-4 sm:px-6',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12',
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: 'md',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
  as?: 'div' | 'section' | 'main' | 'article' | 'aside';
}

export function Container({
  children,
  className,
  size,
  padding,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { containerVariants };