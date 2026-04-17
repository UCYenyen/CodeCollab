import { createClient } from '@supabase/supabase-js'

/**
 * Creates a cookie-free Supabase admin client using the service role key.
 * Use this for server-to-server API calls where browser cookies are unavailable
 * (e.g., Unity WebGL game auth requests).
 *
 * WARNING: This client bypasses Row Level Security. Only use in trusted server code.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
