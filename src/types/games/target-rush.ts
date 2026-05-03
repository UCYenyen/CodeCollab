export type TargetType = "target" | "distractor";

export interface Target {
  id: number;
  x: number;
  y: number;
  type: TargetType;
  createdAt: number;
  clicked: boolean;
}

export interface TargetRushMetrics {
  totalTargets: number;
  correctClicks: number;
  incorrectClicks: number;
  missedTargets: number;
  reactionTimes: number[];
  accuracy: number;
  score: number;
}

export interface TargetRushConfig {
  gameDurationMs: number;
  targetDurationMs: number;
  spawnIntervalMs: number;
  distractorRatio: number;
  gameAreaWidth: number;
  gameAreaHeight: number;
}
