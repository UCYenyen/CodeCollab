"use client";

import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { BarChart2, Mail, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { FaPuzzlePiece } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import type { Feature, DomainRow } from "@/types/landing";

const FEATURES: Feature[] = [
  {
    icon: Mail,
    iconBg: "bg-feature-icon-1",
    title: "Weekly Reports",
    description: "Detailed emails tracking cognitive growth.",
  },
  {
    icon: MonitorSmartphone,
    iconBg: "bg-feature-icon-2",
    title: "Parent Portal",
    description: "Manage accounts and screen time easily.",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-feature-icon-3",
    title: "Zero Ads",
    description: "100% safe, no in-app purchases or ads.",
  },
  {
    icon: BarChart2,
    iconBg: "bg-feature-icon-4",
    title: "Domain Tracking",
    description: "See progress across 5 distinct brain areas.",
  },
];

const DOMAIN_ROWS: DomainRow[] = [
  {
     emoji: <FaPuzzlePiece/>,
    label: "Logic",
    value: "+12%",
    valueColor: "text-primary",
    barColor: "bg-primary",
    barWidth: "w-3/4",
  },
  {
    emoji: <IoEye/>,
    label: "Attention",
    value: "+5%",
    valueColor: "text-blue-500",
    barColor: "bg-blue-500",
    barWidth: "w-1/2",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-card border-2 border-b-4 border-r-4 p-5">
      <div className={`flex border-2 h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.iconBg}`}>
        <Icon className="h-5 w-5 text-foreground" />
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">{feature.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-card shadow-xl border-2 border-b-4 border-r-4">
      <div className="flex items-center gap-1.5 rounded-t-2xl bg-card px-4 py-3 border-b border-border">
        <div className="border h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="border h-2.5 w-2.5 rounded-full bg-secondary" />
        <div className="border h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 flex-1 text-[11px] font-medium text-muted-foreground">
          Report · Mia&apos;s Week
        </span>
      </div>

      <div className="p-5">
        <div className="flex flex-col items-center pb-4 border-b border-border mb-4">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-feature-icon-1 text-2xl">
            👧
          </div>
          <p className="text-sm font-extrabold text-foreground">
            Mia&apos;s BrainSpark Report
          </p>
          <p className="text-[11px] text-foreground font-semibold">
            Week of Oct 12 – 18
          </p>
        </div>

        <div className="flex bg-muted-background flex-col gap-4 mb-5">
          {DOMAIN_ROWS.map(({ emoji, label, value, valueColor, barColor, barWidth }) => (
            <div key={label} className="flex border-2 rounded-lg p-2 py-4 items-center gap-3">
              <span className={`text-base leading-none border-2 p-2 rounded-full ${barColor}`}>{emoji}</span>
              <div className="flex-1">
                <div className="mb-1 flex justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {label}
                  </span>
                  <span className={`text-xs font-bold ${valueColor}`}>
                    {value}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className={`h-1.5 rounded-full ${barColor} ${barWidth}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full rounded-xl bg-navy text-primary-foreground hover:bg-navy/90 h-9 text-sm font-bold shadow-none">
          View Full Dashboard
        </Button>
      </div>
    </div>
  );
}

export function ParentsSection() {
  const leftRef = useScrollReveal<HTMLDivElement>({ variant: "fadeRight", distance: 60 });
  const rightRef = useScrollReveal<HTMLDivElement>({ variant: "fadeLeft", distance: 60, delay: 0.15 });

  return (
    <section id="for-parents" className="bg-accent px-6 py-24 overflow-x-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div ref={leftRef} className="flex flex-col gap-7">
          <h2 className="font-display text-4xl leading-tight text-foreground lg:text-5xl">
            Built for Kids.<br />Loved by Parents.
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-foreground font-semibold">
            We keep parents in the loop while providing a safe, ad-free
            environment.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>

        <div ref={rightRef} className="flex justify-center lg:justify-end">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
