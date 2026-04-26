import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_OTP_TYPES = [
  "signup",
  "magiclink",
  "recovery",
  "invite",
  "email_change",
] as const satisfies readonly EmailOtpType[];

type AllowedOtpType = (typeof ALLOWED_OTP_TYPES)[number];

function isAllowedOtpType(type: string | null): type is AllowedOtpType {
  return type !== null && ALLOWED_OTP_TYPES.includes(type as AllowedOtpType);
}

async function createCallbackClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}

function getOnboardingRedirect(
  step: number | undefined,
  isSignup: boolean,
  baseUrl: string,
): string {
  if (isSignup || step === 1) return `${baseUrl}/auth/sign-up/child-profile`;
  if (step === 2) return `${baseUrl}/auth/sign-up/complete`;
  return `${baseUrl}/`;
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const isSignup = searchParams.get("signup") === "true";

  if (code) {
    const supabase = await createCallbackClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        new URL("/auth/error?reason=oauth_failed", req.url),
      );
    }

    // For Google OAuth signups, create the parent row server-side using the
    // admin client so it bypasses RLS. upsert+ignoreDuplicates is idempotent.
    if (isSignup && data.user) {
      const admin = createAdminClient();
      const { error: insertError } = await admin
        .from("parents")
        .upsert({ id: data.user.id }, { ignoreDuplicates: true });

      if (insertError) {
        console.error("[callback] parents upsert failed:", insertError);
      }
    }

    const step = data.user?.user_metadata?.onboarding_step;
    return NextResponse.redirect(getOnboardingRedirect(step, isSignup, origin));
  }

  if (tokenHash && isAllowedOtpType(type)) {
    const supabase = await createCallbackClient();
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (error) {
      return NextResponse.redirect(
        new URL("/auth/error?reason=otp_verification_failed", req.url),
      );
    }
    const step = data.user?.user_metadata?.onboarding_step;
    if (type === "signup") {
      return NextResponse.redirect(getOnboardingRedirect(step, true, origin));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.redirect(
    new URL("/auth/error?reason=invalid_callback", req.url),
  );
}
