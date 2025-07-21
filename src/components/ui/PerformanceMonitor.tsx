'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PerformanceMonitorProps {
  enableLogging?: boolean;
  enableWebVitals?: boolean;
}

export function PerformanceMonitor({ 
  enableLogging = process.env.NODE_ENV === 'development',
  enableWebVitals = true 
}: PerformanceMonitorProps) {
  const router = useRouter();

  useEffect(() => {
    if (!enableLogging && !enableWebVitals) return () => {};

    // Monitor route changes
    const handleRouteChange = (url: string) => {
      if (enableLogging) {
        console.log(`Route changed to: ${url}`);
        performance.mark('route-change-start');
      }
    };

    const handleRouteComplete = () => {
      if (enableLogging) {
        performance.mark('route-change-end');
        performance.measure('route-change', 'route-change-start', 'route-change-end');
        
        const measure = performance.getEntriesByName('route-change')[0];
        if (measure) {
          console.log(`Route change took: ${measure.duration.toFixed(2)}ms`);
        }
      }
    };

    // Monitor Core Web Vitals
    if (enableWebVitals && typeof window !== 'undefined') {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming;
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
      } catch (e) {
        // Fallback for browsers that don't support these metrics
        console.log('Performance monitoring not fully supported');
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        console.log('CLS:', clsValue);
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('CLS monitoring not supported');
      }

      return () => {
        observer.disconnect();
        clsObserver.disconnect();
      };
    }
    return () => {};
  }, [enableLogging, enableWebVitals, router]);

  // Monitor memory usage
  useEffect(() => {
    if (!enableLogging || typeof window === 'undefined') return;

    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log('Memory usage:', {
          used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
          total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
          limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
        });
      }
    };

    const interval = setInterval(checkMemory, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [enableLogging]);

  return null; // This component doesn't render anything
}