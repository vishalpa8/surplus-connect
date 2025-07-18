import { Database } from '@/types/database.types'

export type Reservation = Database['public']['Tables']['reservations']['Row']

let reservations: Reservation[] = [
  { id: 1, listing_id: 1, consumer_id: 'user1', status: 'active', created_at: new Date().toISOString() },
  { id: 2, listing_id: 2, consumer_id: 'ngo1', status: 'completed', created_at: new Date().toISOString() },
]

let nextId = 3

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchReservationsForUser(userId: string): Promise<Reservation[]> {
  return delay(reservations.filter((r) => r.consumer_id === userId))
}

export async function addReservation(listingId: number, consumerId: string): Promise<Reservation> {
  const reservation: Reservation = {
    id: nextId++,
    listing_id: listingId,
    consumer_id: consumerId,
    status: 'active',
    created_at: new Date().toISOString(),
  }
  reservations.push(reservation)
  return delay(reservation)
}

export const _internal = { reservations }
