import { useState, useCallback } from "react";
import type { PatternBuilderConfig } from "@/types/games/pattern-builder";

const DEFAULT_CONFIG: PatternBuilderConfig = {
  gameDurationMs: 5000,
  score: 75,
};

export function usePatternBuilder() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const startGameWithTimer = useCallback((config: PatternBuilderConfig = DEFAULT_CONFIG) => {
    startGame();
    setTimeout(() => {
      endGame();
    }, config.gameDurationMs);
  }, [startGame, endGame]);

  return {
    isPlaying,
    startGameWithTimer,
    score: DEFAULT_CONFIG.score,
  };
}
