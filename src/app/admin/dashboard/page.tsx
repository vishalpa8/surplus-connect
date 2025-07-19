import AdminLayout from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { Users, ShoppingBasket, BarChart3, HandHeart } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of the platform's activity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value="1,234" change="+5.4%" changeType="increase" icon={<Users />} />
          <StatCard title="Total Listings" value="5,678" change="+12.1%" changeType="increase" icon={<ShoppingBasket />} />
          <StatCard title="Meals Saved" value="12,345" change="+8.2%" changeType="increase" icon={<HandHeart />} />
          <StatCard title="Active Sessions" value="345" change="-2.3%" changeType="decrease" icon={<BarChart3 />} />
        </div>
        {/* Here you could add more components like recent activity feeds or charts */}
      </div>
    </AdminLayout>
  );
}
