'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Upload } from 'lucide-react';
import Image from 'next/image';

const categories = ['Bakery', 'Produce', 'Dairy', 'Packaged Goods', 'Prepared Meals'];
const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'];

export default function NewListingPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <PlusCircle className="h-8 w-8 text-primary-600" />
            Create New Food Listing
          </h1>
          <p className="mt-2 text-gray-600">
            Fill out the details below to add a new surplus food item to the marketplace.
          </p>
        </div>

        <form className="space-y-8 bg-white p-8 rounded-2xl shadow-soft-lg">
          {/* Image Upload */}
          <div>
            <label className="form-label">Food Image</label>
            <div className="mt-2 flex items-center gap-x-4">
              <div className="h-24 w-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Image preview" width={96} height={96} className="object-cover" />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <label htmlFor="file-upload" className="cursor-pointer rounded-md bg-white font-semibold text-primary-600 hover:text-primary-700">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
              </label>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          <Input id="name" label="Food Name" placeholder="e.g., Fresh Sourdough Loaf" />
          
          <div>
            <label htmlFor="description" className="form-label">Description</label>
            <textarea id="description" rows={3} className="form-input" placeholder="Describe the item, its condition, and any allergens."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input id="quantity" label="Quantity" placeholder="e.g., 10 loaves" />
            <div>
              <label htmlFor="category" className="form-label">Category</label>
              <select id="category" className="form-select">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input id="expiryDate" label="Expiry Date & Time" type="datetime-local" />
            <Input id="pickupWindow" label="Pickup Window" placeholder="e.g., Today, 4 PM - 6 PM" />
          </div>

          {/* Dietary Information */}
          <div>
            <label className="form-label">Dietary Information</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {dietaryOptions.map(option => (
                <div key={option} className="flex items-center">
                  <input id={option} name="dietary" type="checkbox" className="form-checkbox" />
                  <label htmlFor={option} className="ml-3 text-sm text-gray-700">{option}</label>
                </div>
              ))}
            </div>
          </div>
          
          <Input id="address" label="Pickup Address" placeholder="123 Main St, Anytown, USA" />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Save Listing</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
