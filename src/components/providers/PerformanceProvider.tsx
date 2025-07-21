'use client';

import { useEffect } from 'react';
import { PerformanceMonitor } from '@/lib/performance';

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Mark initial load
    PerformanceMonitor.mark('app-start');

    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      // This would integrate with web-vitals library in a real app
      // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
      
      // getCLS(console.log);
      // getFID(console.log);
      // getFCP(console.log);
      // getLCP(console.log);
      // getTTFB(console.log);
    }

    // Monitor page load performance
    const handleLoad = () => {
      PerformanceMonitor.measure('app-load-time', 'app-start');
      
      // Report performance metrics
      if (performance.getEntriesByType) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log('Performance Metrics:', {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          });
        }
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return <>{children}</>;
}