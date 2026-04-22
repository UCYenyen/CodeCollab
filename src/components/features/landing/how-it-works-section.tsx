import { Button } from "@/components/ui/button";
import { Brain, Gamepad2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cardBg: string;
  numberBg: string;
  numberText: string;
};

const STEPS: Step[] = [
  {
    number: "1",
    icon: Brain,
    title: "Brain Quiz",
    description:
      "A quick, fun assessment to understand their current cognitive strengths and areas for growth.",
    cardBg: "bg-step-1",
    numberBg: "bg-primary",
    numberText: "text-primary-foreground",
  },
  {
    number: "2",
    icon: Gamepad2,
    title: "Custom Games",
    description:
      "Personalized daily missions adapting to their skill level, ensuring they stay challenged and engaged.",
    cardBg: "bg-step-2",
    numberBg: "bg-step-number-2",
    numberText: "text-secondary-foreground",
  },
  {
    number: "3",
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Receive weekly insights into their development, highlighting achievements and new milestones.",
    cardBg: "bg-step-3",
    numberBg: "bg-step-number-3",
    numberText: "text-secondary-foreground",
  },
];

function StepCard({ step, isLast }: { step: Step; isLast: boolean }) {
  const Icon = step.icon;
  return (
    <div className="relative flex-1">
      <div className="overflow-hidden rounded-3xl border border-border/50 shadow-sm">
        <div className={cn("relative flex h-48 items-center justify-center p-8", step.cardBg)}>
          <span
            className={cn(
              "absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
              step.numberBg,
              step.numberText
            )}
          >
            {step.number}
          </span>
          <Icon className="h-12 w-12 text-foreground/40" strokeWidth={1.5} />
        </div>
        <div className="bg-card p-6">
          <h3 className="mb-2 font-display text-lg text-foreground">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute right-0 top-24 z-10 hidden translate-x-1/2 -translate-y-1/2 lg:block">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-border" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl text-foreground">
            How BrainSpark Works
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Three simple steps to unlock your child&apos;s cognitive potential.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button className="h-12 rounded-full px-10 text-base font-bold shadow-none">
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
