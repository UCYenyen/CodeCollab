"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

interface Reference {
  number: number;
  apa: string;
  doi: string;
  journal: string;
  indexing: string;
}

const REFERENCES: Reference[] = [
  {
    number: 1,
    apa: "Alotaibi, M. S. (2024). Game-based learning in early childhood education: A systematic review and meta-analysis. Frontiers in Psychology, 15, Article 1307881.",
    doi: "10.3389/fpsyg.2024.1307881",
    journal: "Frontiers in Psychology",
    indexing: "Scopus Q1 · PubMed Indexed",
  },
  {
    number: 2,
    apa: "Lin, J., & Chang, W.-R. (2025). Effectiveness of serious games as digital therapeutics for enhancing the abilities of children with ADHD: Systematic literature review. JMIR Serious Games, 13, e60937.",
    doi: "10.2196/60937",
    journal: "JMIR Serious Games",
    indexing: "PubMed Indexed · Scopus",
  },
  {
    number: 3,
    apa: "Adamczyk-Zientara, M., Wiśniewska, A., & Karwowska, M. (2025). Executive attention training effects in children aged 4 and 6 years. Frontiers in Public Health, 13, Article 1499924.",
    doi: "10.3389/fpubh.2025.1499924",
    journal: "Frontiers in Public Health",
    indexing: "PubMed Indexed · Scopus",
  },
];

export function ReferencesAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border-2 border-navy bg-white px-5 py-3.5 text-sm font-bold text-navy shadow-[2px_2px_0px_0px_var(--navy)] transition-all hover:bg-muted active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      >
        <span>View Full References ({REFERENCES.length} sources)</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ol className="mt-3 space-y-3">
          {REFERENCES.map((ref) => (
            <li
              key={ref.number}
              className="rounded-xl border-2 border-border bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  {ref.number}
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-navy">{ref.apa}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {ref.indexing}
                    </span>
                    <Link
                      href={`https://doi.org/${ref.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-accent underline underline-offset-2 hover:text-accent/80"
                    >
                      doi:{ref.doi}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
