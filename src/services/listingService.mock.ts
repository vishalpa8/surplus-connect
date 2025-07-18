import { Database } from '@/types/database.types'

export type Listing = Database['public']['Tables']['listings']['Row']

interface NewListing extends Omit<Database['public']['Tables']['listings']['Insert'], 'id' | 'created_at'> {}
interface UpdateListing extends Partial<NewListing> {}

const sampleVendors = [
  { id: 'vendor1', name: 'The Corner Cafe' },
  { id: 'vendor2', name: 'Downtown Bakery' },
]

let listings: Listing[] = [
  {
    id: 1,
    vendor_id: 'vendor1',
    name: 'Leftover Pizza Slices',
    description: 'Assorted slices from today\'s batches.',
    quantity: '8',
    expiry_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    pickup_window_start: new Date().toISOString(),
    pickup_window_end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    image_url: null,
    location: 'POINT(77.5946 12.9716)',
    status: 'available',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    vendor_id: 'vendor2',
    name: 'Veggie Soup Quarts',
    description: 'Hearty vegetable soup ready for pickup.',
    quantity: '5',
    expiry_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    pickup_window_start: new Date().toISOString(),
    pickup_window_end: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    image_url: null,
    location: 'POINT(78.4867 17.3850)',
    status: 'available',
    created_at: new Date().toISOString(),
  },
]

let nextId = 3

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchListingsForVendor(vendorId: string): Promise<Listing[]> {
  return delay(listings.filter((l) => l.vendor_id === vendorId))
}

export async function fetchAvailableListings(): Promise<Listing[]> {
  return delay(listings.filter((l) => l.status === 'available'))
}

export async function addListing(vendorId: string, data: NewListing): Promise<Listing> {
  const listing: Listing = {
    id: nextId++,
    created_at: new Date().toISOString(),
    vendor_id: vendorId,
    status: 'available',
    image_url: null,
    ...data,
  }
  listings.push(listing)
  return delay(listing)
}

export async function updateListing(id: number, updates: UpdateListing): Promise<Listing | null> {
  const index = listings.findIndex((l) => l.id === id)
  if (index === -1) return delay(null)
  listings[index] = { ...listings[index], ...updates }
  return delay(listings[index])
}

export async function deleteListing(id: number): Promise<boolean> {
  const lengthBefore = listings.length
  listings = listings.filter((l) => l.id !== id)
  return delay(listings.length < lengthBefore)
}

export const _internal = { listings, sampleVendors }
