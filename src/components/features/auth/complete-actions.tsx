"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface CompleteActionsProps {
  childName: string;
}

export function CompleteActions({ childName }: CompleteActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const markComplete = async () => {
    setIsLoading(true);
    await supabase.auth.updateUser({ data: { onboarding_step: 3 } });
    setIsLoading(false);
  };

  const handleStartQuiz = async () => {
    await markComplete();
    router.push("/assessment");
  };

  const handleSkip = async () => {
    await markComplete();
    router.push("/");
  };

  return (
    <div className="mt-5 space-y-3">
      <Button
        onClick={handleStartQuiz}
        disabled={isLoading}
        className="w-full rounded-xl border-2 border-navy bg-primary py-6 text-base font-bold text-white shadow-[3px_3px_0px_0px_var(--navy)] hover:bg-primary-hover active:shadow-none active:translate-x-0.75 active:translate-y-0.75 transition-all"
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        Start {childName}&apos;s Brain Quiz! 🚀 →
      </Button>
      <button
        type="button"
        onClick={handleSkip}
        disabled={isLoading}
        className="w-full text-center text-sm text-muted-foreground hover:text-navy"
      >
        <Link href={"/dashboard"}>
        Skip for now, go to dashboard →
        </Link>
      </button>
    </div>
  );
}
