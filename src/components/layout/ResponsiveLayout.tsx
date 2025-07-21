'use client';

import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'wide' | 'narrow';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'accent' | 'gray' | 'transparent';
}

const spacingClasses = {
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 lg:py-20',
  lg: 'py-16 sm:py-20 lg:py-28',
  xl: 'py-20 sm:py-28 lg:py-36',
};

const backgroundClasses = {
  white: 'bg-white',
  accent: 'bg-accent',
  gray: 'bg-gray-50',
  transparent: 'bg-transparent',
};

const variantClasses = {
  default: 'xl',
  centered: 'lg',
  wide: 'full',
  narrow: 'md',
} as const;

export function ResponsiveLayout({
  children,
  className,
  variant = 'default',
  spacing = 'md',
  background = 'transparent',
}: ResponsiveLayoutProps) {
  return (
    <section 
      className={cn(
        'relative',
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      <Container size={variantClasses[variant]}>
        {children}
      </Container>
    </section>
  );
}