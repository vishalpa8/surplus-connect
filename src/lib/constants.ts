// Responsive breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Common spacing values
export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
} as const;

// Animation durations
export const ANIMATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;

// Z-index layers
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
} as const;

// Common component sizes
export const SIZES = {
  button: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  input: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  },
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },
  listings: {
    base: '/api/listings',
    create: '/api/listings',
    update: (id: string) => `/api/listings/${id}`,
    delete: (id: string) => `/api/listings/${id}`,
  },
  users: {
    base: '/api/users',
    profile: '/api/users/profile',
    update: '/api/users/profile',
  },
} as const;

// User roles
export const USER_ROLES = {
  VENDOR: 'vendor',
  CONSUMER: 'consumer',
  NGO: 'ngo',
  ADMIN: 'admin',
} as const;

// Listing categories
export const LISTING_CATEGORIES = [
  'Bakery',
  'Produce',
  'Prepared Foods',
  'Dairy',
  'Meat & Seafood',
  'Beverages',
  'Snacks',
  'Frozen',
  'Other',
] as const;

// Dietary options
export const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Organic',
  'Halal',
  'Kosher',
] as const;

// Allergen options
export const ALLERGEN_OPTIONS = [
  'Contains Nuts',
  'Contains Dairy',
  'Contains Gluten',
  'Contains Eggs',
  'Contains Soy',
  'Contains Shellfish',
  'Contains Fish',
] as const;