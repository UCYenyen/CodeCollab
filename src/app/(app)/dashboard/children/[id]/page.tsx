import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ChildCard } from "@/components/features/dashboard/child-card";
import { LearningProgress } from "@/components/features/dashboard/learning-progress";
import type { ChartDataPoint, ChildDashboardData } from "@/types/dashboard";

const WEEKLY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MONTHLY_WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"] as const;

function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function getDayIndex(dateStr: string): number {
  const d = new Date(dateStr);
  return (d.getDay() + 6) % 7;
}

export default async function ChildDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user: parentUser } } = await supabase.auth.getUser();

  if (!parentUser) redirect("/auth/sign-in");

  const adminClient = createAdminClient();

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(params.id);
  if (!isUUID) {
    redirect("/dashboard");
  }

  const { data: childUser, error: childError } = await adminClient.auth.admin.getUserById(params.id);

  if (childError || !childUser || childUser.user.user_metadata?.parent_id !== parentUser.id) {
    redirect("/dashboard");
  }

  const { data: childRow } = await adminClient
    .from("children")
    .select("coins, date_of_birth, gender")
    .eq("id", params.id)
    .single();

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const { data: weekHistories } = await adminClient
    .from("histories")
    .select(`id, "coins_ received", created_at`)
    .eq("refrence_children", params.id)
    .gte("created_at", weekStart.toISOString());

  const dob = childRow?.date_of_birth ?? "";
  const age = dob ? calculateAge(dob) : 0;
  const weeklyCoins = weekHistories?.reduce((sum, h) => sum + (h["coins_ received"] ?? 0), 0) ?? 0;

  const childDashboardData: ChildDashboardData = {
    id: childUser.user.id,
    name: (childUser.user.user_metadata?.display_name as string) ?? "Child",
    age,
    grade: Math.max(1, age - 5),
    coins: childRow?.coins ?? 0,
    gender: (childRow?.gender ?? "Male") as "Male" | "Female",
    avatarKey: (childUser.user.user_metadata?.avatar as string) ?? "space",
    weeklyCoins,
    accentColor: "primary",
  };

  const weeklyData: ChartDataPoint[] = WEEKLY_DAYS.map((day, i) => {
    const sum = weekHistories
      ?.filter((h) => getDayIndex(h.created_at) === i)
      .reduce((s, h) => s + (h["coins_ received"] ?? 0), 0) ?? 0;
    return { day, [params.id]: sum };
  });

  const monthlyData: ChartDataPoint[] = MONTHLY_WEEKS.map((week) => {
    // Simple mock estimation like in dashboard
    return { day: week, [params.id]: childRow?.coins ? Math.round(childRow.coins / 4) : 0 };
  });

  return (
    <div className="space-y-8 px-8 py-8">
      <div>
        <h1 className="font-display text-3xl text-navy">
          <span className="text-primary">{childDashboardData.name}'s</span> Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View details and progress for this child.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ChildCard child={childDashboardData} />
        </div>
        
        <div className="md:col-span-2">
           <LearningProgress
            weeklyData={weeklyData}
            monthlyData={monthlyData}
            children={[{ id: childDashboardData.id, name: childDashboardData.name, accentColor: childDashboardData.accentColor }]}
          />
        </div>
      </div>
    </div>
  );
}
