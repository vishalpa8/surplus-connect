'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map/Map').then(mod => mod.Map), { ssr: false });
import { FoodListingCard } from '@/components/ui/FoodListingCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';
import { Filter } from '@/components/ui/Filter';
import { FoodDetailModal } from '@/components/ui/FoodDetailModal';
import { ReservationConfirmModal } from '@/components/ui/ReservationConfirmModal';

// Sample data
const listings = [
    {
        id: '1',
        imageUrl: "/images/food/croissant.svg",
        name: "Fresh Croissants",
        vendor: "Bakery Delights",
        expiry: "2023-12-25",
        quantity: 10,
        description: "Delicious, buttery croissants baked fresh this morning. Perfect for breakfast or a snack.",
        pickupWindow: "Today, 4 PM - 6 PM",
    },
    {
        id: '2',
        imageUrl: "/images/food/pizza.svg",
        name: "Leftover Pizza Slices",
        vendor: "Pizza Planet",
        expiry: "2023-12-26",
        quantity: 5,
        description: "A mix of pepperoni and cheese pizza slices from our lunch rush. Still hot and tasty!",
        pickupWindow: "Today, 8 PM - 9 PM",
    },
    {
        id: '3',
        imageUrl: "/images/food/salad.svg",
        name: "Fresh Salad Mix",
        vendor: "Green Grocer",
        expiry: "2023-12-25",
        quantity: 15,
        description: "A variety of fresh, organic salad greens, washed and ready to eat. Includes a light vinaigrette.",
        pickupWindow: "Today, 1 PM - 3 PM",
    }
];

export default function ListingsPage() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleCardClick = (listing: any) => {
    setSelectedListing(listing);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedListing(null);
  };

  const handleReserve = () => {
    setIsDetailModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedListing(null);
  };

  return (
    <div className="bg-accent">
      <Navbar />
      <main className="py-20 sm:py-28">
        <div className="container-custom space-y-8">
            <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Food Near You</h1>
            <p className="mt-2 text-gray-600">
                Explore the map to discover surplus food listings in your area.
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <Filter />
              </div>
              <div className="lg:col-span-3 space-y-8">
                <div className="h-[500px] w-full">
                  <Map />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Available Now</h2>
                  <div className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {listings.map((listing) => (
                      <FoodListingCard 
                        key={listing.id} 
                        {...listing} 
                        onClick={() => handleCardClick(listing)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
      <FoodDetailModal 
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onReserve={handleReserve}
        listing={selectedListing}
      />
      <ReservationConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        listing={selectedListing}
      />
    </div>
  );
}
