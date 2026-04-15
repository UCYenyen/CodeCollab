import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { EmailOtpType } from '@supabase/supabase-js'

const ALLOWED_OTP_TYPES = [
  'signup',
  'magiclink',
  'recovery',
  'invite',
  'email_change',
] as const satisfies readonly EmailOtpType[]

type AllowedOtpType = (typeof ALLOWED_OTP_TYPES)[number]

function isAllowedOtpType(type: string | null): type is AllowedOtpType {
  return type !== null && ALLOWED_OTP_TYPES.includes(type as AllowedOtpType)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (!tokenHash || !isAllowedOtpType(type)) {
    return NextResponse.redirect(new URL('/auth/error?reason=invalid_callback', req.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  })

  if (error) {
    return NextResponse.redirect(new URL('/auth/error?reason=otp_verification_failed', req.url))
  }

  return NextResponse.redirect(new URL('/success', req.url))
}