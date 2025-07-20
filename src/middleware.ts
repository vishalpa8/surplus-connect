import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes for different user roles
const protectedRoutes = {
  vendor: ['/dashboard/vendor'],
  ngo: ['/dashboard/ngo'],
  consumer: ['/dashboard'],
  admin: ['/admin']
};

// Auth pages that logged-in users shouldn't access
const authPages = ['/auth/login', '/auth/register', '/auth/forgot-password'];

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/auth/demo',
  '/listings',
  '/vendors',
  '/ngos',
  '/map'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for user session
  const userCookie = request.cookies.get('surplus_connect_user')?.value;
  let user = null;
  
  try {
    if (userCookie) {
      user = JSON.parse(userCookie);
    }
  } catch (error) {
    // Invalid session, clear cookie
    const response = NextResponse.next();
    response.cookies.delete('surplus_connect_user');
    return response;
  }

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (user && authPages.includes(pathname)) {
    const dashboardUrl = getDashboardUrl(user.role);
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // If no user and trying to access protected routes, redirect to login
  if (!user) {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/admin')) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Check if user is trying to access a role-specific route
  for (const [role, routes] of Object.entries(protectedRoutes)) {
    if (routes.some(route => pathname.startsWith(route))) {
      if (user.role !== role) {
        // Redirect to appropriate dashboard if wrong role
        const dashboardUrl = getDashboardUrl(user.role);
        if (pathname !== dashboardUrl) {
          return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }
      }
    }
  }

  return NextResponse.next();
}

function getDashboardUrl(role: string): string {
  switch (role) {
    case 'vendor':
      return '/dashboard/vendor';
    case 'ngo':
      return '/dashboard/ngo';
    case 'admin':
      return '/admin';
    default:
      return '/dashboard';
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};