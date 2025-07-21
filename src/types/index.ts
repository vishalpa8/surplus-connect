// Global type definitions for the application

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'vendor' | 'ngo' | 'consumer' | 'admin';
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  bio?: string;
  avatar?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  expiryDate: string;
  expiryTime: string;
  pickupStartTime: string;
  pickupEndTime: string;
  address: string;
  city: string;
  postalCode: string;
  pickupInstructions?: string;
  images: string[];
  dietaryInfo: string[];
  allergens: string[];
  vendorId: string;
  vendor?: {
    id: string;
    name: string;
    rating: number;
    avatar?: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'reserved' | 'expired' | 'completed';
  views: number;
  reservations: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  listingId: string;
  listing?: Listing;
  consumerId: string;
  consumer?: User;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  pickupTime: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NGORequest {
  id: string;
  ngoId: string;
  ngo?: User;
  listingId: string;
  listing?: Listing;
  requestedQuantity: number;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  user?: User;
  targetId: string; // Can be vendor ID or listing ID
  targetType: 'vendor' | 'listing';
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'expiry' | 'review' | 'system' | 'promotion';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Analytics {
  totalListings: number;
  activeListings: number;
  totalRevenue: number;
  mealsSaved: number;
  impactScore: number;
  revenueData: Array<{
    month: string;
    revenue: number;
  }>;
  categoryData: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  location?: string;
  radius?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  dietaryFilters?: string[];
  sortBy?: 'distance' | 'price' | 'expiry' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
  success: false;
  code?: string;
  details?: any;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: User['role'];
  phone?: string;
  agreeToTerms: boolean;
}

export interface ListingForm {
  title: string;
  description: string;
  category: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  expiryDate: string;
  expiryTime: string;
  pickupStartTime: string;
  pickupEndTime: string;
  address: string;
  city: string;
  postalCode: string;
  pickupInstructions?: string;
  images: File[];
  dietaryInfo: string[];
  allergens: string[];
}

export interface ProfileForm {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  bio?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'soft' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event types
export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: Date;
}

// Geolocation types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationError {
  code: number;
  message: string;
}

// Performance types
export interface PerformanceMetrics {
  domContentLoaded: number;
  loadComplete: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
}

// Accessibility types
export interface AccessibilityOptions {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  fontSize: number;
}