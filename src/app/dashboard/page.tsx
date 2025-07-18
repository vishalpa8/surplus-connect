'use client';

// --- Server-side logic (uncomment for SSR) ---
// import { createServer } from '@/lib/supabase/server'
// import { redirect } from 'next/navigation'
// export default async function Dashboard({ searchParams }: any) {
//   const supabase = await createServer()
//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) return redirect('/login')
//   const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
//   return (
//     <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           <p className="text-muted-foreground">Welcome back, {user.email}</p>
//         </div>
//       </div>
//       {profile?.role === 'vendor' ? <VendorDashboard /> : <UserDashboard />}
//     </div>
//   )
// }

// --- Client-side logic (active) ---
import VendorDashboard from '@/components/dashboard/VendorDashboard'
import UserDashboard from '@/components/dashboard/UserDashboard'
import NgoDashboard from '@/components/dashboard/NgoDashboard'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      setRole(profile?.role || null);
      setLoading(false);
    };
    fetchRole();
  }, [supabase, router]);

  if (loading) {
    return <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </div>
      {role === 'vendor' ? (
        <VendorDashboard />
      ) : role === 'ngo' ? (
        <NgoDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}

