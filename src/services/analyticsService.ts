import { createClient } from '@/lib/supabase/client'
import { AnalyticsEvent } from './analyticsService.mock'

const supabase = createClient()

export async function fetchEvents(userId: string) {
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data as AnalyticsEvent[]
}

export async function addEvent(userId: string, event_type: string, meta: Record<string, unknown> | null = null) {
  const { data, error } = await supabase
    .from('analytics')
    .insert({ user_id: userId, event_type, meta })
    .select()
    .single()
  if (error) throw error
  return data as AnalyticsEvent
}
