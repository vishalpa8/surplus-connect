'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from './Button';

interface FoodListing {
  id: string;
  name: string;
  vendor: string;
  pickupWindow?: string;
}

interface ReservationConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: FoodListing | null;
}

export function ReservationConfirmModal({ isOpen, onClose, listing }: ReservationConfirmModalProps) {
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
                <div className="p-6 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <Dialog.Title as="h3" className="mt-4 text-2xl font-bold leading-6 text-gray-900">
                    Reservation Confirmed!
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      You have successfully reserved <span className="font-bold">{listing.name}</span> from <span className="font-bold">{listing.vendor}</span>.
                    </p>
                  </div>
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-lg">Pickup Details</h4>
                    <p className="mt-2">
                        <span className="font-bold">Address:</span> 123 Main St, Anytown, USA
                    </p>
                    <p>
                        <span className="font-bold">Pickup Window:</span> {listing.pickupWindow}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Please arrive during the pickup window and show this confirmation on your phone.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button onClick={onClose}>
                    Done
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
