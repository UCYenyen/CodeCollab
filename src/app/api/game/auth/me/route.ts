import { createAdminClient } from '@/lib/supabase/admin'
import { jsonResponse, optionsResponse } from '@/lib/api/cors'
import type { GameAuthResponse } from '@/types/auth'

export async function OPTIONS() {
  return optionsResponse()
}

export async function GET(req: Request) {
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

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      const response: GameAuthResponse = {
        success: false,
        error: error?.message ?? 'Invalid or expired token',
      }
      return jsonResponse(response, 401)
    }

    const response: GameAuthResponse = {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
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
