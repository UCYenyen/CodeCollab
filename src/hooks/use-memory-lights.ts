import { useState, useCallback } from "react";
import type { MemoryLightsConfig } from "@/types/games/memory-lights";

const DEFAULT_CONFIG: MemoryLightsConfig = {
  gameDurationMs: 5000,
  score: 85,
};

export function useMemoryLights() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const startGameWithTimer = useCallback((config: MemoryLightsConfig = DEFAULT_CONFIG) => {
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
