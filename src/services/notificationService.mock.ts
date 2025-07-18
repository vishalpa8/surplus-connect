import { Database } from '@/types/database.types'

export type Notification = Database['public']['Tables']['notifications']['Row']

let notifications: Notification[] = [
  { id: 1, user_id: 'user1', type: 'listing', message: 'New listing near you', data: null, read: false, created_at: new Date().toISOString() },
  { id: 2, user_id: 'vendor1', type: 'reservation', message: 'Your listing was reserved', data: null, read: false, created_at: new Date().toISOString() },
]

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchNotifications(userId: string): Promise<Notification[]> {
  return delay(notifications.filter((n) => n.user_id === userId))
}

export async function markAsRead(id: number): Promise<void> {
  notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
  return delay(undefined)
}

export const _internal = { notifications }
