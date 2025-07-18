'use client';

// --- Server-side logic (uncomment for SSR) ---
// import { createServer } from '@/lib/supabase/server';
// import { redirect } from 'next/navigation';
// const ADMIN_EMAIL = 'admin@surplusconnect.org';
// export default async function AdminPage() {
//   const supabase = await createServer();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user || user.email !== ADMIN_EMAIL) return redirect('/');
//   const { data: profiles } = await supabase.from('profiles').select('id, email, role, name, meals_saved, created_at');
//   const { data: listings } = await supabase.from('listings').select('id, name, vendor_id, status, created_at');
//   return (
//     <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
//       ...
//     </div>
//   );
// }

// --- Client-side logic (active) ---
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const ADMIN_EMAIL = 'admin@surplusconnect.org'; // Change this to your admin email

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user && user.email === ADMIN_EMAIL) {
        const { data: profiles } = await supabase.from('profiles').select('id, email, role, name, meals_saved, created_at');
        setProfiles(profiles || []);
        const { data: listings } = await supabase.from('listings').select('id, name, vendor_id, status, created_at');
        setListings(listings || []);
      }
    };
    fetchData();
  }, [supabase]);

  if (!mounted) return null;
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-muted-foreground">You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Admin Dashboard</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">All Users & Vendors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Meals Saved</th>
                <th className="px-4 py-2 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {profiles?.map((profile) => (
                <tr key={profile.id} className="border-b border-border">
                  <td className="px-4 py-2">{profile.name || '-'}</td>
                  <td className="px-4 py-2">{profile.email}</td>
                  <td className="px-4 py-2 capitalize">{profile.role}</td>
                  <td className="px-4 py-2">{profile.meals_saved}</td>
                  <td className="px-4 py-2">{new Date(profile.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">All Listings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Listing Name</th>
                <th className="px-4 py-2 text-left">Vendor</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {listings?.map((listing) => {
                const vendor = profiles?.find((p) => p.id === listing.vendor_id);
                return (
                  <tr key={listing.id} className="border-b border-border">
                    <td className="px-4 py-2">{listing.name}</td>
                    <td className="px-4 py-2">{vendor?.name || vendor?.email || '-'}</td>
                    <td className="px-4 py-2 capitalize">{listing.status}</td>
                    <td className="px-4 py-2">{new Date(listing.created_at).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 