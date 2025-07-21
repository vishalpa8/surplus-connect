// Accessibility utilities and helpers

// Focus management
export class FocusManager {
  private static focusStack: HTMLElement[] = [];

  static trapFocus(element: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(element);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }

  static pushFocus(element: HTMLElement): void {
    const currentFocus = document.activeElement as HTMLElement;
    if (currentFocus) {
      this.focusStack.push(currentFocus);
    }
    element.focus();
  }

  static popFocus(): void {
    const previousFocus = this.focusStack.pop();
    if (previousFocus) {
      previousFocus.focus();
    }
  }

  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }

  static getNextFocusableElement(current: HTMLElement, direction: 'next' | 'prev' = 'next'): HTMLElement | null {
    const focusableElements = this.getFocusableElements(document.body);
    const currentIndex = focusableElements.indexOf(current);
    
    if (currentIndex === -1) return null;

    const nextIndex = direction === 'next' 
      ? (currentIndex + 1) % focusableElements.length
      : (currentIndex - 1 + focusableElements.length) % focusableElements.length;

    return focusableElements[nextIndex] || null;
  }
}

// Keyboard navigation helpers
export const createKeyboardHandler = (handlers: Record<string, (e: KeyboardEvent) => void>) => {
  return (e: KeyboardEvent) => {
    const handler = handlers[e.key] || handlers[e.code];
    if (handler) {
      handler(e);
    }
  };
};

export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

// ARIA utilities
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const setAriaAttributes = (element: HTMLElement, attributes: Record<string, string | boolean | null>) => {
  Object.entries(attributes).forEach(([key, value]) => {
    const ariaKey = key.startsWith('aria-') ? key : `aria-${key}`;
    
    if (value === null) {
      element.removeAttribute(ariaKey);
    } else {
      element.setAttribute(ariaKey, String(value));
    }
  });
};

// Screen reader utilities
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * (sRGB[0] ?? 0) + 0.7152 * (sRGB[1] ?? 0) + 0.0722 * (sRGB[2] ?? 0);
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const meetsWCAGStandard = (color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

// Reduced motion utilities
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const respectMotionPreference = (normalAnimation: string, reducedAnimation: string): string => {
  return prefersReducedMotion() ? reducedAnimation : normalAnimation;
};

// High contrast mode detection
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Font size preferences
export const getPreferredFontSize = (): number => {
  if (typeof window === 'undefined') return 16;
  
  const testElement = document.createElement('div');
  testElement.style.fontSize = '1rem';
  testElement.style.position = 'absolute';
  testElement.style.visibility = 'hidden';
  document.body.appendChild(testElement);
  
  const fontSize = parseFloat(window.getComputedStyle(testElement).fontSize);
  document.body.removeChild(testElement);
  
  return fontSize;
};

// Touch target utilities
export const isTouchTargetAccessible = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const minSize = 44; // WCAG recommended minimum touch target size
  
  return rect.width >= minSize && rect.height >= minSize;
};

// Form accessibility helpers
export const associateLabel = (input: HTMLElement, label: HTMLElement): void => {
  const inputId = input.id || generateId('input');
  input.id = inputId;
  label.setAttribute('for', inputId);
};

export const addErrorDescription = (input: HTMLElement, errorElement: HTMLElement): void => {
  const errorId = errorElement.id || generateId('error');
  errorElement.id = errorId;
  
  const describedBy = input.getAttribute('aria-describedby');
  const newDescribedBy = describedBy ? `${describedBy} ${errorId}` : errorId;
  input.setAttribute('aria-describedby', newDescribedBy);
};

// Skip link utilities
export const createSkipLink = (targetId: string, text = 'Skip to main content'): HTMLElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg';
  
  return skipLink;
};

// Landmark utilities
export const addLandmarkRole = (element: HTMLElement, role: string): void => {
  element.setAttribute('role', role);
};

// Live region utilities
export class LiveRegion {
  private element: HTMLElement;

  constructor(priority: 'polite' | 'assertive' = 'polite') {
    this.element = document.createElement('div');
    this.element.setAttribute('aria-live', priority);
    this.element.setAttribute('aria-atomic', 'true');
    this.element.className = 'sr-only';
    document.body.appendChild(this.element);
  }

  announce(message: string): void {
    this.element.textContent = message;
  }

  destroy(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// Accessibility testing utilities
export const runAccessibilityChecks = (element: HTMLElement): string[] => {
  const issues: string[] = [];

  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.getAttribute('alt')) {
      issues.push(`Image ${index + 1} is missing alt text`);
    }
  });

  // Check for form inputs without labels
  const inputs = element.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    const hasLabel = input.getAttribute('aria-label') || 
                    input.getAttribute('aria-labelledby') ||
                    element.querySelector(`label[for="${input.id}"]`);
    
    if (!hasLabel) {
      issues.push(`Form input ${index + 1} is missing a label`);
    }
  });

  // Check for insufficient color contrast (simplified check)
  const textElements = element.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  textElements.forEach((el, index) => {
    const styles = window.getComputedStyle(el as HTMLElement);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    if (color && backgroundColor && color !== backgroundColor) {
      // This is a simplified check - in a real implementation, you'd need more sophisticated color parsing
      if (color === 'rgb(128, 128, 128)' && backgroundColor === 'rgb(255, 255, 255)') {
        issues.push(`Text element ${index + 1} may have insufficient color contrast`);
      }
    }
  });

  return issues;
};