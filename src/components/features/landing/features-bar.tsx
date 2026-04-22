"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const DOMAINS = [
  { icon: "🎯", label: "Attention" },
  { icon: "🧠", label: "Memory" },
  { icon: "🧩", label: "Logic" },
  { icon: "🏃", label: "Motor" },
  { icon: "🤝", label: "Social" },
] as const;

export function FeaturesBar() {
  const barRef = useScrollReveal<HTMLDivElement>({ variant: "fadeUp" });

  return (
    <div className="bg-muted px-4">
      <div ref={barRef} className="mx-auto border-2 py-4 bg-secondary flex flex-wrap items-center justify-center gap-x-0 gap-y-2">
        {DOMAINS.map(({ icon, label }, i) => (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2 px-5">
              <span className="text-lg leading-none">{icon}</span>
              <span className="text-sm font-bold text-secondary-foreground">
                {label}
              </span>
            </div>
            {i < DOMAINS.length - 1 && (
              <span className="text-secondary-foreground/40 text-lg leading-none">
                •
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
