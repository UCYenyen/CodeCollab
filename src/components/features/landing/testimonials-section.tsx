"use client";

import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Testimonial } from "@/types/landing";

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The only app I don't feel guilty letting my 7-year-old play. The weekly reports actually show improvement in his focus at school!",
    name: "Sarah M.",
    role: "Mom of 2",
    cardBackground: "bg-secondary",
    avatar: "👩",
  },
  {
    quote:
      "BrainSpark is brilliant. No ads, no sneaky purchases. Just genuinely fun logic puzzles that my daughter begs to play.",
    name: "David K.",
    role: "Dad of 1",
   cardBackground: "bg-accent",
    avatar: "👨",
  },
  {
    quote:
      "Finally, screen time that counts. The games are challenging but accessible, and the dashboard makes tracking easy.",
    name: "Elena R.",
    cardBackground: "bg-primary",
    role: "Educator & Mom",
    avatar: "👩‍🏫",
  },
];

function StarRow() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative z-10 flex flex-col gap-4 rounded-3xl bg-card">
      <div className={`absolute w-full h-full z-0 rounded-3xl top-1.5 -right-1.5 ` + testimonial.cardBackground}></div>
      <div className="relative border-3 z-10 flex flex-col gap-4 rounded-3xl bg-card h-full p-7">
        <StarRow />
        <p className="flex-1 text-sm leading-relaxed text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3 border-t-2 border-black border-dashed pt-4">
          <div className="flex border-2 h-10 w-10 items-center justify-center rounded-full bg-muted text-xl">
            {testimonial.avatar}
          </div>
          <div>
            <p className="text-sm font-extrabold text-foreground">{testimonial.name}</p>
            <p className="text-xs font-semibold text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>({ variant: "fadeUp" });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    variant: "scaleUp",
    stagger: 0.15,
    childrenSelector: ":scope > *",
  });

  return (
    <section className="bg-navy px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 ref={titleRef} className="mb-12 text-center font-display text-4xl text-card">
          What Parents Say
        </h2>
        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
