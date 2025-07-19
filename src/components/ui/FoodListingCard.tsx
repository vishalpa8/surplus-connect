import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface FoodListingCardProps {
  id: string;
  name: string;
  vendor: string;
  expiry: string;
  quantity: number;
  imageUrl: string;
  description?: string;
  pickupWindow?: string;
  onClick: () => void;
}

export function FoodListingCard({
  id,
  name,
  vendor,
  expiry,
  quantity,
  imageUrl,
  description,
  pickupWindow,
  onClick,
}: FoodListingCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="card-interactive group"
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700">Quantity</div>
            <div className="text-gray-600">{quantity}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700">Pickup</div>
            <div className="text-gray-600">{pickupWindow}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="text-sm">
            <div className="font-medium text-gray-900">{vendor}</div>
          </div>
          <button className="btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); onClick();}}>Reserve</button>
        </div>
      </div>
    </div>
  );
}
