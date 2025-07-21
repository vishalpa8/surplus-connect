'use client';

import { ReactNode } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveProps {
  children: ReactNode;
  show?: 'mobile' | 'tablet' | 'desktop' | 'large';
  hide?: 'mobile' | 'tablet' | 'desktop' | 'large';
}

export function Responsive({ children, show, hide }: ResponsiveProps) {
  const { isMobile, isTablet, isDesktop, isLarge } = useResponsive();

  const shouldShow = () => {
    if (hide) {
      switch (hide) {
        case 'mobile':
          return !isMobile;
        case 'tablet':
          return !isTablet;
        case 'desktop':
          return !isDesktop;
        case 'large':
          return !isLarge;
        default:
          return true;
      }
    }

    if (show) {
      switch (show) {
        case 'mobile':
          return isMobile;
        case 'tablet':
          return isTablet;
        case 'desktop':
          return isDesktop;
        case 'large':
          return isLarge;
        default:
          return true;
      }
    }

    return true;
  };

  if (!shouldShow()) {
    return null;
  }

  return <>{children}</>;
}

// Utility components for common responsive patterns
export function MobileOnly({ children }: { children: ReactNode }) {
  return <Responsive show="mobile">{children}</Responsive>;
}

export function TabletOnly({ children }: { children: ReactNode }) {
  return <Responsive show="tablet">{children}</Responsive>;
}

export function DesktopOnly({ children }: { children: ReactNode }) {
  return <Responsive show="desktop">{children}</Responsive>;
}

export function LargeOnly({ children }: { children: ReactNode }) {
  return <Responsive show="large">{children}</Responsive>;
}

export function HideMobile({ children }: { children: ReactNode }) {
  return <Responsive hide="mobile">{children}</Responsive>;
}

export function HideTablet({ children }: { children: ReactNode }) {
  return <Responsive hide="tablet">{children}</Responsive>;
}

export function HideDesktop({ children }: { children: ReactNode }) {
  return <Responsive hide="desktop">{children}</Responsive>;
}