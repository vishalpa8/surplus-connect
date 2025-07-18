'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { Button } from '../ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { useTheme } from 'next-themes';
import { Clock, Package, ShoppingCart } from 'lucide-react';

type Listing = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  pickup_window_start: string;
  pickup_window_end: string;
  status: string;
  location: string;
  coords: [number, number];
}

const Map = () => {
  const [listings, setListings] = useState<Listing[]>([])
  const [error, setError] = useState<PostgrestError | null>(null)
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'available')
      
      if (error) {
        setError(error)
      } else {
        const listingsWithCoords = data.map(listing => {
          const [longitude, latitude] = listing.location.replace('POINT(', '').replace(')', '').split(' ').map(Number);
          return {...listing, description: listing.name, coords: [latitude, longitude] as [number, number] }
        })
        setListings(listingsWithCoords)
      }
    }
    fetchListings()
  }, [supabase])

  const handleReserve = async (listingId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Please log in to reserve items.')
      return
    }

    const { error } = await supabase.from('reservations').insert({ listing_id: listingId, consumer_id: user.id })
    if (error) {
      alert('Failed to reserve item: ' + error.message)
    } else {
      alert('Item reserved successfully!')
      // Optimistically update the UI
      setListings(listings.filter(l => l.id !== listingId))
    }
  }

  const position: [number, number] = [51.52, -0.10] // Centered view

  if (!mounted) return null
  if (error) {
    return <div className="p-4 text-destructive-foreground bg-destructive rounded-md">{error.message}</div>
  }

  return (
    <MapContainer center={position} zoom={12} scrollWheelZoom={true} className="h-full w-full rounded-lg shadow-md">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={
          theme === 'dark' 
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        }
      />
      {listings.map((listing) => (
        <Marker key={listing.id} position={listing.coords}>
          <Popup>
            <div className="w-64 space-y-3">
              <div>
                <h3 className="font-bold text-lg text-primary -mb-1">{listing.name}</h3>
                <p className="text-sm text-muted-foreground">{listing.description}</p>
              </div>
              
              <div className="border-t -mx-4 my-2"></div>

              <div className="flex items-center gap-3 text-sm">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Quantity: <strong>{listing.quantity}</strong></span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  {new Date(listing.pickup_window_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(listing.pickup_window_end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {listing.status === 'available' && (
                <Button className="w-full mt-4" size="sm" onClick={() => handleReserve(listing.id)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Reserve Now
                </Button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map

