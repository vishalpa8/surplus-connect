// Performance optimization utilities

// Image optimization utilities
export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  height?: number,
  quality = 75
): string => {
  // In a real app, this would integrate with a service like Cloudinary or Next.js Image Optimization
  if (!url) return '/images/placeholder.jpg';
  
  // For now, return the original URL
  // In production, you'd add query parameters for optimization
  return url;
};

// Lazy loading utilities
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Memory management utilities
export class MemoryManager {
  private static cache = new Map<string, any>();
  private static maxSize = 100;

  static set(key: string, value: any): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = Array.from(this.cache.keys())[0];
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  static get(key: string): any {
    return this.cache.get(key);
  }

  static has(key: string): boolean {
    return this.cache.has(key);
  }

  static delete(key: string): boolean {
    return this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }

  static size(): number {
    return this.cache.size;
  }
}

// Bundle size optimization
// NOTE: Dynamic import with variable is not statically analyzable by Webpack/Next.js and will cause a warning.
// To avoid the warning, only use static paths or document this limitation.
export const loadComponent = async (componentPath: string) => {
  // Only allow static imports to avoid Webpack critical dependency warning
  // Example usage: loadComponent('path/to/Component')
  // If you need dynamic imports, refactor to use static paths or a mapping object
  // This is a placeholder. Add static import cases as needed for your project.
  throw new Error('Dynamic import of arbitrary path is not supported. Use static paths.');
};

// Performance monitoring
export class PerformanceMonitor {
  private static marks = new Map<string, number>();

  static mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  static measure(name: string, startMark: string): number {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      console.warn(`Start mark "${startMark}" not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    console.log(`${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  static clearMarks(): void {
    this.marks.clear();
  }
}

// Resource preloading
export const preloadResource = (href: string, as?: string): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href || '';
  link.as = typeof as === 'string' ? as : 'script';
  document.head.appendChild(link);
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Virtual scrolling utilities
export const calculateVisibleItems = (
  containerHeight: number,
  itemHeight: number,
  scrollTop: number = 0,
  buffer = 5
) => {
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight);
  
  return {
    start: Math.max(0, visibleStart - buffer),
    end: visibleEnd + buffer,
  };
};

// Web Workers utilities
export const createWorker = (workerFunction: Function): Worker => {
  const blob = new Blob([`(${workerFunction.toString()})()`], {
    type: 'application/javascript',
  });
  return new Worker(URL.createObjectURL(blob));
};

// Service Worker utilities
export const registerServiceWorker = async (swPath: string): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(swPath);
      console.log('Service Worker registered successfully');
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};