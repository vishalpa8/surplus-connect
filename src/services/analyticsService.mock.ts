interface AnalyticsEvent {
  id: number
  user_id: string
  event_type: string
  meta: Record<string, unknown> | null
  created_at: string
}

const events: AnalyticsEvent[] = [
  { id: 1, user_id: 'vendor1', event_type: 'listing_created', meta: null, created_at: new Date().toISOString() },
  { id: 2, user_id: 'user1', event_type: 'reservation_made', meta: null, created_at: new Date().toISOString() },
]

let nextId = 3

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchEvents(userId: string): Promise<AnalyticsEvent[]> {
  return delay(events.filter((e) => e.user_id === userId))
}

export async function addEvent(userId: string, event_type: string, meta: Record<string, unknown> | null = null): Promise<AnalyticsEvent> {
  const event: AnalyticsEvent = { id: nextId++, user_id: userId, event_type, meta, created_at: new Date().toISOString() }
  events.push(event)
  return delay(event)
}

export const _internal = { events }
