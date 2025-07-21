'use client';

import { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
        auto: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-2 sm:gap-3',
        md: 'gap-4 sm:gap-6',
        lg: 'gap-6 sm:gap-8',
        xl: 'gap-8 sm:gap-10',
      },
    },
    defaultVariants: {
      cols: 'auto',
      gap: 'md',
    },
  }
);

type AsProp = 'div' | 'section' | 'ul' | 'ol' | 'dl';

export type GridProps<T extends AsProp = 'div'> = {
  children: ReactNode;
  as?: T;
} & VariantProps<typeof gridVariants> &
  (T extends 'ul'
    ? React.HTMLAttributes<HTMLUListElement>
    : T extends 'ol'
    ? React.HTMLAttributes<HTMLOListElement>
    : HTMLAttributes<HTMLDivElement>);

export function Grid<T extends AsProp = 'div'>({
  children,
  className,
  cols,
  gap,
  as: Component = 'div' as T,
  ...props
}: GridProps<T>) {
  return (
    <Component
      className={cn(gridVariants({ cols, gap }), className)}
      {...(props as any)}
    >
      {children}
    </Component>
  );
}

export { gridVariants };