'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface AddListingFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddListingForm({ onSuccess, onCancel }: AddListingFormProps) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [pickupStart, setPickupStart] = useState('')
  const [pickupEnd, setPickupEnd] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('You must be logged in to create a listing.')
      setLoading(false)
      return
    }

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

    const { error: insertError } = await supabase.from('listings').insert({
      vendor_id: user.id,
      name,
      quantity: parseInt(quantity),
      pickup_window_start: new Date(pickupStart).toISOString(),
      pickup_window_end: new Date(pickupEnd).toISOString(),
      location: `POINT(${longitude} ${latitude})`,
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Listing</CardTitle>
          <CardDescription>Fill out the details below to list a new surplus item.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Sourdough Loaf" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 5" />
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
              <Input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 40.7128, -74.0060" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Listing'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
