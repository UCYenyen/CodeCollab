"use client";

import { useRef, useEffect } from "react";
import { FlaskConical, Users, Smile, BookOpen } from "lucide-react";

interface StatCard {
  icon: React.ElementType;
  value: string;
  label: string;
  source: string;
  accentClass: string;
  bgClass: string;
}

const STATS: StatCard[] = [
  {
    icon: FlaskConical,
    value: "136",
    label: "Peer-Reviewed Studies",
    source: "Frontiers in Psychology",
    accentClass: "text-primary",
    bgClass: "bg-primary/10 border-primary/30",
  },
  {
    icon: Users,
    value: "1,426",
    label: "Children in Research",
    source: "Frontiers in Psychology",
    accentClass: "text-blue-500",
    bgClass: "bg-blue-500/10 border-blue-500/30",
  },
  {
    icon: Smile,
    value: "89%",
    label: "Positive Game Engagement",
    source: "JMIR Serious Games",
    accentClass: "text-accent",
    bgClass: "bg-accent/10 border-accent/30",
  },
  {
    icon: BookOpen,
    value: "3",
    label: "Top-Tier Indexed Journals",
    source: "Frontiers in Psychology · JMIR · Frontiers in Public Health",
    accentClass: "text-amber-500",
    bgClass: "bg-amber-500/10 border-amber-500/30",
  },
];

function useCountUp(target: number, duration = 1400, triggerRef: React.RefObject<HTMLElement | null>) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const update = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            if (countRef.current) {
              const val = Math.round(eased * target);
              countRef.current.textContent =
                target >= 1000
                  ? val.toLocaleString()
                  : val.toString();
            }
            if (progress < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, triggerRef]);

  return countRef;
}

function AnimatedValue({ stat }: { stat: StatCard }) {
  const sectionRef = useRef<HTMLElement>(null);
  const numericStr = stat.value.replace(/[^0-9]/g, "");
  const suffix = stat.value.replace(/[0-9,]/g, "");
  const numericVal = parseInt(numericStr, 10);
  const countRef = useCountUp(numericVal, 1400, sectionRef as React.RefObject<HTMLElement>);

  return (
    <section ref={sectionRef} className={`flex flex-col items-center rounded-2xl border-2 p-6 text-center transition-transform hover:-translate-y-1 duration-200 ${stat.bgClass}`}>
      <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-current/20 ${stat.bgClass}`}>
        <stat.icon className={`h-5 w-5 ${stat.accentClass}`} />
      </div>
      <p className={`font-display text-4xl font-bold leading-none ${stat.accentClass}`}>
        <span ref={countRef}>0</span>
        {suffix}
      </p>
      <p className="mt-1 text-sm font-bold text-navy">{stat.label}</p>
      <p className="mt-1 text-xs leading-tight text-muted-foreground">{stat.source}</p>
    </section>
  );
}

export function ResearchStatsBanner() {
  return (
    <div className="w-full bg-muted py-10 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Grounded in Peer-Reviewed Science
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <AnimatedValue key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
