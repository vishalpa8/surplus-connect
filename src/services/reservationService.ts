import { createClient } from '@/lib/supabase/client'
import { Reservation } from './reservationService.mock'

const supabase = createClient()

export async function fetchReservationsForUser(userId: string) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('consumer_id', userId)
  if (error) throw error
  return data as Reservation[]
}

export async function addReservation(listingId: number, consumerId: string) {
  const { data, error } = await supabase
    .from('reservations')
    .insert({ listing_id: listingId, consumer_id: consumerId })
    .select()
    .single()
  if (error) throw error
  return data as Reservation
}
