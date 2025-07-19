import { StatsGrid } from '@/components/dashboard/StatsGrid';
import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

// Sample data
const stats = [
  {
    name: 'Meals Rescued',
    value: '42',
    icon: <HeartIcon className="h-5 w-5" />,
  },
  {
    name: 'Active Reservations',
    value: '3',
    icon: <ShoppingCartIcon className="h-5 w-5" />,
  },
  {
    name: 'Favorite Vendors',
    value: '8',
    icon: <StarIcon className="h-5 w-5" />,
  },
];

export function ConsumerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your food rescue journey and find new deals.
        </p>
      </div>
      <StatsGrid stats={stats} />
       <div>
        <h2 className="text-lg font-medium text-gray-900">Your Active Reservations</h2>
        <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-500">You have no active reservations.</p>
            <button className="btn-primary mt-4">Find Food</button>
        </div>
      </div>
    </div>
  );
}
