'use client';

import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { PerformanceProvider } from './PerformanceProvider';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { Navbar } from '@/components/layout/Navbar';
import { usePathname } from 'next/navigation';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show landing navbar on dashboard pages or auth pages
  const isDashboardPage = pathname?.startsWith('/dashboard') || pathname?.startsWith('/profile') || pathname?.startsWith('/admin');
  const isAuthPage = pathname?.startsWith('/auth/') && pathname !== '/auth/demo';
  
  const showLandingNavbar = !isDashboardPage && !isAuthPage;

  return (
    <PerformanceProvider>
      <AuthProvider>
        <NotificationProvider>
          <PerformanceMonitor />
          {showLandingNavbar && <Navbar />}
          <main className={showLandingNavbar ? "min-h-screen pt-20" : "min-h-screen"}>
            {children}
          </main>
        </NotificationProvider>
      </AuthProvider>
    </PerformanceProvider>
  );
}