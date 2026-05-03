import { useState, useCallback } from "react";
import type { EmotionMatchConfig } from "@/types/games/emotion-match";

const DEFAULT_CONFIG: EmotionMatchConfig = {
  gameDurationMs: 5000,
  score: 60,
};

export function useEmotionMatch() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const startGameWithTimer = useCallback((config: EmotionMatchConfig = DEFAULT_CONFIG) => {
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
