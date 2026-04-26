"use client";

import { FlaskConical } from "lucide-react";
import { useResearchFilter } from "@/hooks/use-research-filter";
import { ResearchFilter } from "@/components/features/research/research-filter";
import { ResearchList, RESEARCH_ITEMS } from "@/components/features/research/research-list";

export default function ResearchPage() {
  const { filter, setFilter, filteredItems } = useResearchFilter(RESEARCH_ITEMS);

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-navy bg-primary shadow-[3px_3px_0px_0px_var(--navy)]">
            <FlaskConical className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-navy lg:text-5xl">
            The Science Behind BrainSpark
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Every game and activity is grounded in peer-reviewed research. Expand each study to learn what the science says.
          </p>
        </div>

        <div className="mb-6">
          <ResearchFilter filter={filter} onFilterChange={setFilter} />
        </div>

        <ResearchList items={filteredItems} />
      </div>
    </div>
  );
}
