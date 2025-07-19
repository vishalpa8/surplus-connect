"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  BarChart3,
  Building,
  HeartHandshake,
  Home,
  LogOut,
  Map,
  Menu,
  Settings,
  ShoppingBasket,
  X,
  HandHeart,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['vendor', 'consumer', 'ngo'] },
  { name: 'Listings', href: '/dashboard/listings', icon: ShoppingBasket, roles: ['vendor'] },
  { name: 'Reservations', href: '/dashboard/reservations', icon: HeartHandshake, roles: ['vendor', 'consumer', 'ngo'] },
  { name: 'Find Food', href: '/map', icon: Map, roles: ['consumer', 'ngo'] },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, roles: ['vendor', 'admin'] },
];

const userNavigation = [
  { name: 'Profile', href: '/profile', icon: Settings },
  { name: 'Sign out', href: '#', icon: LogOut, action: 'logout' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const filteredNavigation = navigation.filter(item => user && item.roles.includes(user.role));

  const sidebarContent = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-700 px-6 pb-4">
      <Link href="/" className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary-600 flex-shrink-0">
          <HandHeart size={24} className="h-6 w-6 shrink-0" />
        </div>
        <span className="font-display text-2xl font-bold text-white">
          Surplus<span className="text-primary-200">Connect</span>
        </span>
      </Link>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {filteredNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-200 hover:text-white hover:bg-primary-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        pathname === item.href ? 'text-white' : 'text-primary-300 group-hover:text-white',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
             <ul role="list" className="-mx-2 space-y-1">
                {userNavigation.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            onClick={item.action === 'logout' ? logout : undefined}
                            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-primary-200 hover:bg-primary-800 hover:text-white"
                        >
                            <item.icon className="h-6 w-6 shrink-0 text-primary-300 group-hover:text-white" aria-hidden="true" />
                            {item.name}
                        </Link>
                    </li>
                ))}
             </ul>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <X className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {sidebarContent}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {sidebarContent}
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex flex-1">
                {/* Search bar can go here if needed */}
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Can add notification bell or other items here */}
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}