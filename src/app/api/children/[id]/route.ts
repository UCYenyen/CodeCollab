import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const serverClient = await createClient();
    const {
      data: { user: parentUser },
      error: sessionError,
    } = await serverClient.auth.getUser();

    if (sessionError || !parentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminClient = createAdminClient();

    // Verify this child belongs to this parent
    const { data: childUser, error: fetchError } = await adminClient.auth.admin.getUserById(params.id);
    
    if (fetchError || !childUser || childUser.user.user_metadata?.parent_id !== parentUser.id) {
      return NextResponse.json({ error: "Child not found or unauthorized" }, { status: 403 });
    }

    // Delete from public.children table first
    await adminClient.from("children").delete().eq("id", params.id);

    // Delete the user account
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(params.id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const serverClient = await createClient();
    
    const {
      data: { user: parentUser },
    } = await serverClient.auth.getUser();

    if (!parentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminClient = createAdminClient();

    // Verify ownership
    const { data: childUser, error: fetchError } = await adminClient.auth.admin.getUserById(params.id);
    if (fetchError || !childUser || childUser.user.user_metadata?.parent_id !== parentUser.id) {
      return NextResponse.json({ error: "Child not found or unauthorized" }, { status: 403 });
    }

    // Update metadata
    const newMetadata = { ...childUser.user.user_metadata };
    if (body.childName) newMetadata.display_name = body.childName;
    if (body.gender) newMetadata.gender = body.gender;
    if (body.avatar) newMetadata.avatar = body.avatar;
    if (body.difficulty) newMetadata.child_difficulty = body.difficulty;

    const { error: updateAuthError } = await adminClient.auth.admin.updateUserById(params.id, {
      user_metadata: newMetadata,
      ...(body.childPassword ? { password: body.childPassword } : {})
    });

    if (updateAuthError) {
      return NextResponse.json({ error: updateAuthError.message }, { status: 400 });
    }

    // Update public.children table if needed
    const childrenUpdates: any = {};
    if (body.gender) childrenUpdates.gender = body.gender;
    if (body.dateOfBirth) childrenUpdates.date_of_birth = body.dateOfBirth;

    if (Object.keys(childrenUpdates).length > 0) {
      const { error: dbError } = await adminClient
        .from("children")
        .update(childrenUpdates)
        .eq("id", params.id);
        
      if (dbError) {
         return NextResponse.json({ error: dbError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
