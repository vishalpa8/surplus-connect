import { useState } from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { Calendar, ShoppingBasket, Clock } from 'lucide-react';

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

  const formatPickupWindow = (window: string | undefined) => {
    if (!window) return 'N/A';
    // This is a simple format, if the window is more complex, this will need to be updated
    return window.replace(/(\d{1,2}:\d{2})/, (match) => {
      const [hour, minute] = match.split(':');
      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const newHour = hourNum % 12 || 12;
      return `${newHour}:${minute} ${ampm}`;
    });
  };

  return (
    <div
      className="card-interactive group flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-100">
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
            <ShoppingBasket className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-4">
        <h3 className="font-display text-xl font-bold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm font-medium text-gray-600">by {vendor}</p>
        
        <div className="mt-4 flex-grow space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <ShoppingBasket className="h-4 w-4" />
            <span>{quantity} available</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{formatPickupWindow(pickupWindow)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Expires: {new Date(expiry).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-4 pt-4">
          <Button 
            className="w-full" 
            onClick={(e) => { e.stopPropagation(); onClick();}}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
