'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { BadgeCard } from '@/components/ui/BadgeCard';
import { Award, Bell, CreditCard, Edit, Heart, User } from 'lucide-react';
import Image from 'next/image';

const badges = [
  { name: 'First Rescue', description: 'Reserved your first meal', icon: <Heart />, isUnlocked: true },
  { name: 'Community Helper', description: 'Rescued 10+ meals', icon: <Heart />, isUnlocked: true },
  { name: 'Good Samaritan', description: 'Rescued 50+ meals', icon: <Heart />, isUnlocked: false },
  { name: 'Vendor Verifier', description: 'First vendor listing', icon: <Award />, isUnlocked: true },
  { name: 'Top Contributor', description: 'Listed 20+ items', icon: <Award />, isUnlocked: false },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">Manage your personal information, settings, and achievements.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-8 rounded-2xl shadow-soft-lg">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden">
                {/* Placeholder for avatar */}
                <User className="h-full w-full text-gray-400 p-4" />
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <span className="badge-primary mt-2">{user?.role}</span>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'secondary' : 'outline'}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
          
          {isEditing && (
            <form className="mt-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id="name" label="Full Name" defaultValue={user?.name} />
                <Input id="email" label="Email Address" defaultValue={user?.email} type="email" />
              </div>
              <Input id="location" label="Location" placeholder="Anytown, USA" />
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </form>
          )}
        </div>

        {/* Badge Wall */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Badge Wall</h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map(badge => (
              <BadgeCard key={badge.name} {...badge} />
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            </div>
            {/* Subscription */}
            <div className="bg-white p-8 rounded-2xl shadow-soft-lg">
                <h3 className="text-xl font-bold flex items-center gap-2"><CreditCard /> Subscription</h3>
                <p className="mt-2 text-gray-600">You are currently on the <span className="font-bold text-primary-600">Free Plan</span>.</p>
                <Button variant="secondary" className="mt-4">Upgrade to Pro</Button>
            </div>
            {/* Notifications */}
            <div className="bg-white p-8 rounded-2xl shadow-soft-lg">
                <h3 className="text-xl font-bold flex items-center gap-2"><Bell /> Notification Preferences</h3>
                <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="new-listings" className="text-gray-700">New listings in your area</label>
                        <input type="checkbox" id="new-listings" className="form-checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="reservation-updates" className="text-gray-700">Reservation updates</label>
                        <input type="checkbox" id="reservation-updates" className="form-checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="newsletter" className="text-gray-700">Newsletter and updates</label>
                        <input type="checkbox" id="newsletter" className="form-checkbox" />
                    </div>
                </div>
            </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
