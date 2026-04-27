import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { EditChildForm } from "@/components/features/dashboard/edit-child-form";
import { Settings } from "lucide-react";

export default async function EditChildPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user: parentUser } } = await supabase.auth.getUser();

  if (!parentUser) redirect("/auth/sign-in");

  const adminClient = createAdminClient();

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(params.id);
  if (!isUUID) {
    redirect("/dashboard");
  }

  // Fetch from auth.users
  const { data: childUser, error: childError } = await adminClient.auth.admin.getUserById(params.id);

  if (childError || !childUser || childUser.user.user_metadata?.parent_id !== parentUser.id) {
    redirect("/dashboard");
  }

  // Fetch from public.children
  const { data: childRow } = await adminClient
    .from("children")
    .select("date_of_birth, gender")
    .eq("id", params.id)
    .single();

  const defaultValues = {
    childName: childUser.user.user_metadata?.display_name || "",
    gender: childRow?.gender || "Male",
    dateOfBirth: childRow?.date_of_birth || "",
    difficulty: childUser.user.user_metadata?.child_difficulty || "intermediate",
  };

  return (
    <div className="space-y-8 px-8 py-8">
      <div>
        <h1 className="font-display text-3xl text-navy flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Edit <span className="text-primary">{defaultValues.childName}'s</span> Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the settings and information for this child.
        </p>
      </div>

      <div className="max-w-2xl">
        <EditChildForm childId={params.id} defaultValues={defaultValues} />
      </div>
    </div>
  );
}
