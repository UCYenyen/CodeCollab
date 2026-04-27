import { useState, useCallback } from "react";
import type { 
  AssessmentStep, 
  DomainScores, 
  AssessmentResult,
  AdaptationLevel,
  Domain
} from "@/types/assessment";

const STEPS: AssessmentStep[] = [
  "intro",
  "attention_game",
  "memory_game",
  "logic_game",
  "motorik_game",
  "social_game",
  "completion"
];

export function useAssessmentFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [scores, setScores] = useState<Partial<DomainScores>>({});
  
  const currentStep = STEPS[currentStepIndex];

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const recordScore = useCallback((domain: Domain, score: number) => {
    setScores((prev) => ({ ...prev, [domain]: score }));
    nextStep();
  }, [nextStep]);

  const getAdaptationLevel = (score: number): AdaptationLevel => {
    if (score < 40) return "Priority Training";
    if (score <= 70) return "Balanced Training";
    return "Reinforcement Mode";
  };

  const getFinalResult = (): AssessmentResult | null => {
    if (currentStep !== "completion") return null;

    const fullScores = {
      Attention: scores.Attention ?? 0,
      Memory: scores.Memory ?? 0,
      Logic: scores.Logic ?? 0,
      Motorik: scores.Motorik ?? 0,
      Social: scores.Social ?? 0,
    };

    // Calculate confidence based on standard deviation of scores (mock logic)
    // If scores are highly inconsistent, confidence is lower, but normally confidence grows with more data.
    // We'll use a base confidence of 85% + random variation for demonstration as asked.
    const scoreValues = Object.values(fullScores);
    const avg = scoreValues.reduce((a, b) => a + b, 0) / 5;
    const variance = scoreValues.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / 5;
    const stdDev = Math.sqrt(variance);
    
    // High std dev = low consistency = lower confidence
    let confidenceLevel = 100 - (stdDev * 0.5); 
    confidenceLevel = Math.max(50, Math.min(99, Math.round(confidenceLevel)));

    const adaptation: Record<Domain, AdaptationLevel> = {
      Attention: getAdaptationLevel(fullScores.Attention),
      Memory: getAdaptationLevel(fullScores.Memory),
      Logic: getAdaptationLevel(fullScores.Logic),
      Motorik: getAdaptationLevel(fullScores.Motorik),
      Social: getAdaptationLevel(fullScores.Social),
    };

    return {
      scores: fullScores,
      confidenceLevel,
      adaptation,
    };
  };

  return {
    currentStep,
    scores,
    nextStep,
    recordScore,
    getFinalResult,
  };
}
