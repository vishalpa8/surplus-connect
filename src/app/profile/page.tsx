'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DashboardNavbar } from '@/components/layout/DashboardNavbar';
import { User, Mail, Phone, MapPin, Building, Edit, Save, X, Shield, Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PhoneInput } from '@/components/ui/PhoneInput';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567', // Mock data
    address: '123 Main Street', // Mock data
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  if (!user) {
    return null;
  }

  if (!user) {
    return null;
  }

  const getRoleColor = () => {
    switch (user.role) {
      case 'vendor': return 'bg-blue-600';
      case 'ngo': return 'bg-purple-600';
      default: return 'bg-green-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <>
            {/* Profile Header */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 ${getRoleColor()} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                  {(user?.name?.[0] ?? '?').toUpperCase()}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      user.role === 'vendor' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'ngo' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Member since {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      leftIcon={<User className="h-4 w-4" />}
                    />

                    <Input
                      label="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      leftIcon={<Mail className="h-4 w-4" />}
                    />

                    <PhoneInput
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />

                    <Input
                      label="Address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                      leftIcon={<MapPin className="h-4 w-4" />}
                    />

                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      disabled={!isEditing}
                      leftIcon={<Building className="h-4 w-4" />}
                    />

                    <Input
                      label="State/Province"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      disabled={!isEditing}
                    />

                    <Input
                      label="ZIP/Postal Code"
                      value={formData.zipCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                      disabled={!isEditing}
                    />

                    <Input
                      label="Country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Account Stats & Settings */}
              <div className="space-y-6">
                {/* Account Stats */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Account Statistics</h3>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">
                        {user.role === 'vendor' ? '23' : user.role === 'ngo' ? '156' : '12'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {user.role === 'vendor' ? 'Active Listings' : user.role === 'ngo' ? 'Items Received' : 'Items Rescued'}
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {user.role === 'vendor' ? '$1,247' : user.role === 'ngo' ? '1,247' : '$89'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {user.role === 'vendor' ? 'Revenue' : user.role === 'ngo' ? 'People Served' : 'Money Saved'}
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {user.role === 'vendor' ? '4.9' : user.role === 'ngo' ? '89%' : '4.8'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {user.role === 'vendor' ? 'Rating' : user.role === 'ngo' ? 'Distribution Rate' : 'Rating'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">Security</h4>
                          <p className="text-sm text-gray-600">Password & 2FA</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">Notifications</h4>
                          <p className="text-sm text-gray-600">Email & push settings</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Trash2 className="h-5 w-5 text-red-500" />
                        <div>
                          <h4 className="font-medium text-red-900">Delete Account</h4>
                          <p className="text-sm text-red-600">Permanently remove account</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-100">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}