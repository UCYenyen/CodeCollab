"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, TrendingUp, BrainIcon } from "lucide-react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
const TRUST_BADGES = [
  "Free to start",
  "No ads, ever",
  "Parent report",
] as const;

function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div className="absolute rounded-lg bg-black top-2 -right-2 w-full h-full"></div>
      <div className="relative z-1 w-full max-w-[460px]">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-step-1 to-step-1 flex items-end justify-center pb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex justify-center items-center gap-4 text-[80px] leading-none select-none">
              <Image src={"/landing-page/landing-hero.webp"} width={1000} height={1000} alt="hero image" className="w-[90%] h-auto"></Image>
            </div>
          </div>
        </div>
        <div className="absolute border-2 border-black border-b-5 border-r-5 -bottom-3 -left-4 flex items-center gap-2.5 rounded-2xl bg-card px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <TrendingUp className="h-4 w-4 shrink-0 text-green-500" />
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">
                Logic Score
              </p>
              <p className="text-sm font-bold text-green-600">+15%</p>
            </div>
            <div className="border rounded-lg border-black bg-yellow-200 h-2"></div>
          </div>
        </div>
        <div className="absolute border-2 border-black border-b-5 border-r-5 top-24 -left-4 flex items-center gap-2.5 rounded-lg bg-card px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <p className="text-xl font-bold text-orange-600">@</p>
            </div>
          </div>
        </div>
        <div className="absolute border-2 border-black border-b-5 border-r-5 bottom-24 right-8 flex items-center gap-2.5 rounded-lg bg-card px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center text-green-400">
              <BrainIcon/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const leftRef = useScrollReveal<HTMLDivElement>({
    variant: "fadeUp",
    stagger: 0.24,
    childrenSelector: ":scope > *",
    immediate: true,
  });

  const rightRef = useScrollReveal<HTMLDivElement>({
    variant: "fadeLeft",
    delay: 0.35,
    immediate: true,
  });

  return (
    <section className="min-h-[89vh] flex flex-col justify-center items-center bg-muted px-6 pb-20 pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div ref={leftRef} className="flex flex-col gap-7">
          <Badge
            variant="outline" className="bg-white border-black border-2 border-r-5 border-b-5 py-3"
          >
            🎮 The Brain Game Kids Actually Love
          </Badge>

          <h1 className="font-display text-5xl leading-[1.1] text-foreground lg:text-6xl">
            Level Up Your<br />
            <span className="relative inline-block pb-2">
              <span className="relative z-10">
                Child&apos;s Brain!
              </span>
              <span className="absolute bottom-3 left-0 right-0 h-3 rounded-full bg-secondary/60" />
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-muted-card">
            Science-backed games that feel like play. Track progress with
            detailed reports while they build essential cognitive skills.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button className="h-12 rounded-full px-8 text-base font-bold shadow-none">
              Start Playing Free
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-full px-8 text-base font-bold"
            >
              See How It Works
            </Button>
          </div>

          <div className="flex flex-wrap gap-5">
            {TRUST_BADGES.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-orange-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
