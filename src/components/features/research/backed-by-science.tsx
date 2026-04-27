"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ResearchBadge } from "./research-badge";
import { ReferencesAccordion } from "./references-accordion";

interface EffectBar {
  domain: string;
  g: number;
  color: string;
  bg: string;
  emoji: string;
}

const EFFECT_SIZES: EffectBar[] = [
  { domain: "Problem Solving",    g: 0.63, color: "bg-primary",    bg: "bg-primary/10",    emoji: "🧩" },
  { domain: "Cognitive Dev.",     g: 0.46, color: "bg-blue-500",   bg: "bg-blue-100",      emoji: "🧠" },
  { domain: "Social Dev.",        g: 0.38, color: "bg-accent",     bg: "bg-accent/10",     emoji: "🤝" },
  { domain: "Emotional Dev.",     g: 0.35, color: "bg-amber-400",  bg: "bg-amber-50",      emoji: "💛" },
];

// Max g across bars, used for proportional widths (0.63)
const MAX_G = 0.63;

function EffectBarChart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Effect Sizes — Alotaibi (2024) · 136 studies, N = 1,426
      </p>
      {EFFECT_SIZES.map((bar) => {
        const widthPct = Math.round((bar.g / MAX_G) * 100);
        return (
          <div key={bar.domain} className={`rounded-xl border-2 border-border p-3 ${bar.bg}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-bold text-navy">
                <span>{bar.emoji}</span>
                {bar.domain}
              </span>
              <span className="font-mono text-xs font-bold text-navy/70">
                g = {bar.g.toFixed(2)}
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                  (p &lt; .001)
                </span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/70 border border-white">
              <div
                className={`h-2.5 rounded-full ${bar.color} transition-all duration-1000 ease-out`}
                style={{ width: visible ? `${widthPct}%` : "0%" }}
              />
            </div>
          </div>
        );
      })}
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Hedges' g: small ≥ 0.2, medium ≥ 0.5, large ≥ 0.8 · All effects p &lt; .001
      </p>
    </div>
  );
}

export function BackedByScience() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            🔬 Backed by Science
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-navy sm:text-4xl">
            What the Research Actually Says
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every BrainSpark activity maps to a peer-reviewed cognitive outcome.
            Below are independently verified effect sizes — unmodified from published data.
          </p>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">

          {/* Left: Pull quote + attention finding */}
          <div className="flex flex-col gap-6">

            {/* Pull quote — Source 1 */}
            <blockquote className="rounded-2xl border-l-4 border-primary bg-primary/5 p-6">
              <p className="font-serif text-base italic leading-relaxed text-navy">
                &ldquo;Game-based learning produced significant positive effects on cognitive
                development (g&nbsp;=&nbsp;0.46), social development (g&nbsp;=&nbsp;0.38),
                and emotional development (g&nbsp;=&nbsp;0.35), with the largest effect
                observed for problem-solving (g&nbsp;=&nbsp;0.63).&rdquo;
              </p>
              <footer className="mt-3 text-xs text-muted-foreground">
                Alotaibi, M. S. (2024). <em>Frontiers in Psychology</em>, 15, 1307881.{" "}
                <ResearchBadge
                  sourceNumber={1}
                  authorYear="Alotaibi 2024"
                  journal="Frontiers in Psychology (Scopus Q1 · PubMed)"
                  doi="10.3389/fpsyg.2024.1307881"
                  finding="Game-based learning produced significant positive effects across cognitive (g=0.46), social (g=0.38), emotional (g=0.35) domains and problem-solving (g=0.63), all p < .001. Based on 136 studies with 1,426 participants."
                />
              </footer>
            </blockquote>

            {/* Attention / EEG finding — Source 2 */}
            <div className="rounded-2xl border-2 border-border bg-muted p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Attention &amp; ADHD — Lin &amp; Chang (2025)
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy">
                In a review of <strong>35 studies (N = 1,408)</strong>, EEG measurements
                confirmed measurable changes in alpha and beta brainwave patterns
                associated with attention regulation following game-based interventions.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy">
                <strong>89%</strong> of children showed a positive attitude and high
                engagement toward game-based sessions —{" "}
                <span className="text-[11px] text-muted-foreground">
                  (engagement/attitude metric, not a therapeutic outcome claim)
                </span>{" "}
                <ResearchBadge
                  sourceNumber={2}
                  authorYear="Lin & Chang 2025"
                  journal="JMIR Serious Games (PubMed · Scopus)"
                  doi="10.2196/60937"
                  finding="89% of children in 35 RCTs showed positive attitude and engagement toward game interventions. EEG confirmed changes in alpha/beta brainwaves linked to attention regulation. This is an engagement/attitude metric, not a therapeutic efficacy claim."
                />
              </p>
            </div>

            {/* Structured training — Source 3 */}
            <div className="rounded-2xl border-2 border-border bg-muted p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Structured Training — Adamczyk-Zientara et al. (2025)
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy">
                Just <strong>14 sessions of 7–8 minutes</strong> of computer-adaptive
                attention training produced significant improvements in attentional task
                performance across children aged 4 and 6 (F&nbsp;=&nbsp;11.603;
                p&nbsp;&lt;&nbsp;.001; η²p&nbsp;=&nbsp;0.167), with larger gains in
                6-year-olds.{" "}
                <ResearchBadge
                  sourceNumber={3}
                  authorYear="Adamczyk-Zientara et al. 2025"
                  journal="Frontiers in Public Health (PubMed · Scopus)"
                  doi="10.3389/fpubh.2025.1499924"
                  finding="14 sessions of 7–8 minutes of computer-adaptive attention training yielded significant improvements in attentional task performance (F = 11.603; p < .001; η²p = 0.167). 6-year-olds outperformed 4-year-olds."
                />
              </p>
            </div>

            <Link
              href="/researches"
              className="inline-flex w-fit items-center gap-1.5 rounded-lg border-2 border-navy bg-primary px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0px_0px_var(--navy)] transition-all hover:bg-primary-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              View All Research Papers →
            </Link>
          </div>

          {/* Right: Animated effect size bar chart */}
          <div className="rounded-2xl border-2 border-navy bg-white p-6 shadow-[4px_4px_0px_0px_var(--navy)]">
            <EffectBarChart />
          </div>
        </div>

        {/* References accordion */}
        <ReferencesAccordion />
      </div>
    </section>
  );
}
