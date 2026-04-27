"use client";

import { useAssessmentFlow } from "@/hooks/use-assessment-flow";
import { AssessmentIntro } from "./assessment-intro";
import { AssessmentCompletion } from "./assessment-completion";
import { TargetRush } from "./games/target-rush";
import { MemoryLights } from "./games/memory-lights";
import { PatternBuilder } from "./games/pattern-builder";
import { DragPrecision } from "./games/drag-precision";
import { EmotionMatch } from "./games/emotion-match";

export function AssessmentFlow() {
  const { currentStep, nextStep, recordScore, getFinalResult } = useAssessmentFlow();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      {currentStep === "intro" && <AssessmentIntro onStart={nextStep} />}
      
      {currentStep === "attention_game" && (
        <TargetRush onComplete={(score) => recordScore("Attention", score)} />
      )}
      
      {currentStep === "memory_game" && (
        <MemoryLights onComplete={(score) => recordScore("Memory", score)} />
      )}
      
      {currentStep === "logic_game" && (
        <PatternBuilder onComplete={(score) => recordScore("Logic", score)} />
      )}
      
      {currentStep === "motorik_game" && (
        <DragPrecision onComplete={(score) => recordScore("Motorik", score)} />
      )}
      
      {currentStep === "social_game" && (
        <EmotionMatch onComplete={(score) => recordScore("Social", score)} />
      )}
      
      {currentStep === "completion" && (
        <AssessmentCompletion result={getFinalResult()} />
      )}
    </div>
  );
}
