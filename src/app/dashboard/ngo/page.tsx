'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardNavbar } from '@/components/layout/DashboardNavbar';
import { Users, Heart, TrendingUp, MapPin, Calendar, Package, Phone, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function NGODashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Mock data for NGO
  const availableDonations = [
    {
      id: 1,
      vendor: 'Corner Bakery',
      items: 'Fresh Bread & Pastries',
      quantity: '20 items',
      distance: '0.8 miles',
      expires: '2 hours',
      contact: '+1 (555) 123-4567',
      urgency: 'high'
    },
    {
      id: 2,
      vendor: 'Green Market',
      items: 'Organic Vegetables',
      quantity: '15 kg',
      distance: '1.2 miles',
      expires: '4 hours',
      contact: '+1 (555) 987-6543',
      urgency: 'medium'
    },
    {
      id: 3,
      vendor: 'City Restaurant',
      items: 'Prepared Meals',
      quantity: '12 portions',
      distance: '2.1 miles',
      expires: '1 hour',
      contact: '+1 (555) 456-7890',
      urgency: 'high'
    }
  ];

  const upcomingDistributions = [
    {
      id: 1,
      event: 'Weekly Food Distribution',
      location: 'Community Center',
      date: 'Today, 3:00 PM',
      volunteers: 8,
      expectedBeneficiaries: 45,
      status: 'confirmed'
    },
    {
      id: 2,
      event: 'Senior Center Delivery',
      location: 'Sunset Senior Home',
      date: 'Tomorrow, 10:00 AM',
      volunteers: 4,
      expectedBeneficiaries: 25,
      status: 'needs_volunteers'
    }
  ];

  const impactStats = [
    { label: 'People Served This Month', value: '1,247', change: '+12%' },
    { label: 'Food Rescued (kg)', value: '342', change: '+8%' },
    { label: 'Active Volunteers', value: '28', change: '+3%' },
    { label: 'Distribution Rate', value: '89%', change: '+5%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Coordinate food rescue operations and serve your community.</p>
            </div>
            <Link href="/ngo/request">
              <Button className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Request Food Donation
              </Button>
            </Link>
          </div>
        </div>

        {/* Urgent Alerts */}
        <div className="mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Urgent: Food Expiring Soon</h3>
                <p className="text-sm text-red-700">2 donations expire within 2 hours. Immediate pickup required.</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                View Details
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Donations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Available Donations</h2>
                  <Link href="/ngo/available">
                    <Button size="sm" variant="outline">View All</Button>
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {availableDonations.map((donation) => (
                    <div key={donation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900">{donation.items}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              donation.urgency === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {donation.urgency === 'high' ? 'Urgent' : 'Medium'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{donation.vendor} • {donation.quantity}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {donation.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Expires in {donation.expires}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {donation.contact}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                          <Button size="sm">
                            Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Distributions & Quick Actions */}
          <div className="space-y-6">
            {/* Upcoming Distributions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Distributions</h3>
              <div className="space-y-4">
                {upcomingDistributions.map((distribution) => (
                  <div key={distribution.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{distribution.event}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        distribution.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {distribution.status === 'confirmed' ? 'Ready' : 'Need Help'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{distribution.location}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {distribution.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {distribution.volunteers} volunteers
                        </span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        ~{distribution.expectedBeneficiaries} people
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/ngo/distributions">
                <Button variant="outline" className="w-full mt-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Distributions
                </Button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/ngo/request">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Request Food</h4>
                      <p className="text-sm text-gray-600">Find available donations</p>
                    </div>
                  </div>
                </Link>

                <Link href="/ngo/schedule">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Schedule Pickup</h4>
                      <p className="text-sm text-gray-600">Coordinate collection</p>
                    </div>
                  </div>
                </Link>

                <Link href="/ngo/volunteers">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Manage Volunteers</h4>
                      <p className="text-sm text-gray-600">Team coordination</p>
                    </div>
                  </div>
                </Link>

                <Link href="/ngo/impact">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Impact Reports</h4>
                      <p className="text-sm text-gray-600">Community metrics</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}