import { createAdminClient } from '@/lib/supabase/admin'
import { jsonResponse, optionsResponse } from '@/lib/api/cors'
import type { GameAuthResponse } from '@/types/auth'

export async function OPTIONS() {
  return optionsResponse()
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      const response: GameAuthResponse = {
        success: false,
        error: 'Missing or invalid Authorization header',
      }
      return jsonResponse(response, 401)
    }

    const supabase = createAdminClient()

    // Verify the token is valid before signing out
    const { data: userData, error: userError } =
      await supabase.auth.getUser(token)

    if (userError || !userData.user) {
      const response: GameAuthResponse = {
        success: false,
        error: userError?.message ?? 'Invalid or expired token',
      }
      return jsonResponse(response, 401)
    }

    // Use admin API to sign out the user by invalidating their sessions
    const { error } = await supabase.auth.admin.signOut(token)

    if (error) {
      const response: GameAuthResponse = {
        success: false,
        error: error.message,
      }
      return jsonResponse(response, 400)
    }

    const response: GameAuthResponse = {
      success: true,
      message: 'Successfully signed out',
    }
    return jsonResponse(response)
  } catch {
    const response: GameAuthResponse = {
      success: false,
      error: 'Internal server error',
    }
    return jsonResponse(response, 500)
  }
}
