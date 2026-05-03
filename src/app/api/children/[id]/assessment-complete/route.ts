import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AssessmentResult } from "@/types/assessment";

interface AssessmentCompleteRequest {
  result: AssessmentResult;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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

    const body: AssessmentCompleteRequest = await req.json();

    const adminClient = createAdminClient();

    const { data: childUser, error: fetchError } = await adminClient.auth.admin.getUserById(id);

    if (fetchError || !childUser) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    const isOwnAssessment = parentUser.id === id;
    const isParentOfChild = childUser.user.user_metadata?.parent_id === parentUser.id;

    if (!isOwnAssessment && !isParentOfChild) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const coinsReward = 10;

    const { error: assessmentError } = await adminClient
      .from("pre_assesment")
      .insert({
        refrence_child: id,
        attention_score: body.result.scores.Attention || 0,
        memory_score: body.result.scores.Memory || 0,
        logic_score: body.result.scores.Logic || 0,
        motoric_score: body.result.scores.Motorik || 0,
        social_score: body.result.scores.Social || 0,
      });

    if (assessmentError) {
      return NextResponse.json({ error: assessmentError.message }, { status: 400 });
    }

    const { error: historyError } = await adminClient
      .from("histories")
      .insert({
        refrence_children: id,
        "coins_ received": coinsReward,
      });

    if (historyError) {
      return NextResponse.json({ error: historyError.message }, { status: 400 });
    }

    const { data: childData, error: childFetchError } = await adminClient
      .from("children")
      .select("coins")
      .eq("id", id)
      .single();

    if (childFetchError) {
      return NextResponse.json({ error: childFetchError.message }, { status: 400 });
    }

    const currentCoins = childData?.coins ?? 0;
    const newCoins = currentCoins + coinsReward;

    const { error: updateError } = await adminClient
      .from("children")
      .update({ coins: newCoins })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, coinsEarned: coinsReward }, { status: 200 });
  } catch (error) {
    console.error("Assessment complete error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
