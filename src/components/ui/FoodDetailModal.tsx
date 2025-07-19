'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './Button';

interface FoodListing {
  id: string;
  name: string;
  vendor: string;
  expiry: string;
  quantity: number;
  imageUrl: string;
  description?: string;
  pickupWindow?: string;
  dietary?: {
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
  };
}

interface FoodDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserve: () => void;
  listing: FoodListing | null;
}

export function FoodDetailModal({ isOpen, onClose, onReserve, listing }: FoodDetailModalProps) {
  if (!listing) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="p-6">
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                        <Image src={listing.imageUrl} alt={listing.name} layout="fill" objectFit="cover" />
                    </div>
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                    {listing.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{listing.description}</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p><span className="font-bold">Vendor:</span> {listing.vendor}</p>
                    <p><span className="font-bold">Quantity:</span> {listing.quantity}</p>
                    <p><span className="font-bold">Expires:</span> {new Date(listing.expiry).toLocaleString()}</p>
                    <p><span className="font-bold">Pickup:</span> {listing.pickupWindow}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button onClick={onReserve}>
                    Reserve
                  </Button>
                  <Button variant="outline" onClick={onClose} className="mr-2">
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
