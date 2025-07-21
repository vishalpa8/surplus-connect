import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
  .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
  .regex(/(?=.*\d)/, 'Password must contain at least one number');

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits');

// Auth validation schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['vendor', 'consumer', 'ngo']),
  phone: phoneSchema.optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Listing validation schemas
export const listingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  category: z.string().min(1, 'Please select a category'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  originalPrice: z.number().min(0, 'Original price must be positive'),
  discountedPrice: z.number().min(0, 'Discounted price must be positive'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  expiryTime: z.string().min(1, 'Expiry time is required'),
  pickupStartTime: z.string().min(1, 'Pickup start time is required'),
  pickupEndTime: z.string().min(1, 'Pickup end time is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(3, 'Postal code is required'),
  pickupInstructions: z.string().optional(),
  dietaryInfo: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
}).refine(data => data.discountedPrice <= data.originalPrice, {
  message: 'Discounted price cannot be higher than original price',
  path: ['discountedPrice'],
});

// Profile validation schemas
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema.optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  radius: z.number().min(1).max(50).optional(),
  priceRange: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
  }).optional(),
  dietaryFilters: z.array(z.string()).optional(),
  sortBy: z.enum(['distance', 'price', 'expiry', 'rating']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ListingFormData = z.infer<typeof listingSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;