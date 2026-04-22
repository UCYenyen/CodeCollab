import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-yellow-cta px-6 py-28">
      <span className="absolute left-10 top-8 select-none text-4xl text-foreground/10">
        ✦
      </span>
      <span className="absolute bottom-10 right-14 select-none text-2xl text-foreground/10">
        ✦
      </span>
      <span className="absolute bottom-20 left-20 select-none text-lg text-foreground/10">
        ✦
      </span>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10">
          <Sparkles className="h-8 w-8 text-foreground/60" />
        </div>

        <h2 className="font-display text-4xl leading-tight text-foreground lg:text-5xl">
          Ready to Spark Some Brilliance?
        </h2>

        <p className="max-w-md text-lg leading-relaxed text-foreground/70">
          Join thousands of families turning screen time into brain time. Free
          to start, no ads ever.
        </p>

        <Button className="mt-2 h-12 rounded-full px-10 text-base font-bold shadow-none">
          Start for Free 🚀
        </Button>
      </div>
    </section>
  );
}
