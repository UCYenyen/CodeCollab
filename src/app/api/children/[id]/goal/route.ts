import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface GoalRequest {
  weeklyGoal: number;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const serverClient = await createClient();
    const {
      data: { user: parentUser },
      error: sessionError,
    } = await serverClient.auth.getUser();

    if (sessionError || !parentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: GoalRequest = await req.json();

    if (typeof body.weeklyGoal !== "number" || body.weeklyGoal < 0) {
      return NextResponse.json({ error: "Invalid goal value" }, { status: 400 });
    }

    const adminClient = createAdminClient();

    const { data: childUser, error: fetchError } =
      await adminClient.auth.admin.getUserById(id);

    if (fetchError || !childUser) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    if (childUser.user.user_metadata?.parent_id !== parentUser.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { error: updateError } = await adminClient.auth.admin.updateUserById(id, {
      user_metadata: {
        ...childUser.user.user_metadata,
        weekly_goal: body.weeklyGoal,
      },
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, weeklyGoal: body.weeklyGoal });
  } catch (error) {
    console.error("Goal update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
