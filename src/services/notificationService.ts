import { createClient } from '@/lib/supabase/client'
import { Notification } from './notificationService.mock'

const supabase = createClient()

export async function fetchNotifications(userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data as Notification[]
}

export async function markAsRead(id: number) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id)
  if (error) throw error
}
