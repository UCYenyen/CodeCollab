"use client";

import { FlaskConical, Shield, Star, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { TrustStat } from "@/types/landing";

const TRUST_STATS: TrustStat[] = [
  { icon: Users, label: "Trusted by 10,000+ families", color: "#FFE66D" },
  { icon: FlaskConical, label: "Research-backed", color: "#4ECDC4" },
  { icon: Shield, label: "COPPA compliant", color: "#FF6B35" },
  { icon: Star, label: "4.9/5 stars", color: "#FFE66D" },
];

export function TrustBar() {
  const statsRef = useScrollReveal<HTMLDivElement>({
    variant: "fade",
    stagger: 0.1,
    childrenSelector: ":scope > *",
    start: "top 95%",
  });

  return (
    <div className="bg-navy px-6 py-5">
      <div ref={statsRef} className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-3">
        {TRUST_STATS.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0" style={{ color }} />
            <span className="text-sm font-semibold text-background">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
