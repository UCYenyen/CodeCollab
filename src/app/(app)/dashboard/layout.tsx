import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DashboardSidebar } from "@/components/features/dashboard/dashboard-sidebar";
import type { SidebarChildItem } from "@/types/dashboard";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/sign-in");

  const adminClient = createAdminClient();
  const {
    data: { users: allUsers },
  } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });

  const sidebarChildren: SidebarChildItem[] = allUsers
    .filter(
      (u) =>
        u.user_metadata?.role === "child" &&
        u.user_metadata?.parent_id === user.id,
    )
    .map((u) => ({
      id: u.id,
      name: (u.user_metadata?.display_name as string | undefined) ?? "Child",
    }));

  return (
    <div className="flex h-screen overflow-hidden bg-muted">
      <DashboardSidebar children={sidebarChildren} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
