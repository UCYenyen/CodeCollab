"use client";

import Link from "next/link";
import { useState } from "react";
import { BookMarked } from "lucide-react";

export interface ResearchBadgeProps {
  sourceNumber: number;
  authorYear: string;
  journal: string;
  doi: string;
  finding: string;
}

export function ResearchBadge({
  sourceNumber,
  authorYear,
  journal,
  doi,
  finding,
}: ResearchBadgeProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block align-middle">
      <button
        type="button"
        aria-label={`View source ${sourceNumber}: ${authorYear}`}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent transition-colors hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        <BookMarked className="h-3 w-3 shrink-0" aria-hidden="true" />
        {authorYear}
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-xl border-2 border-navy bg-white p-3 text-left shadow-[3px_3px_0px_0px_var(--navy)]"
        >
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Source [{sourceNumber}]
          </p>
          <p className="mt-1 text-xs font-semibold leading-relaxed text-navy">
            {finding}
          </p>
          <p className="mt-1.5 text-[11px] italic text-muted-foreground">
            {journal}
          </p>
          <Link
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-block text-[11px] font-medium text-accent underline underline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            doi:{doi}
          </Link>
        </span>
      )}
    </span>
  );
}
