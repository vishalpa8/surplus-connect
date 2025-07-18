'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface EditListingFormProps {
  listing: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditListingForm({ listing, onSuccess, onCancel }: EditListingFormProps) {
  const [name, setName] = useState(listing.name)
  const [quantity, setQuantity] = useState(listing.quantity)
  const [pickupStart, setPickupStart] = useState(new Date(listing.pickup_window_start).toISOString().slice(0, 16))
  const [pickupEnd, setPickupEnd] = useState(new Date(listing.pickup_window_end).toISOString().slice(0, 16))
  const [location, setLocation] = useState(listing.location.replace('POINT(', '').replace(')', '').split(' ').reverse().join(', '))
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!name || !quantity || !pickupStart || !pickupEnd || !location) {
      setError('Please fill out all fields.')
      setLoading(false)
      return
    }

    const [latitude, longitude] = location.split(',').map(s => parseFloat(s.trim()));
    if (isNaN(latitude) || isNaN(longitude)) {
        setError('Invalid location format. Please use "latitude, longitude".')
        setLoading(false)
        return
    }

    const { error: updateError } = await supabase.from('listings').update({
      name,
      quantity: parseInt(quantity),
      pickup_window_start: new Date(pickupStart).toISOString(),
      pickup_window_end: new Date(pickupEnd).toISOString(),
      location: `POINT(${longitude} ${latitude})`,
    }).eq('id', listing.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Listing</CardTitle>
          <CardDescription>Update the details for your surplus item below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupStart">Pickup Window Start</Label>
                <Input id="pickupStart" type="datetime-local" value={pickupStart} onChange={(e) => setPickupStart(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupEnd">Pickup Window End</Label>
                <Input id="pickupEnd" type="datetime-local" value={pickupEnd} onChange={(e) => setPickupEnd(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (Latitude, Longitude)</Label>
              <Input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Listing'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
