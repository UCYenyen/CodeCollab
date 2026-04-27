"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressChart } from "./progress-chart";
import { SubjectStatCard } from "./subject-stat-card";
import type {
  ChartDataPoint,
  ChildDashboardData,
  ProgressMode,
  SubjectStatData,
} from "@/types/dashboard";

const SUBJECT_STATS: SubjectStatData[] = [
  {
    id: "math",
    subject: "Math Master",
    score: 92,
    change: 5,
    icon: "🧮",
    bgColor: "bg-[#e0f9f5]",
    iconColor: "bg-accent/20 text-accent",
  },
  {
    id: "reading",
    subject: "Reading Skills",
    score: 78,
    change: 12,
    icon: "📖",
    bgColor: "bg-[#fff0ea]",
    iconColor: "bg-primary/20 text-primary",
  },
];

interface LearningProgressProps {
  weeklyData: ChartDataPoint[];
  monthlyData: ChartDataPoint[];
  children: Pick<ChildDashboardData, "id" | "name" | "accentColor">[];
}

export function LearningProgress({
  weeklyData,
  monthlyData,
  children,
}: LearningProgressProps) {
  const [mode, setMode] = useState<ProgressMode>("weekly");

  return (
    <section>
      <div className="rounded-2xl border-2 border-navy bg-white shadow-[4px_4px_0px_0px_var(--navy)]">
        <div className="flex items-center justify-between border-b-2 border-border px-6 py-4">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">
              Learning Progress
            </h2>
            <p className="text-xs text-muted-foreground">
              Overall performance across subjects
            </p>
          </div>
          <div className="flex overflow-hidden rounded-xl border-2 border-navy">
            <button
              onClick={() => setMode("weekly")}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                mode === "weekly"
                  ? "bg-navy text-white"
                  : "bg-white text-navy hover:bg-muted"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                mode === "monthly"
                  ? "bg-navy text-white"
                  : "bg-white text-navy hover:bg-muted"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-6">
            <div className="min-w-0 flex-1 rounded-xl border-2 border-border bg-muted/50 p-4">
              <ProgressChart
                data={mode === "weekly" ? weeklyData : monthlyData}
                children={children}
              />
            </div>

            <div className="flex w-48 flex-shrink-0 flex-col gap-3">
              {SUBJECT_STATS.map((stat) => (
                <SubjectStatCard key={stat.id} stat={stat} />
              ))}

              <Button className="mt-auto gap-2 rounded-xl border-2 border-navy bg-navy py-5 text-xs font-bold text-white shadow-[3px_3px_0px_0px_var(--accent)] transition-all hover:bg-navy/90 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                Detailed Analysis
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
