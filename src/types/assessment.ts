export type Domain = 
  | "Attention" 
  | "Memory" 
  | "Logic" 
  | "Motorik" 
  | "Social";

export type AssessmentStep = 
  | "intro"
  | "attention_game"
  | "memory_game"
  | "logic_game"
  | "motorik_game"
  | "social_game"
  | "completion";

export interface GameMetrics {
  accuracy: number;
  reactionTimeMs?: number;
  falsePositives?: number;
  speedScore?: number;
  attempts?: number;
  maxSpan?: number;
}

export type DomainScores = Record<Domain, number>;

export type AdaptationLevel = "Priority Training" | "Balanced Training" | "Reinforcement Mode";

export interface AssessmentResult {
  scores: DomainScores;
  confidenceLevel: number; // 0 to 100 based on consistency
  adaptation: Record<Domain, AdaptationLevel>;
}

export interface GameProps {
  onComplete: (score: number, metrics: GameMetrics) => void;
}
