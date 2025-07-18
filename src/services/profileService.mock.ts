import { Database } from '@/types/database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']

const profiles: Profile[] = [
  { id: 'vendor1', name: 'The Corner Cafe', role: 'vendor', meals_saved: 12, created_at: new Date().toISOString(), avatar_url: null },
  { id: 'vendor2', name: 'Downtown Bakery', role: 'vendor', meals_saved: 5, created_at: new Date().toISOString(), avatar_url: null },
  { id: 'user1', name: 'Jane Doe', role: 'user', meals_saved: 3, created_at: new Date().toISOString(), avatar_url: null },
  { id: 'user2', name: 'John Smith', role: 'user', meals_saved: 1, created_at: new Date().toISOString(), avatar_url: null },
  { id: 'ngo1', name: 'Helping Hands NGO', role: 'ngo', meals_saved: 20, created_at: new Date().toISOString(), avatar_url: null },
]

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchProfile(id: string): Promise<Profile | null> {
  return delay(profiles.find((p) => p.id === id) || null)
}

export const _internal = { profiles }
