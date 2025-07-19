import { StatsGrid } from '@/components/dashboard/StatsGrid';
import {
  HeartIcon,
  UsersIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

// Sample data
const stats = [
  {
    name: 'Total Meals Received',
    value: '1,250',
    icon: <HeartIcon className="h-5 w-5" />,
  },
  {
    name: 'Partner Vendors',
    value: '15',
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    name: 'Scheduled Pickups',
    value: '5',
    icon: <TruckIcon className="h-5 w-5" />,
  },
];

export function NgoDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">NGO Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your food donations and partnerships.
        </p>
      </div>
      <StatsGrid stats={stats} />
      <div>
        <h2 className="text-lg font-medium text-gray-900">Upcoming Pickups</h2>
        <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-500">You have no upcoming pickups.</p>
            <button className="btn-primary mt-4">Find Donations</button>
        </div>
      </div>
    </div>
  );
}
