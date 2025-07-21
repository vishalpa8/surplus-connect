'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  MapPin, 
  Clock, 
  DollarSign,
  Package,
  Camera,
  Check
} from 'lucide-react';

interface ListingFormData {
  // Basic Info
  title: string;
  description: string;
  category: string;
  quantity: number;
  
  // Pricing & Timing
  originalPrice: number;
  discountedPrice: number;
  expiryDate: string;
  expiryTime: string;
  pickupStartTime: string;
  pickupEndTime: string;
  
  // Location
  address: string;
  city: string;
  postalCode: string;
  pickupInstructions: string;
  
  // Images
  images: File[];
  
  // Additional
  dietaryInfo: string[];
  allergens: string[];
}

const initialFormData: ListingFormData = {
  title: '',
  description: '',
  category: '',
  quantity: 1,
  originalPrice: 0,
  discountedPrice: 0,
  expiryDate: '',
  expiryTime: '',
  pickupStartTime: '',
  pickupEndTime: '',
  address: '',
  city: '',
  postalCode: '',
  pickupInstructions: '',
  images: [],
  dietaryInfo: [],
  allergens: []
};

const categories = [
  'Bakery', 'Produce', 'Prepared Foods', 'Dairy', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Frozen', 'Other'
];

const dietaryOptions = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
  'Organic', 'Halal', 'Kosher'
];

const allergenOptions = [
  'Contains Nuts', 'Contains Dairy', 'Contains Gluten', 'Contains Eggs', 
  'Contains Soy', 'Contains Shellfish', 'Contains Fish'
];

const steps = [
  { id: 1, title: 'Basic Info', icon: Package },
  { id: 2, title: 'Pricing & Timing', icon: Clock },
  { id: 3, title: 'Location', icon: MapPin },
  { id: 4, title: 'Images', icon: Camera },
  { id: 5, title: 'Review', icon: Check }
];

export function ListingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof ListingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'dietaryInfo' | 'allergens', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files);
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Handle success/redirect
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Listing Title"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              placeholder="e.g., Fresh Croissants from Morning Bakery"
            />
            
            <div>
              <label className="form-label">Category</label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateFormData('category', category)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.category === category
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="form-input h-24 resize-none"
                placeholder="Describe your food items, freshness, and any special details..."
              />
            </div>

            <Input
              label="Quantity Available"
              type="number"
              value={formData.quantity}
              onChange={(e) => updateFormData('quantity', parseInt(e.target.value) || 1)}
              min="1"
            />

            <div>
              <label className="form-label">Dietary Information</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {dietaryOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleArrayItem('dietaryInfo', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.dietaryInfo.includes(option)
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Allergen Information</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allergenOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleArrayItem('allergens', option)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.allergens.includes(option)
                        ? 'bg-warning-100 text-warning-700 border border-warning-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Original Price"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => updateFormData('originalPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                leftIcon={<DollarSign className="h-4 w-4" />}
              />
              <Input
                label="Discounted Price"
                type="number"
                value={formData.discountedPrice}
                onChange={(e) => updateFormData('discountedPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                leftIcon={<DollarSign className="h-4 w-4" />}
              />
            </div>

            {formData.originalPrice > 0 && formData.discountedPrice > 0 && (
              <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                <p className="text-sm text-success-700">
                  Discount: {Math.round((1 - formData.discountedPrice / formData.originalPrice) * 100)}% off
                  • Savings: ${(formData.originalPrice - formData.discountedPrice).toFixed(2)}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => updateFormData('expiryDate', e.target.value)}
              />
              <Input
                label="Expiry Time"
                type="time"
                value={formData.expiryTime}
                onChange={(e) => updateFormData('expiryTime', e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Pickup Window</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Input
                  label="Start Time"
                  type="time"
                  value={formData.pickupStartTime}
                  onChange={(e) => updateFormData('pickupStartTime', e.target.value)}
                />
                <Input
                  label="End Time"
                  type="time"
                  value={formData.pickupEndTime}
                  onChange={(e) => updateFormData('pickupEndTime', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Input
              label="Street Address"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
              placeholder="123 Main Street"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="Toronto"
              />
              <Input
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) => updateFormData('postalCode', e.target.value)}
                placeholder="M5V 3A8"
              />
            </div>

            <div>
              <label className="form-label">Pickup Instructions</label>
              <textarea
                value={formData.pickupInstructions}
                onChange={(e) => updateFormData('pickupInstructions', e.target.value)}
                className="form-input h-24 resize-none"
                placeholder="e.g., Use back entrance, ring doorbell, ask for manager..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Upload Images (Max 5)</label>
              <div className="mt-2">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                </label>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div>
                <label className="form-label">Uploaded Images</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-error-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Listing</h3>
              <p className="text-gray-600">Please review all information before publishing</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Title:</span> {formData.title}</p>
                  <p><span className="font-medium">Category:</span> {formData.category}</p>
                  <p><span className="font-medium">Quantity:</span> {formData.quantity}</p>
                  <p><span className="font-medium">Description:</span> {formData.description}</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Pricing & Timing</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Price:</span> ${formData.discountedPrice} (was ${formData.originalPrice})</p>
                  <p><span className="font-medium">Expires:</span> {formData.expiryDate} at {formData.expiryTime}</p>
                  <p><span className="font-medium">Pickup:</span> {formData.pickupStartTime} - {formData.pickupEndTime}</p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Address:</span> {formData.address}, {formData.city} {formData.postalCode}</p>
                  {formData.pickupInstructions && (
                    <p><span className="font-medium">Instructions:</span> {formData.pickupInstructions}</p>
                  )}
                </div>
              </div>

              {(formData.dietaryInfo.length > 0 || formData.allergens.length > 0) && (
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Dietary & Allergen Info</h4>
                  {formData.dietaryInfo.length > 0 && (
                    <div className="mb-2">
                      <span className="text-sm font-medium">Dietary:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.dietaryInfo.map(item => (
                          <Badge key={item} variant="success" size="sm">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {formData.allergens.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Allergens:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.allergens.map(item => (
                          <Badge key={item} variant="warning" size="sm">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create New Listing</CardTitle>
            <Badge variant="outline">{currentStep} of {steps.length}</Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : isActive
                      ? 'border-primary-600 text-primary-600'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      isCompleted ? 'bg-primary-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Publish Listing
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}