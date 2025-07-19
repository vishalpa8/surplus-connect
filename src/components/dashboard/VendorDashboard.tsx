import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { FoodListingCard } from '@/components/ui/FoodListingCard';
import {
  HeartIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

// Sample data
const stats = [
  {
    name: 'Meals Saved',
    value: '2,543',
    change: { value: '12%', type: 'increase' as const },
    icon: <HeartIcon className="h-5 w-5" />,
  },
  {
    name: 'Active Listings',
    value: '12',
    icon: <BuildingStorefrontIcon className="h-5 w-5" />,
  },
  {
    name: 'Followers',
    value: '312',
    change: { value: '25', type: 'increase' as const },
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    name: 'Impact Score',
    value: '92',
    change: { value: '3', type: 'increase' as const },
    icon: <ArrowTrendingUpIcon className="h-5 w-5" />,
  },
];

interface Listing { id: number; [key: string]: any; }

const recentListings: Listing[] = [
  // Sample data, will be replaced with real data
];

export function VendorDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your listings and impact.
        </p>
      </div>
      <StatsGrid stats={stats} />
      <div>
        <h2 className="text-lg font-medium text-gray-900">Your Active Listings</h2>
        {recentListings.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentListings.map((listing: any) => (
              <FoodListingCard key={listing.id} {...listing} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-500">You have no active listings.</p>
            <button className="btn-primary mt-4">Add New Listing</button>
          </div>
        )}
      </div>
    </div>
  );
}
