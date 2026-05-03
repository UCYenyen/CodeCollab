"use client";

import { CRITERIA, getOverallSuggestion, type CriteriaKey } from "@/lib/assessment/criteria";

interface OverallSummaryProps {
  scores: Record<CriteriaKey, number>;
}

export function OverallSummary({ scores }: OverallSummaryProps) {
  const { overall, weakest, strongest, summary } = getOverallSuggestion(scores);

  return (
    <div className="rounded-2xl border-4 border-navy bg-cream p-6 shadow-[6px_6px_0px_0px_var(--navy)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl text-navy">Overall Profile</h2>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl text-primary">{overall}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>

      <p className="text-navy mb-4 leading-relaxed">{summary}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border-2 border-accent bg-white p-3">
          <p className="text-xs font-bold text-accent uppercase mb-1">Strongest</p>
          <p className="font-display text-lg text-navy">
            {CRITERIA[strongest].emoji} {CRITERIA[strongest].name}
          </p>
        </div>
        <div className="rounded-xl border-2 border-primary bg-white p-3">
          <p className="text-xs font-bold text-primary uppercase mb-1">Focus Area</p>
          <p className="font-display text-lg text-navy">
            {CRITERIA[weakest].emoji} {CRITERIA[weakest].name}
          </p>
        </div>
      </div>
    </div>
  );
}
