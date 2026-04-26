import { createAdminClient } from "@/lib/supabase/admin";
import { jsonResponse, optionsResponse } from "@/lib/api/cors";
import { signUpSchema } from "@/validations/auth";
import type { GameAuthResponse } from "@/types/auth";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    const result = signUpSchema.safeParse(body);
    if (!result.success) {
      const response: GameAuthResponse = {
        success: false,
        error: result.error.errors[0]?.message ?? "Invalid input",
      };
      return jsonResponse(response, 400);
    }

    const { email, password } = result.data;
    const supabase = createAdminClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      const response: GameAuthResponse = {
        success: false,
        error: error.message,
      };
      return jsonResponse(response, 400);
    }

    const response: GameAuthResponse = {
      success: true,
      message: "Account created. Check your email for confirmation.",
      user: data.user
        ? { id: data.user.id, email: data.user.email }
        : undefined,
    };
    return jsonResponse(response, 201);
  } catch {
    const response: GameAuthResponse = {
      success: false,
      error: "Internal server error",
    };
    return jsonResponse(response, 500);
  }
}
