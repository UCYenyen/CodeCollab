import { useState, useCallback, useRef, useEffect } from "react";
import type { Target, TargetRushMetrics, TargetRushConfig } from "@/types/games/target-rush";

const DEFAULT_CONFIG: TargetRushConfig = {
  gameDurationMs: 30000,
  targetDurationMs: 1500,
  spawnIntervalMs: 600,
  distractorRatio: 0.3,
  gameAreaWidth: 600,
  gameAreaHeight: 400,
};

export function useTargetRush() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [metrics, setMetrics] = useState<TargetRushMetrics>({
    totalTargets: 0,
    correctClicks: 0,
    incorrectClicks: 0,
    missedTargets: 0,
    reactionTimes: [],
    accuracy: 0,
    score: 0,
  });

  const gameStateRef = useRef({
    startTime: 0,
    targetIdCounter: 0,
    clickedTargets: new Set<number>(),
  });

  const generateRandomPosition = useCallback(
    (config: TargetRushConfig) => {
      const padding = 40;
      const x = Math.random() * (config.gameAreaWidth - padding * 2) + padding;
      const y = Math.random() * (config.gameAreaHeight - padding * 2) + padding;
      return { x, y };
    },
    []
  );

  const spawnTarget = useCallback(
    (config: TargetRushConfig) => {
      const { x, y } = generateRandomPosition(config);
      const isDistractor = Math.random() < config.distractorRatio;
      const newTarget: Target = {
        id: gameStateRef.current.targetIdCounter++,
        x,
        y,
        type: isDistractor ? "distractor" : "target",
        createdAt: Date.now(),
        clicked: false,
      };

      setTargets((prev) => [...prev, newTarget]);

      const removeTimer = setTimeout(() => {
        setTargets((prev) =>
          prev.map((t) =>
            t.id === newTarget.id ? { ...t, clicked: true } : t
          )
        );

        setTimeout(() => {
          setTargets((prev) => prev.filter((t) => t.id !== newTarget.id));
          if (newTarget.type === "target" && !gameStateRef.current.clickedTargets.has(newTarget.id)) {
            setMetrics((prev) => ({
              ...prev,
              missedTargets: prev.missedTargets + 1,
            }));
          }
        }, 200);
      }, config.targetDurationMs);

      return () => clearTimeout(removeTimer);
    },
    [generateRandomPosition]
  );

  const handleTargetClick = useCallback(
    (targetId: number, targetType: "target" | "distractor") => {
      if (gameStateRef.current.clickedTargets.has(targetId)) return;
      gameStateRef.current.clickedTargets.add(targetId);

      const clickedTarget = targets.find((t) => t.id === targetId);
      if (!clickedTarget) return;

      const reactionTime = Date.now() - clickedTarget.createdAt;

      setTargets((prev) =>
        prev.map((t) =>
          t.id === targetId ? { ...t, clicked: true } : t
        )
      );

      setMetrics((prev) => {
        const isCorrect = targetType === "target";
        const newMetrics = {
          ...prev,
          correctClicks: isCorrect ? prev.correctClicks + 1 : prev.correctClicks,
          incorrectClicks: !isCorrect ? prev.incorrectClicks + 1 : prev.incorrectClicks,
          reactionTimes: isCorrect ? [...prev.reactionTimes, reactionTime] : prev.reactionTimes,
        };

        const correctClicksCount = newMetrics.correctClicks + newMetrics.incorrectClicks;
        newMetrics.accuracy = correctClicksCount > 0 ? (newMetrics.correctClicks / correctClicksCount) * 100 : 0;
        newMetrics.score = Math.max(0, newMetrics.correctClicks * 10 - newMetrics.incorrectClicks * 5);

        return newMetrics;
      });

      setTimeout(() => {
        setTargets((prev) => prev.filter((t) => t.id !== targetId));
      }, 100);
    },
    [targets]
  );

  const startGame = useCallback(() => {
    setIsGameActive(true);
    gameStateRef.current.startTime = Date.now();
    gameStateRef.current.targetIdCounter = 0;
    gameStateRef.current.clickedTargets.clear();
    setMetrics({
      totalTargets: 0,
      correctClicks: 0,
      incorrectClicks: 0,
      missedTargets: 0,
      reactionTimes: [],
      accuracy: 0,
      score: 0,
    });
    setTargets([]);
  }, []);

  const endGame = useCallback(() => {
    setIsGameActive(false);
    setTargets([]);
  }, []);

  useEffect(() => {
    if (!isGameActive) return;

    const spawnTimer = setInterval(() => {
      spawnTarget(DEFAULT_CONFIG);
    }, DEFAULT_CONFIG.spawnIntervalMs);

    const gameTimer = setTimeout(() => {
      endGame();
    }, DEFAULT_CONFIG.gameDurationMs);

    return () => {
      clearInterval(spawnTimer);
      clearTimeout(gameTimer);
    };
  }, [isGameActive, spawnTarget, endGame]);

  return {
    targets,
    isGameActive,
    metrics,
    startGame,
    endGame,
    handleTargetClick,
  };
}
