import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  const { email, password, fullName } = await req.json()

  const admin = createAdminClient()

  // 1. Create the auth user via the admin API
  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name: fullName, onboarding_step: 1 },
    email_confirm: false,
  })

  if (authError) {
    console.error('[signup] auth.admin.createUser failed:', authError)
    return NextResponse.json({ error: authError.message }, { status: 400 })
  }

  const userId = authData.user.id
  console.log('[signup] auth user created:', userId)

  // 2. Insert a matching row in the parents table (FK → auth.users.id)
  const { error: insertError } = await admin
    .from('parents')
    .insert({ id: userId })

  if (insertError) {
    console.error('[signup] parents insert failed:', insertError)
    // Roll back the orphaned auth user
    await admin.auth.admin.deleteUser(userId)
    return NextResponse.json(
      {
        error: insertError.message,
        details: {
          code: insertError.code,
          hint: insertError.hint,
          details: insertError.details,
        },
      },
      { status: 500 },
    )
  }

  console.log('[signup] parents row inserted for user:', userId)
  return NextResponse.json({
    message: 'Account created. Check your email for confirmation.',
    userId,
  })
}