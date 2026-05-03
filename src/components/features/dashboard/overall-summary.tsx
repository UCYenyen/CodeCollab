"use client";

import { CRITERIA, getOverallSuggestion, type CriteriaKey } from "@/lib/assessment/criteria";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OverallSummaryProps {
  scores: Record<CriteriaKey, number>;
}

export function OverallSummary({ scores }: OverallSummaryProps) {
  const { overall, weakest, strongest, summary } = getOverallSuggestion(scores);

  return (
    <Card className="rounded-2xl border-4 border-navy bg-card shadow-[6px_6px_0px_0px_var(--navy)] ring-0">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="font-display text-2xl text-navy">Overall Profile</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl text-primary">{overall}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </CardHeader>

      <CardContent className="pt-4 flex flex-col gap-4">
        <p className="text-navy leading-relaxed">{summary}</p>

        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-xl border-2 border-accent bg-muted p-3 py-3 shadow-none ring-0 flex flex-col gap-1">
            <CardTitle className="text-xs font-bold text-accent uppercase">Strongest</CardTitle>
            <CardContent className="p-0 font-display text-lg text-navy">
              {CRITERIA[strongest].emoji} {CRITERIA[strongest].name}
            </CardContent>
          </Card>
          <Card className="rounded-xl border-2 border-primary bg-muted p-3 py-3 shadow-none ring-0 flex flex-col gap-1">
            <CardTitle className="text-xs font-bold text-primary uppercase">Focus Area</CardTitle>
            <CardContent className="p-0 font-display text-lg text-navy">
              {CRITERIA[weakest].emoji} {CRITERIA[weakest].name}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
