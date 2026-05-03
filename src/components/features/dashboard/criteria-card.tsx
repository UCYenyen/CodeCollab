"use client";

import { CRITERIA, getScoreBand, getBandLabel, type CriteriaKey } from "@/lib/assessment/criteria";
import { cn } from "@/lib/utils";

interface CriteriaCardProps {
  criteriaKey: CriteriaKey;
  score: number;
}

const BAND_STYLES = {
  low: { badge: "bg-destructive/10 text-destructive", bar: "bg-destructive" },
  mid: { badge: "bg-yellow-cta/20 text-yellow-700", bar: "bg-yellow-cta" },
  high: { badge: "bg-accent/20 text-accent", bar: "bg-accent" },
};

export function CriteriaCard({ criteriaKey, score }: CriteriaCardProps) {
  const info = CRITERIA[criteriaKey];
  const band = getScoreBand(score);
  const styles = BAND_STYLES[band];
  const suggestions = info.suggestions[band];

  return (
    <div className="rounded-2xl border-2 border-navy bg-white p-5 shadow-[4px_4px_0px_0px_var(--navy)]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{info.emoji}</span>
          <div>
            <h3 className="font-display text-xl text-navy">{info.name}</h3>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-bold", styles.badge)}>
              {getBandLabel(band)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl text-primary">{score}</div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted mb-4">
        <div
          className={cn("h-full rounded-full transition-all", styles.bar)}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="font-bold text-navy text-xs uppercase tracking-wide mb-1">What this is</p>
          <p className="text-muted-foreground">{info.description}</p>
        </div>
        <div>
          <p className="font-bold text-navy text-xs uppercase tracking-wide mb-1">What we measured</p>
          <p className="text-muted-foreground">{info.measures}</p>
        </div>
        <div>
          <p className="font-bold text-navy text-xs uppercase tracking-wide mb-1">Suggestions</p>
          <ul className="space-y-1.5 text-muted-foreground">
            {suggestions.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
