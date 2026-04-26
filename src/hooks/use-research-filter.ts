"use client";

import { useState, useMemo } from "react";
import type { ResearchFilter, ResearchItem } from "@/types/research";

export function useResearchFilter(items: ResearchItem[]) {
  const [filter, setFilter] = useState<ResearchFilter>("All");

  const filteredItems = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  );

  return { filter, setFilter, filteredItems };
}
