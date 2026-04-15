import { createClient } from '@/lib/supabase/server'

export async function getUserFromToken(token: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser(token)

  if (error) return null

  return data.user
}