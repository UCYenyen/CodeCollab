import { useState, useRef, useCallback } from "react";
import type { GameMetrics } from "@/types/assessment";

interface UseGameMetricsProps {
  onComplete: (score: number, metrics: GameMetrics) => void;
}

export function useGameMetrics({ onComplete }: UseGameMetricsProps) {
  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [falsePositives, setFalsePositives] = useState(0);
  
  const startTime = useRef<number>(Date.now());

  const recordAttempt = useCallback((isCorrect: boolean) => {
    setAttempts((prev) => prev + 1);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setFalsePositives((prev) => prev + 1);
    }
  }, []);

  const finishGame = useCallback(
    (customScoreCalculator?: (metrics: GameMetrics) => number) => {
      const endTime = Date.now();
      const timeTakenMs = endTime - startTime.current;
      
      const accuracy = attempts > 0 ? correctAnswers / attempts : 0;
      
      // Speed score logic (normalized, assuming 10s is perfect, 30s is poor for general tasks)
      // This is a generic default speed score, can be overridden by specific games
      const expectedTimeMs = 15000;
      let speedScore = 1 - (timeTakenMs - expectedTimeMs) / expectedTimeMs;
      speedScore = Math.max(0, Math.min(1, speedScore));

      const metrics: GameMetrics = {
        accuracy,
        reactionTimeMs: timeTakenMs / (attempts || 1), // average time per attempt
        falsePositives,
        speedScore,
        attempts,
      };

      let finalScore = 0;
      if (customScoreCalculator) {
        finalScore = customScoreCalculator(metrics);
      } else {
        // Generic fallback formula
        finalScore = (accuracy * 0.7 + speedScore * 0.3) * 100;
      }

      // Normalize 0-100
      finalScore = Math.max(0, Math.min(100, Math.round(finalScore)));

      onComplete(finalScore, metrics);
    },
    [attempts, correctAnswers, falsePositives, onComplete]
  );

  return {
    attempts,
    correctAnswers,
    falsePositives,
    recordAttempt,
    finishGame,
  };
}
