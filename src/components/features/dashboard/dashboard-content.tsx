"use client";

import { useState } from "react";
import { DashboardHeader } from "./dashboard-header";
import { ChildrenSection } from "./children-section";
import { LearningProgress } from "./learning-progress";
import type {
  ChildDashboardData,
  ChartDataPoint,
  ChildAccentColor,
} from "@/types/dashboard";

interface DashboardContentProps {
  parentName: string;
  children: ChildDashboardData[];
  weeklyData: ChartDataPoint[];
  monthlyData: ChartDataPoint[];
  chartChildren: Pick<ChildDashboardData, "id" | "name" | "accentColor">[];
}

export function DashboardContent({
  parentName,
  children,
  weeklyData,
  monthlyData,
  chartChildren,
}: DashboardContentProps) {
  const [selectedChildId, setSelectedChildId] = useState<string>(
    children[0]?.id || ""
  );

  const filterChartData = (data: ChartDataPoint[]) => {
    return data.map((point) => ({
      day: point.day,
      [selectedChildId]: point[selectedChildId] ?? 0,
    }));
  };

  const selectedChild = chartChildren.find((c) => c.id === selectedChildId);

  return (
    <div className="space-y-6 px-4 py-6 md:space-y-8 md:px-8 md:py-8">
      <DashboardHeader parentName={parentName} />
      <ChildrenSection
        children={children}
        selectedChildId={selectedChildId}
        onChildSelect={setSelectedChildId}
      />
      {/* <LearningProgress
        weeklyData={filterChartData(weeklyData)}
        monthlyData={filterChartData(monthlyData)}
        children={selectedChild ? [selectedChild] : []}
      /> */}
    </div>
  );
}
