import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-lg p-8 bg-white rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary mb-6 animate-bounce">
        <BrainCircuit className="h-12 w-12 text-white" />
      </div>
      
      <h1 className="font-display text-4xl text-navy mb-4">
        Ready for some Fun Games?
      </h1>
      
      <p className="text-muted-foreground text-lg mb-8">
        We're going to play 5 quick mini-games to map out your Brain Superpowers! Make sure you are in a quiet place and ready to tap!
      </p>

      <div className="flex items-center gap-2 mb-8 bg-cream p-4 rounded-xl border-2 border-navy/20">
        <Sparkles className="text-yellow-cta h-6 w-6" />
        <span className="font-bold text-navy">Takes about 3 minutes</span>
      </div>

      <Button
        onClick={onStart}
        className="w-full text-lg h-16 rounded-2xl border-2 border-navy bg-primary font-bold text-white shadow-[4px_4px_0px_0px_var(--navy)] hover:bg-primary-hover active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
      >
        Let's Go! 🚀
      </Button>
    </div>
  );
}
