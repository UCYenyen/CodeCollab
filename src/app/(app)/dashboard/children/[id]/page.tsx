import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ChildCard } from "@/components/features/dashboard/child-card";
import { LearningProgress } from "@/components/features/dashboard/learning-progress";
import { CriteriaCard } from "@/components/features/dashboard/criteria-card";
import { OverallSummary } from "@/components/features/dashboard/overall-summary";
import { GoalSetter } from "@/components/features/dashboard/goal-setter";
import type { ChartDataPoint, ChildDashboardData } from "@/types/dashboard";
import type { CriteriaKey } from "@/lib/assessment/criteria";

const CRITERIA_KEYS: CriteriaKey[] = ["attention", "memory", "logic", "motoric", "social"];

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

export default async function ChildDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user: parentUser } } = await supabase.auth.getUser();

  if (!parentUser) redirect("/auth/sign-in");

  const adminClient = createAdminClient();

  const { data: childRow } = await adminClient
    .from("children")
    .select("coins, date_of_birth, gender")
    .eq("id", id)
    .maybeSingle();

  const { data: childUserData } = await adminClient.auth.admin.getUserById(id);
  const childMetadata = childUserData?.user?.user_metadata ?? {};

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const { data: weekHistories } = await adminClient
    .from("histories")
    .select(`id, "coins_ received", created_at`)
    .eq("refrence_children", id)
    .gte("created_at", weekStart.toISOString());

  const dob = childRow?.date_of_birth ?? "";
  const age = dob ? calculateAge(dob) : 0;
  const weeklyCoins = weekHistories?.reduce((sum, h) => sum + (h["coins_ received"] ?? 0), 0) ?? 0;

  const { data: latestAssessment } = await adminClient
    .from("pre_assesment")
    .select("attention_score, memory_score, logic_score, motoric_score, social_score")
    .eq("refrence_child", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const assessmentScores = latestAssessment
    ? {
        attention: latestAssessment.attention_score ?? 0,
        memory: latestAssessment.memory_score ?? 0,
        logic: latestAssessment.logic_score ?? 0,
        motoric: latestAssessment.motoric_score ?? 0,
        social: latestAssessment.social_score ?? 0,
      }
    : null;

  const childDashboardData: ChildDashboardData = {
    id,
    name: (childMetadata.display_name as string | undefined) ?? "Child",
    age,
    grade: Math.max(1, age - 5),
    coins: childRow?.coins ?? 0,
    gender: (childRow?.gender ?? "Male") as "Male" | "Female",
    avatarKey: (childMetadata.avatar as string | undefined) ?? "space",
    weeklyCoins,
    accentColor: "primary",
    hasCompletedPreAssessment: (childRow?.coins ?? 0) > 0,
    assessmentScores,
  };

  const weeklyData: ChartDataPoint[] = WEEKLY_DAYS.map((day, i) => {
    const sum = weekHistories
      ?.filter((h) => getDayIndex(h.created_at) === i)
      .reduce((s, h) => s + (h["coins_ received"] ?? 0), 0) ?? 0;
    return { day, [id]: sum };
  });

  const monthlyData: ChartDataPoint[] = MONTHLY_WEEKS.map((week) => {
    // Simple mock estimation like in dashboard
    return { day: week, [id]: childRow?.coins ? Math.round(childRow.coins / 4) : 0 };
  });

  const weeklyGoal = (childMetadata.weekly_goal as number | undefined) ?? 50;

  return (
    <div className="space-y-6 px-4 py-6 md:space-y-8 md:px-8 md:py-8">
      <div>
        <h1 className="font-display text-2xl md:text-3xl text-navy">
          <span className="text-primary">{childDashboardData.name}'s</span> Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View details and progress for this child.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-1 space-y-4 md:space-y-6">
          <ChildCard child={childDashboardData} />
          <GoalSetter
            childId={childDashboardData.id}
            initialGoal={weeklyGoal}
            weeklyCoins={childDashboardData.weeklyCoins}
          />
        </div>

        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <LearningProgress
            weeklyData={weeklyData}
            monthlyData={monthlyData}
            children={[{ id: childDashboardData.id, name: childDashboardData.name, accentColor: childDashboardData.accentColor }]}
          />

          {assessmentScores ? (
            <>
              <OverallSummary scores={assessmentScores} />

              <div>
                <h2 className="font-display text-xl md:text-2xl text-navy mb-3 md:mb-4">Detailed Breakdown</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
                  {CRITERIA_KEYS.map((key) => (
                    <CriteriaCard
                      key={key}
                      criteriaKey={key}
                      score={assessmentScores[key]}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-navy bg-cream p-8 text-center">
              <p className="font-display text-lg text-navy mb-1">No assessment yet</p>
              <p className="text-sm text-muted-foreground">
                Complete the pre-assessment to see your child&apos;s detailed cognitive profile.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
