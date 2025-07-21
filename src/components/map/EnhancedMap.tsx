'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  Heart,
  Navigation,
  Layers
} from 'lucide-react';

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface FoodListing {
  id: string;
  title: string;
  vendor: string;
  category: string;
  price: number;
  originalPrice: number;
  distance: number;
  rating: number;
  expiresAt: string;
  pickupTime: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image: string;
  dietaryInfo: string[];
}

// Sample data
const sampleListings: FoodListing[] = [
  {
    id: '1',
    title: 'Fresh Croissants & Pastries',
    vendor: 'Green Leaf Bakery',
    category: 'Bakery',
    price: 8.99,
    originalPrice: 15.99,
    distance: 0.3,
    rating: 4.8,
    expiresAt: '2024-01-15T20:00:00Z',
    pickupTime: '17:00 - 19:00',
    location: {
      lat: 43.6532,
      lng: -79.3832,
      address: '123 Queen St W, Toronto'
    },
    image: 'https://source.unsplash.com/400x300/?croissant',
    dietaryInfo: ['Vegetarian']
  },
  {
    id: '2',
    title: 'Organic Vegetable Mix',
    vendor: 'Farm Fresh Market',
    category: 'Produce',
    price: 12.50,
    originalPrice: 22.00,
    distance: 0.7,
    rating: 4.9,
    expiresAt: '2024-01-16T18:00:00Z',
    pickupTime: '16:00 - 18:00',
    location: {
      lat: 43.6482,
      lng: -79.3762,
      address: '456 King St E, Toronto'
    },
    image: 'https://source.unsplash.com/400x300/?vegetables',
    dietaryInfo: ['Vegan', 'Organic']
  },
  {
    id: '3',
    title: 'Gourmet Sandwich Platter',
    vendor: 'Downtown Deli',
    category: 'Prepared Foods',
    price: 18.75,
    originalPrice: 32.00,
    distance: 1.2,
    rating: 4.6,
    expiresAt: '2024-01-15T21:00:00Z',
    pickupTime: '18:00 - 20:00',
    location: {
      lat: 43.6462,
      lng: -79.3902,
      address: '789 Bay St, Toronto'
    },
    image: 'https://source.unsplash.com/400x300/?sandwich',
    dietaryInfo: ['Contains Gluten']
  }
];

const categories = ['All', 'Bakery', 'Produce', 'Prepared Foods', 'Dairy', 'Other'];
const dietaryFilters = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Organic'];

export function EnhancedMap() {
  const [listings, setListings] = useState<FoodListing[]>(sampleListings);
  const [filteredListings, setFilteredListings] = useState<FoodListing[]>(sampleListings);
  const [selectedListing, setSelectedListing] = useState<FoodListing | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([43.6532, -79.3832]); // Toronto

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Filter listings based on search and filters
    let filtered = listings;

    if (searchQuery) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(listing => listing.category === selectedCategory);
    }

    if (selectedDietary !== 'All') {
      filtered = filtered.filter(listing => 
        listing.dietaryInfo.includes(selectedDietary)
      );
    }

    setFilteredListings(filtered);
  }, [listings, searchQuery, selectedCategory, selectedDietary]);

  const calculateDiscount = (original: number, current: number) => {
    return Math.round((1 - current / original) * 100);
  };

  const formatTimeUntilExpiry = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffInHours = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Expires soon';
    if (diffInHours === 1) return '1 hour left';
    return `${diffInHours} hours left`;
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col max-h-1/2 lg:max-h-full">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search food or vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="h-4 w-4" />
              Near Me
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 space-y-3 p-3 bg-gray-50 rounded-lg">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Dietary</label>
                <select
                  value={selectedDietary}
                  onChange={(e) => setSelectedDietary(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1"
                >
                  {dietaryFilters.map(filter => (
                    <option key={filter} value={filter}>{filter}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              {filteredListings.length} listings found
            </p>
            
            <div className="space-y-4">
              {filteredListings.map((listing) => (
                <Card 
                  key={listing.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedListing?.id === listing.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setSelectedListing(listing)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm truncate">
                              {listing.title}
                            </h3>
                            <p className="text-xs text-gray-600">{listing.vendor}</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-2">
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" size="sm">{listing.category}</Badge>
                          {listing.dietaryInfo.slice(0, 1).map(info => (
                            <Badge key={info} variant="success" size="sm">{info}</Badge>
                          ))}
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary-600">${listing.price}</span>
                            <span className="text-xs text-gray-500 line-through">
                              ${listing.originalPrice}
                            </span>
                            <Badge variant="secondary" size="sm">
                              {calculateDiscount(listing.originalPrice, listing.price)}% off
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{listing.distance} km</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{listing.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeUntilExpiry(listing.expiresAt)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-xs text-gray-600">
                            Pickup: {listing.pickupTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 z-0">
          {typeof window !== 'undefined' && (
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* User location marker */}
              {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]}>
                  <Popup>Your Location</Popup>
                </Marker>
              )}
              
              {/* Listing markers */}
              {filteredListings.map((listing) => (
                <Marker
                  key={listing.id}
                  position={[listing.location.lat, listing.location.lng]}
                  eventHandlers={{
                    click: () => setSelectedListing(listing),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{listing.title}</h3>
                      <p className="text-sm text-gray-600">{listing.vendor}</p>
                      <p className="text-sm font-medium text-primary-600">
                        ${listing.price} (was ${listing.originalPrice})
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {listing.location.address}
                      </p>
                      <Button size="sm" className="mt-2 w-full">
                        Reserve Now
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10">
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Selected Listing Detail */}
        {selectedListing && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Image
                    src={selectedListing.image}
                    alt={selectedListing.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedListing.title}
                        </h3>
                        <p className="text-sm text-gray-600">{selectedListing.vendor}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedListing.location.address}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedListing(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-600">
                          ${selectedListing.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${selectedListing.originalPrice}
                        </span>
                        <Badge variant="secondary" size="sm">
                          {calculateDiscount(selectedListing.originalPrice, selectedListing.price)}% off
                        </Badge>
                      </div>
                      <Button size="sm">
                        Reserve Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}