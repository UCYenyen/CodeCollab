"use client";

import {
  BookOpen,
  Zap,
  Brain,
  Search,
  Target,
  Heart,
  Globe,
  UserCheck,
  type LucideIcon,
} from "lucide-react";


import type { ResearchFilter, ResearchFilterProps } from "@/types/research";

const FILTER_OPTIONS: { value: ResearchFilter; Icon: LucideIcon }[] = [
  { value: "All", Icon: BookOpen },
  { value: "Attention", Icon: Zap },
  { value: "Memory", Icon: Brain },
  { value: "Logic", Icon: Search },
  { value: "Motor Skills", Icon: Target },
  { value: "Social Skills", Icon: Heart },
  { value: "General", Icon: Globe },
  { value: "Parent Engagement", Icon: UserCheck },
];

export function ResearchFilter({ filter, onFilterChange }: ResearchFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {FILTER_OPTIONS.map(({ value, Icon }) => {
        const isActive = filter === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-bold transition-all ${
              isActive
                ? "border-navy bg-primary text-white shadow-[2px_2px_0px_0px_var(--navy)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                : "border-border bg-white text-navy hover:border-navy hover:bg-muted"
            }`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {value}
          </button>
        );
      })}
    </div>
  );
}
