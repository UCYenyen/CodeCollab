import { useState, useCallback } from "react";
import type { DragPrecisionConfig } from "@/types/games/drag-precision";

const DEFAULT_CONFIG: DragPrecisionConfig = {
  gameDurationMs: 5000,
  score: 90,
};

export function useDragPrecision() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const startGameWithTimer = useCallback((config: DragPrecisionConfig = DEFAULT_CONFIG) => {
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
