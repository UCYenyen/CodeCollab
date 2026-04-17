import { createAdminClient } from '@/lib/supabase/admin'
import { jsonResponse, optionsResponse } from '@/lib/api/cors'
import { forgotPasswordSchema } from '@/validations/auth'
import type { GameAuthResponse } from '@/types/auth'

export async function OPTIONS() {
  return optionsResponse()
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json()

    const result = forgotPasswordSchema.safeParse(body)
    if (!result.success) {
      const response: GameAuthResponse = {
        success: false,
        error: result.error.errors[0]?.message ?? 'Invalid input',
      }
      return jsonResponse(response, 400)
    }

    const { email } = result.data
    const supabase = createAdminClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      const response: GameAuthResponse = {
        success: false,
        error: error.message,
      }
      return jsonResponse(response, 400)
    }

    // Always return success to prevent email enumeration attacks
    const response: GameAuthResponse = {
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.',
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
