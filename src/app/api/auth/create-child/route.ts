import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { childProfileSchema } from "@/validations/auth";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const result = childProfileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    const {
      childName,
      gender,
      dateOfBirth,
      avatar,
      childEmail,
      childPassword,
      difficulty,
    } = result.data;

    const serverClient = await createClient();
    const {
      data: { user: parentUser },
      error: sessionError,
    } = await serverClient.auth.getUser();
    if (sessionError || !parentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminClient = createAdminClient();
    const {
      data: { user: childUser },
      error: createError,
    } = await adminClient.auth.admin.createUser({
      email: childEmail,
      password: childPassword,
      email_confirm: true,
      user_metadata: {
        role: "child",
        display_name: childName,
        parent_id: parentUser.id,
        child_name: childName,
        child_gender: gender,
        child_avatar: avatar,
        child_difficulty: difficulty,
      },
    });

    if (createError || !childUser) {
      return NextResponse.json(
        { error: createError?.message ?? "Failed to create child user" },
        { status: 400 },
      );
    }

    const { error: insertError } = await adminClient
      .from("children")
      .insert({ id: childUser.id, coins: 0, date_of_birth: dateOfBirth });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    const { error: updateError } = await serverClient.auth.updateUser({
      data: { onboarding_step: 2 },
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
