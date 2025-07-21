'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  HandHeart, 
  Package, 
  Users, 
  TrendingUp, 
  Heart, 
  Calendar,
  ShoppingBasket,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Search,
  Filter,
  BarChart3,
  UserCheck,
  Truck,
  Clock,
  Star
} from 'lucide-react';

// Role-specific navigation configurations
const navigationConfig = {
  consumer: [
    { name: 'Browse Food', href: '/listings', icon: ShoppingBasket, primary: true },
    { name: 'Map View', href: '/map', icon: MapPin },
    { name: 'My Orders', href: '/orders', icon: Clock },
    { name: 'Favorites', href: '/favorites', icon: Star },
  ],
  vendor: [
    { name: 'My Listings', href: '/vendor/listings', icon: Package, primary: true },
    { name: 'Add Listing', href: '/vendor/add', icon: Plus },
    { name: 'Orders', href: '/vendor/orders', icon: ShoppingBasket },
    { name: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
    { name: 'Customers', href: '/vendor/customers', icon: Users },
  ],
  ngo: [
    { name: 'Available Food', href: '/ngo/available', icon: Search, primary: true },
    { name: 'My Requests', href: '/ngo/requests', icon: Heart },
    { name: 'Distributions', href: '/ngo/distributions', icon: Calendar },
    { name: 'Volunteers', href: '/ngo/volunteers', icon: UserCheck },
    { name: 'Impact', href: '/ngo/impact', icon: TrendingUp },
  ]
};

const quickActions = {
  consumer: [
    { name: 'Find Food Near Me', href: '/listings?nearby=true', icon: MapPin, color: 'bg-blue-500' },
    { name: 'Browse Categories', href: '/categories', icon: Filter, color: 'bg-green-500' },
  ],
  vendor: [
    { name: 'Quick Add Item', href: '/vendor/quick-add', icon: Plus, color: 'bg-blue-500' },
    { name: 'View Orders', href: '/vendor/orders', icon: Truck, color: 'bg-green-500' },
  ],
  ngo: [
    { name: 'Request Food', href: '/ngo/request', icon: Heart, color: 'bg-red-500' },
    { name: 'Schedule Pickup', href: '/ngo/schedule', icon: Calendar, color: 'bg-blue-500' },
  ]
};

interface DashboardNavbarProps {
  title?: string;
  subtitle?: string;
}

export function DashboardNavbar({ title, subtitle }: DashboardNavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const navigation = navigationConfig[user.role] || [];
  const actions = quickActions[user.role] || [];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getDashboardRoute = () => {
    switch (user.role) {
      case 'vendor': return '/dashboard/vendor';
      case 'ngo': return '/dashboard/ngo';
      default: return '/dashboard';
    }
  };

  const getRoleDisplayName = () => {
    switch (user.role) {
      case 'vendor': return 'Business Dashboard';
      case 'ngo': return 'NGO Dashboard';
      default: return 'Consumer Dashboard';
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'vendor': return 'bg-blue-600';
      case 'ngo': return 'bg-purple-600';
      default: return 'bg-green-600';
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left side - Logo and Navigation */}
              <div className="flex items-center">
                <Link href={getDashboardRoute()} className="flex items-center gap-3 mr-8">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getRoleColor()} text-white`}>
                    <HandHeart className="h-5 w-5" />
                  </div>
                  <div className="hidden sm:block">
                    <span className="font-bold text-gray-900 text-lg">SurplusConnect</span>
                    <p className="text-xs text-gray-500">{getRoleDisplayName()}</p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        item.primary 
                          ? 'bg-primary-50 text-primary-700 hover:bg-primary-100' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right side - Quick Actions and User Menu */}
              <div className="flex items-center space-x-4">
                {/* Quick Actions - Desktop */}
                <div className="hidden lg:flex items-center space-x-2">
                  {actions.map((action) => (
                    <Link
                      key={action.name}
                      href={action.href}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-white rounded-lg transition-colors hover:opacity-90 ${action.color}`}
                    >
                      <action.icon className="h-4 w-4" />
                      {action.name}
                    </Link>
                  ))}
                </div>

                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <BellIcon className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </button>

                {/* User Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${getRoleColor()} text-white font-medium text-sm`}>
                      {user.name && user.name[0] ? user.name[0].toUpperCase() : '?'}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${active ? 'bg-gray-50' : ''} flex items-center gap-3 px-4 py-2 text-sm text-gray-700`}
                            >
                              <Settings className="h-4 w-4" />
                              Profile Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/help"
                              className={`${active ? 'bg-gray-50' : ''} flex items-center gap-3 px-4 py-2 text-sm text-gray-700`}
                            >
                              <HelpCircle className="h-4 w-4" />
                              Help & Support
                            </Link>
                          )}
                        </Menu.Item>
                        <div className="border-t border-gray-100">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`${active ? 'bg-gray-50' : ''} flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700`}
                              >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Mobile menu button */}
                <Disclosure.Button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden border-t border-gray-200">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium ${
                    item.primary 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Disclosure.Button>
              ))}
              
              {/* Mobile Quick Actions */}
              <div className="pt-3 border-t border-gray-200 space-y-1">
                <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quick Actions</p>
                {actions.map((action) => (
                  <Disclosure.Button
                    key={action.name}
                    as={Link}
                    href={action.href}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <action.icon className="h-4 w-4" />
                    {action.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}