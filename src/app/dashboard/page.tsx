import { createServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import VendorDashboard from '@/components/dashboard/VendorDashboard'
import UserDashboard from '@/components/dashboard/UserDashboard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Dashboard({ searchParams }: any) {
  const supabase = await createServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.email}</p>
        </div>
      </div>

      {profile?.role === 'vendor' ? <VendorDashboard /> : <UserDashboard />}
    </div>
  )
}

