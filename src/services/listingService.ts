import { createClient } from '@/lib/supabase/client'
import { Listing, NewListing, UpdateListing } from './listingService.mock'

const supabase = createClient()

export async function fetchListingsForVendor(vendorId: string) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('vendor_id', vendorId)
  if (error) throw error
  return data as Listing[]
}

export async function fetchAvailableListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'available')
  if (error) throw error
  return data as Listing[]
}

export async function addListing(vendorId: string, data: NewListing) {
  const { data: inserted, error } = await supabase
    .from('listings')
    .insert({ ...data, vendor_id: vendorId })
    .select()
    .single()
  if (error) throw error
  return inserted as Listing
}

export async function updateListing(id: number, updates: UpdateListing) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Listing
}

export async function deleteListing(id: number) {
  const { error } = await supabase.from('listings').delete().eq('id', id)
  if (error) throw error
  return true
}
