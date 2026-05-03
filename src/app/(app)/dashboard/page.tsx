import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DashboardContent } from "@/components/features/dashboard/dashboard-content";
import type {
  ChildAccentColor,
  ChildDashboardData,
  ChartDataPoint,
} from "@/types/dashboard";

const WEEKLY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MONTHLY_WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"] as const;
const ACCENT_COLORS: ChildAccentColor[] = ["primary", "accent"];

function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

function getDayIndex(dateStr: string): number {
  const d = new Date(dateStr);
  return (d.getDay() + 6) % 7;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: parentUser },
  } = await supabase.auth.getUser();

  if (!parentUser) redirect("/auth/sign-in");

  if (parentUser.user_metadata.onboarding_step == 1) redirect("/onboarding");

  const adminClient = createAdminClient();

  const {
    data: { users: allUsers },
  } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });

  const childUsers = allUsers.filter(
    (u) =>
      u.user_metadata?.role === "child" &&
      u.user_metadata?.parent_id === parentUser.id,
  );

  const childIds = childUsers.map((u) => u.id);

  const { data: childRows } = await adminClient
    .from("children")
    .select("id, coins, date_of_birth, gender")
    .in("id", childIds);

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const { data: weekHistories } = await adminClient
    .from("histories")
    .select(`id, refrence_children, "coins_ received", created_at`)
    .in("refrence_children", childIds)
    .gte("created_at", weekStart.toISOString());

  const { data: assessmentRows } = await adminClient
    .from("pre_assesment")
    .select("refrence_child, attention_score, memory_score, logic_score, motoric_score, social_score, created_at")
    .in("refrence_child", childIds)
    .order("created_at", { ascending: false });

  const children: ChildDashboardData[] = childUsers.map((childUser, index) => {
    const row = childRows?.find((r) => r.id === childUser.id);
    const dob = row?.date_of_birth ?? "";
    const age = dob ? calculateAge(dob) : 0;
    const weeklyCoins =
      weekHistories
        ?.filter((h) => h.refrence_children === childUser.id)
        .reduce((sum, h) => sum + (h["coins_ received"] ?? 0), 0) ?? 0;

    const latestAssessment = assessmentRows?.find(
      (a) => a.refrence_child === childUser.id,
    );
    const assessmentScores = latestAssessment
      ? {
          attention: latestAssessment.attention_score ?? 0,
          memory: latestAssessment.memory_score ?? 0,
          logic: latestAssessment.logic_score ?? 0,
          motoric: latestAssessment.motoric_score ?? 0,
          social: latestAssessment.social_score ?? 0,
        }
      : null;

    return {
      id: childUser.id,
      name:
        (childUser.user_metadata?.display_name as string | undefined) ??
        "Child",
      age,
      grade: Math.max(1, age - 5),
      coins: row?.coins ?? 0,
      gender: (row?.gender ?? "Male") as "Male" | "Female",
      avatarKey:
        (childUser.user_metadata?.avatar as string | undefined) ?? "space",
      weeklyCoins,
      accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length] ?? "primary",
      hasCompletedPreAssessment: (row?.coins ?? 0) > 0,
      assessmentScores,
    };
  });

  const weeklyData: ChartDataPoint[] = WEEKLY_DAYS.map((day, i) => {
    const point: ChartDataPoint = { day };
    children.forEach((child) => {
      point[child.id] =
        weekHistories
          ?.filter(
            (h) =>
              h.refrence_children === child.id &&
              getDayIndex(h.created_at) === i,
          )
          .reduce((sum, h) => sum + (h["coins_ received"] ?? 0), 0) ?? 0;
    });
    return point;
  });

  const monthlyData: ChartDataPoint[] = MONTHLY_WEEKS.map((week) => {
    const point: ChartDataPoint = { day: week };
    children.forEach((child) => {
      point[child.id] = child.coins > 0 ? Math.round(child.coins / 4) : 0;
    });
    return point;
  });

  const parentName =
    (parentUser.user_metadata?.full_name as string | undefined) ??
    (parentUser.user_metadata?.name as string | undefined) ??
    "Parent";

  const chartChildren = children.map(({ id, name, accentColor }) => ({
    id,
    name,
    accentColor,
  }));

  return (
    <DashboardContent
      parentName={parentName}
      children={children}
      weeklyData={weeklyData}
      monthlyData={monthlyData}
      chartChildren={chartChildren}
    />
  );
}
