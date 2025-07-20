'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Select } from '@/components/ui/Select';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { SocialLogin } from '@/components/auth/SocialLogin';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { HandHeart, UserPlus, AlertCircle, CheckCircle, Mail, Eye, EyeOff } from 'lucide-react';
import { RoleSelector } from '@/components/ui/RoleSelector';
import toast from 'react-hot-toast';

type UserRole = 'vendor' | 'ngo' | 'consumer';

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'IN', label: 'India' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
];

const ORGANIZATION_TYPES = [
  { value: 'food_bank', label: 'Food Bank' },
  { value: 'shelter', label: 'Homeless Shelter' },
  { value: 'community_center', label: 'Community Center' },
  { value: 'religious_org', label: 'Religious Organization' },
  { value: 'school', label: 'School/Educational Institution' },
  { value: 'senior_center', label: 'Senior Center' },
  { value: 'other', label: 'Other Non-Profit' },
];

const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'grocery_store', label: 'Grocery Store' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'cafe', label: 'Cafe/Coffee Shop' },
  { value: 'catering', label: 'Catering Service' },
  { value: 'food_truck', label: 'Food Truck' },
  { value: 'hotel', label: 'Hotel/Hospitality' },
  { value: 'farm', label: 'Farm/Producer' },
  { value: 'other', label: 'Other Food Business' },
];

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [emailChecking, setEmailChecking] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  // Get role from URL parameter, default to 'consumer'
  const getInitialRole = (): UserRole => {
    const roleParam = searchParams.get('role');
    if (roleParam && ['vendor', 'ngo', 'consumer'].includes(roleParam)) {
      return roleParam as UserRole;
    }
    return 'consumer';
  };

  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: getInitialRole(),
    
    
    // Address Info
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Role-specific Info
    organizationName: '',
    businessName: '',
    organizationType: '',
    businessType: '',
    taxId: '',
    website: '',
    description: '',
    
    // Agreements
    agreeToTerms: false,
    subscribeToNewsletter: true,
    agreeToDataProcessing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register, error, clearError, user, checkEmailExists } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const dashboardRoute = getDashboardRoute(user.role);
      router.push(dashboardRoute);
    }
  }, [user, router]);

  // Update role when URL parameter changes
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && ['vendor', 'ngo', 'consumer'].includes(roleParam)) {
      setFormData(prev => ({ ...prev, role: roleParam as UserRole }));
    }
  }, [searchParams]);

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'vendor': return '/dashboard/vendor';
      case 'ngo': return '/dashboard/ngo';
      default: return '/dashboard';
    }
  };

  // Check email availability when user types
  useEffect(() => {
    const checkEmail = async () => {
      if (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setEmailChecking(true);
        try {
          const exists = await checkEmailExists(formData.email);
          setEmailExists(exists);
          if (exists) {
            setErrors(prev => ({ ...prev, email: 'An account with this email already exists' }));
          } else {
            setErrors(prev => ({ ...prev, email: '' }));
          }
        } catch (error) {
          console.error('Email check failed:', error);
        } finally {
          setEmailChecking(false);
        }
      }
    };

    const timeoutId = setTimeout(checkEmail, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.email, checkEmailExists]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Basic validation
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (emailExists) {
        newErrors.email = 'An account with this email already exists';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      // Role-specific validation
      if (formData.role === 'vendor') {
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.businessType) newErrors.businessType = 'Business type is required';
      } else if (formData.role === 'ngo') {
        if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
        if (!formData.organizationType) newErrors.organizationType = 'Organization type is required';
        if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
      }

      // Address validation
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      if (!formData.country) newErrors.country = 'Country is required';
    }

    if (step === 3) {
      // Agreement validation
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
      if (!formData.agreeToDataProcessing) newErrors.agreeToDataProcessing = 'Data processing consent is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    clearError();
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error('Please fix the errors before continuing');
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setIsLoading(true);

    try {
      const displayName = formData.role === 'consumer' 
        ? `${formData.firstName} ${formData.lastName}`
        : formData.role === 'vendor' 
        ? formData.businessName 
        : formData.organizationName;

      const user = await register(formData.email, formData.password, formData.role, displayName, formData);
      
      setShowSuccess(true);
      toast.success('Account created successfully! Welcome to Surplus Connect!');
      
      // Redirect after showing success
      setTimeout(() => {
        const dashboardRoute = getDashboardRoute(user.role);
        router.push(dashboardRoute);
      }, 2000);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.code === 'EMAIL_EXISTS') {
        setCurrentStep(1);
        toast.error('This email is already registered. Please use a different email or try logging in.');
      } else if (error.code === 'WEAK_PASSWORD') {
        setCurrentStep(1);
        toast.error('Please choose a stronger password');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`${provider} registration will be available soon!`);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-accent via-primary-50 to-secondary-50">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-soft-xl p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Surplus Connect!
            </h2>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully. Redirecting you to your dashboard...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <p className="text-sm text-gray-600">Let&apos;s start with your basic details</p>
            </div>

            <RoleSelector 
              selectedRole={formData.role} 
              setSelectedRole={(role) => handleInputChange('role', role)} 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="firstName"
                label="First Name"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                error={errors.firstName}
                disabled={isLoading}
              />
              
              <Input
                id="lastName"
                label="Last Name"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                error={errors.lastName}
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Input
                id="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john.doe@example.com"
                error={errors.email}
                disabled={isLoading}
              />
              {emailChecking && (
                <div className="absolute right-3 top-9">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                </div>
              )}
              {formData.email && !emailChecking && !emailExists && !errors.email && (
                <div className="absolute right-3 top-9">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              )}
            </div>

            <PhoneInput
              id="phone"
              label="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              error={errors.phone}
              disabled={isLoading}
            />

            <PasswordInput
              id="password"
              label="Password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              error={errors.password}
              disabled={isLoading}
              showStrengthIndicator={true}
              hint="Must be at least 8 characters with uppercase, lowercase, and number"
            />

            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              disabled={isLoading}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {formData.role === 'consumer' ? 'Address Information' : 
                 formData.role === 'vendor' ? 'Business & Address Details' : 
                 'Organization & Address Details'}
              </h3>
              <p className="text-sm text-gray-600">Complete your profile information</p>
            </div>

            {/* Role-specific fields */}
            {formData.role === 'vendor' && (
              <div className="space-y-4">
                <Input
                  id="businessName"
                  label="Business Name"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="The Corner Cafe"
                  error={errors.businessName}
                  disabled={isLoading}
                />
                
                <Select
                  id="businessType"
                  label="Business Type"
                  required
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  options={BUSINESS_TYPES}
                  placeholder="Select business type"
                  error={errors.businessType}
                  disabled={isLoading}
                />
              </div>
            )}

            {formData.role === 'ngo' && (
              <div className="space-y-4">
                <Input
                  id="organizationName"
                  label="Organization Name"
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  placeholder="Community Food Bank"
                  error={errors.organizationName}
                  disabled={isLoading}
                />
                
                <Select
                  id="organizationType"
                  label="Organization Type"
                  required
                  value={formData.organizationType}
                  onChange={(e) => handleInputChange('organizationType', e.target.value)}
                  options={ORGANIZATION_TYPES}
                  placeholder="Select organization type"
                  error={errors.organizationType}
                  disabled={isLoading}
                />
                
                <Input
                  id="taxId"
                  label="Tax ID / Registration Number"
                  type="text"
                  required
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  placeholder="123-45-6789"
                  error={errors.taxId}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Address fields */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900">Address Information</h4>
              
              <Input
                id="address"
                label="Street Address"
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street"
                error={errors.address}
                disabled={isLoading}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="city"
                  label="City"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="New York"
                  error={errors.city}
                  disabled={isLoading}
                />
                
                <Input
                  id="state"
                  label="State/Province"
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="NY"
                  error={errors.state}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="zipCode"
                  label="ZIP/Postal Code"
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="10001"
                  error={errors.zipCode}
                  disabled={isLoading}
                />
                
                <Select
                  id="country"
                  label="Country"
                  required
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  options={COUNTRIES}
                  placeholder="Select country"
                  error={errors.country}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Terms & Agreements</h3>
              <p className="text-sm text-gray-600">Review and accept our terms to complete registration</p>
            </div>

            <div className="space-y-4">
              <Checkbox
                id="agree-terms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                disabled={isLoading}
                error={errors.agreeToTerms}
                label={
                  <span>
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                      Privacy Policy
                    </Link>{' '}
                    <span className="text-error-500">*</span>
                  </span>
                }
              />

              <Checkbox
                id="agree-data-processing"
                checked={formData.agreeToDataProcessing}
                onChange={(e) => handleInputChange('agreeToDataProcessing', e.target.checked)}
                disabled={isLoading}
                error={errors.agreeToDataProcessing}
                label={
                  <span>
                    I consent to the processing of my personal data for account creation and service provision{' '}
                    <span className="text-error-500">*</span>
                  </span>
                }
              />

              <Checkbox
                id="newsletter"
                checked={formData.subscribeToNewsletter}
                onChange={(e) => handleInputChange('subscribeToNewsletter', e.target.checked)}
                disabled={isLoading}
                label="Send me updates about new features and surplus food opportunities (Optional)"
                description="You can unsubscribe at any time"
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Account Summary:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Role:</strong> {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</p>
                {formData.role === 'vendor' && formData.businessName && (
                  <p><strong>Business:</strong> {formData.businessName}</p>
                )}
                {formData.role === 'ngo' && formData.organizationName && (
                  <p><strong>Organization:</strong> {formData.organizationName}</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent via-primary-50 to-secondary-50">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white transition-transform group-hover:scale-105">
              <HandHeart className="h-7 w-7" />
            </div>
            <span className="font-display text-2xl font-bold text-gray-800">
              Surplus<span className="text-primary-600">Connect</span>
            </span>
          </Link>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Join the Movement
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Create your account and start making a difference by reducing food waste.
            </p>
            {searchParams.get('role') && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                <CheckCircle className="h-4 w-4" />
                Registering as {searchParams.get('role') === 'ngo' ? 'an NGO' : `a ${searchParams.get('role')}`}
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-600'}
              `}>
                {step}
              </div>
              {step < 3 && (
                <div className={`
                  w-12 h-1 mx-2
                  ${currentStep > step ? 'bg-primary-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-soft-xl border border-gray-100 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-50 border border-error-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-error-600 flex-shrink-0" />
                <p className="text-sm text-error-700 font-medium">
                  {error.message}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                >
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {!isLoading && <UserPlus className="mr-2 h-5 w-5" />}
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>
          </form>

          {/* Social Login - Only on first step */}
          {currentStep === 1 && (
            <div className="mt-8">
              <SocialLogin
                onGoogleLogin={() => handleSocialLogin('Google')}
                onFacebookLogin={() => handleSocialLogin('Facebook')}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
