import { createClient } from '@/lib/supabase/client'
import { Profile } from './profileService.mock'

const supabase = createClient()

export async function fetchProfile(id: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single()
  if (error) throw error
  return data as Profile
}
