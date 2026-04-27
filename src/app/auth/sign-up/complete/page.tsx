import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CompleteLeftPanel } from "@/components/features/auth/complete-left-panel";
import { SignUpSteps } from "@/components/features/auth/sign-up-steps";
import { BrainQuizOverview } from "@/components/features/auth/brain-quiz-overview";
import { CompleteActions } from "@/components/features/auth/complete-actions";

export default async function CompletePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/sign-in");

  const step = user.user_metadata?.onboarding_step;
  if (!step || step < 1) redirect("/auth/sign-up");
  if (step < 2) redirect("/auth/sign-up/child-profile");

  const childName = (user.user_metadata?.display_name as string) ?? "your child";

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <CompleteLeftPanel />
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-8 py-12">
        <div className="mb-8 w-full max-w-lg">
          <SignUpSteps currentStep={3} />
        </div>
        <div className="w-full max-w-lg">
          <div className="mb-6 text-center">
            <h1 className="font-display text-4xl text-navy">
              Welcome to BrainSpark!
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Before we start, let&apos;s find {childName}&apos;s brain superpowers with a quick quiz!
            </p>
          </div>

          <div className="rounded-2xl border-2 border-navy bg-white p-6 shadow-[4px_4px_0px_0px_var(--navy)]">
            <BrainQuizOverview />
            <CompleteActions childName={childName} />
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            ↺ You can always take the quiz later from {childName}&apos;s profile.
          </p>
        </div>
      </div>
    </div>
  );
}
