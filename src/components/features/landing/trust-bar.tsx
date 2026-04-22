import { FlaskConical, Shield, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TrustStat = {
  icon: LucideIcon;
  label: string;
};

const TRUST_STATS: TrustStat[] = [
  { icon: Users, label: "Trusted by 10,000+ families" },
  { icon: FlaskConical, label: "Research-backed" },
  { icon: Shield, label: "COPPA compliant" },
  { icon: Star, label: "4.9/5 stars" },
];

export function TrustBar() {
  return (
    <div className="bg-navy px-6 py-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {TRUST_STATS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
