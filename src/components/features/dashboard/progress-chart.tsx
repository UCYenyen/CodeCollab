"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint, ChildDashboardData } from "@/types/dashboard";

const CHILD_COLORS: Record<string, string> = {
  primary: "#ff6b35",
  accent: "#0cc9b0",
};

interface ProgressChartProps {
  data: ChartDataPoint[];
  children: Pick<ChildDashboardData, "id" | "name" | "accentColor">[];
}

export function ProgressChart({ data, children }: ProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "2px solid #1a1a2e",
            fontSize: "12px",
            fontWeight: 600,
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
        />
        {children.map((child) => (
          <Line
            key={child.id}
            type="monotone"
            dataKey={child.id}
            name={child.name}
            stroke={CHILD_COLORS[child.accentColor] ?? "#ff6b35"}
            strokeWidth={2.5}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
