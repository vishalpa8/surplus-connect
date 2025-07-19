'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { VendorDashboard } from '@/components/dashboard/VendorDashboard';
import { ConsumerDashboard } from '@/components/dashboard/ConsumerDashboard';
import { NgoDashboard } from '@/components/dashboard/NgoDashboard';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    switch (user?.role) {
      case 'vendor':
        return <VendorDashboard />;
      case 'consumer':
        return <ConsumerDashboard />;
      case 'ngo':
        return <NgoDashboard />;
      default:
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to SurplusConnect</h1>
            <p className="mt-2 text-gray-600">
              It looks like your role isn't set. Please contact support.
            </p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}
