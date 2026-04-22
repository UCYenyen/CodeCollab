import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Gamepad2, TrendingUp } from "lucide-react";

const TRUST_BADGES = [
  "Free to start",
  "No ads, ever",
  "Parent report",
] as const;

function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div className="relative w-full max-w-[460px]">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-step-1 to-step-1/60 flex items-end justify-center pb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-4 text-[80px] leading-none select-none">
              <span>👧</span>
              <span>🧒</span>
              <span>👦</span>
            </div>
          </div>
          <div className="absolute top-5 right-5 flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-md">
            <Gamepad2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Level 5</span>
          </div>
          <div className="absolute right-5 top-1/2 flex flex-col gap-2">
            <div className="h-8 w-8 rounded-xl bg-secondary/80 flex items-center justify-center text-sm">🎯</div>
            <div className="h-8 w-8 rounded-xl bg-step-2/80 flex items-center justify-center text-sm">⭐</div>
          </div>
        </div>
        <div className="absolute -bottom-3 -left-4 flex items-center gap-2.5 rounded-2xl bg-card px-4 py-3 shadow-lg border border-border">
          <TrendingUp className="h-4 w-4 shrink-0 text-green-500" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Logic Score
            </p>
            <p className="text-sm font-bold text-green-600">+15%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-muted px-6 pb-20 pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <Badge
            variant="outline"
            className="w-fit rounded-full border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            🎮 The Brain Game Kids Actually Love
          </Badge>

          <h1 className="font-display text-5xl leading-[1.1] text-foreground lg:text-6xl">
            Level Up Your<br />Child&apos;s Brain!
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Science-backed games that feel like play. Track progress with
            detailed reports while they build essential cognitive skills.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button className="h-12 rounded-full px-8 text-base font-bold shadow-none">
              Start Playing Free 🚀
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
                <Check className="h-4 w-4 shrink-0 text-green-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}
