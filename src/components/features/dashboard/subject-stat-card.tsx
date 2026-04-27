import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SubjectStatData } from "@/types/dashboard";

interface SubjectStatCardProps {
  stat: SubjectStatData;
}

export function SubjectStatCard({ stat }: SubjectStatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-navy p-4 shadow-[3px_3px_0px_0px_var(--navy)]",
        stat.bgColor,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl text-base",
            stat.iconColor,
          )}
        >
          {stat.icon}
        </div>
        <div className="h-6 w-6 rounded-lg opacity-30" style={{ background: "currentColor" }} />
      </div>
      <p className="mt-2 text-sm font-bold text-navy">{stat.subject}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="font-display text-2xl font-bold text-navy">{stat.score}%</span>
        <span className="flex items-center gap-0.5 rounded-full bg-white/70 px-1.5 py-0.5 text-xs font-bold text-navy">
          <TrendingUp className="h-3 w-3" />
          {stat.change}%
        </span>
      </div>
    </div>
  );
}
