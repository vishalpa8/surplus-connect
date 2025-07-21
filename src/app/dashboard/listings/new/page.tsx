import DashboardLayout from '@/components/layout/DashboardLayout';
import { ListingForm } from '@/components/forms/ListingForm';

export default function NewListingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
          <p className="mt-2 text-gray-600">
            Add a new food item to help reduce waste and connect with your community.
          </p>
        </div>
        
        <ListingForm />
      </div>
    </DashboardLayout>
  );
}