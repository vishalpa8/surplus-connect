'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { HandHeart, Building, HeartHandshake, Search, Info, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Navigation links
const publicNavigation = [
  { name: 'For Vendors', href: '/vendors', icon: Building },
  { name: 'For NGOs', href: '/ngos', icon: HeartHandshake },
  { name: 'Pricing', href: '/pricing', icon: DollarSign },
  { name: 'About', href: '/about', icon: Info },
];

const consumerNavigation = [
  { name: 'Find Food', href: '/listings', icon: Search },
  { name: 'My Reservations', href: '/dashboard/reservations', icon: Info },
  { name: 'Map', href: '/map', icon: Info },
];

const vendorNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Info },
  { name: 'Listings', href: '/dashboard/listings', icon: Info },
  { name: 'Analytics', href: '/dashboard/analytics', icon: Info },
];

const ngoNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Info },
  { name: 'Find Food', href: '/listings', icon: Search },
  { name: 'Requests', href: '/dashboard/requests', icon: Info },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getNavigation = () => {
    if (!user) return publicNavigation;
    switch (user.role) {
      case 'consumer': return consumerNavigation;
      case 'vendor': return vendorNavigation;
      case 'ngo': return ngoNavigation;
      default: return publicNavigation;
    }
  };

  const navigation = getNavigation();

  return (
    <Disclosure as="nav" className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-lg border-b border-gray-100">
      {({ open }) => (
        <>
          <Container size="xl" className="w-full">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" className="flex items-center gap-3 text-xl font-bold">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white flex-shrink-0">
                      <HandHeart size={24} className="h-6 w-6 shrink-0" />
                    </div>
                    <span className="font-display text-2xl font-bold text-gray-800">
                      Surplus<span className="text-primary-600">Connect</span>
                    </span>
                  </Link>
                </div>
                
                <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group relative px-1 py-2 text-base font-medium text-gray-600 transition-colors hover:text-primary-600 flex items-center gap-2"
                    >
                      {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                      {item.name}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200/80 transition-all hover:bg-gray-50 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700">
                        {user.name && user.name[0] ? user.name[0].toUpperCase() : '?'}
                      </div>
                      <span>{user.name}</span>
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-3 text-base text-gray-700 transition-colors hover:bg-primary-50`}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-3 text-base text-gray-700 transition-colors hover:bg-primary-50`}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block w-full px-4 py-3 text-left text-base text-gray-700 transition-colors hover:bg-primary-50`}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="space-x-3">
                    <Link href="/auth/login">
                      <Button variant="outline" size="md">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button size="md">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-xl p-2 text-gray-500 transition-colors hover:bg-primary-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </Container>

          <Disclosure.Panel className="sm:hidden border-t border-gray-200/80 bg-white/95">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            
            {user ? (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">
                      {user.name && user.name[0] ? user.name[0].toUpperCase() : '?'}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-bold text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500 capitalize">{user.role}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-4">
                  <Disclosure.Button
                    as={Link}
                    href="/dashboard"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700"
                  >
                    Dashboard
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    href="/profile"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700"
                  >
                    Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pb-3 pt-4 px-4 space-y-3">
                <Link href="/auth/login" className="block">
                  <Button variant="outline" className="w-full" size="md">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/register" className="block">
                  <Button className="w-full" size="md">Get Started</Button>
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
