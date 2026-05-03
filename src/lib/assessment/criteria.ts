export type CriteriaKey = "attention" | "memory" | "logic" | "motoric" | "social";

export interface CriteriaInfo {
  key: CriteriaKey;
  name: string;
  emoji: string;
  description: string;
  measures: string;
  suggestions: {
    low: string[];
    mid: string[];
    high: string[];
  };
}

export const CRITERIA: Record<CriteriaKey, CriteriaInfo> = {
  attention: {
    key: "attention",
    name: "Attention",
    emoji: "🎯",
    description:
      "How well your child can focus on a task, filter out distractions, and stay on target.",
    measures:
      "Sustained focus, reaction speed, and the ability to ignore irrelevant stimuli.",
    suggestions: {
      low: [
        "Practice short 5-minute focus sessions daily, then gradually extend.",
        "Reduce environmental distractions (TV, phone) during play.",
        "Try simple tracking games like spotting a moving object.",
      ],
      mid: [
        "Introduce timed activities such as puzzles or memory games.",
        "Use a visual timer to build awareness of focus duration.",
        "Encourage one-task-at-a-time habits during homework.",
      ],
      high: [
        "Maintain consistency with daily focus games.",
        "Add complexity by introducing dual-task exercises.",
        "Celebrate sustained attention to reinforce the behavior.",
      ],
    },
  },
  memory: {
    key: "memory",
    name: "Memory",
    emoji: "🧠",
    description:
      "Your child's ability to recall, retain, and use information over short periods.",
    measures:
      "Working memory capacity, sequence recall, and short-term retention.",
    suggestions: {
      low: [
        "Play simple matching/pairs games with 4-6 cards.",
        "Repeat short songs or rhymes together every day.",
        "Ask your child to recall 3 items from a recent activity.",
      ],
      mid: [
        "Try Simon Says-style games to build sequence memory.",
        "Increase number of items to recall (5-7 items).",
        "Read a short story and ask key recall questions afterwards.",
      ],
      high: [
        "Introduce more complex sequences and patterns.",
        "Encourage memory journaling — recall the day in 3 sentences.",
        "Try trivia or word-recall games to keep it sharp.",
      ],
    },
  },
  logic: {
    key: "logic",
    name: "Logic",
    emoji: "🧩",
    description:
      "Your child's reasoning, pattern recognition, and problem-solving skills.",
    measures: "Pattern detection, sequencing, and rule-based reasoning.",
    suggestions: {
      low: [
        "Start with simple sorting and grouping (by color, size, shape).",
        "Solve 4-piece puzzles together.",
        "Ask 'what comes next?' with simple AB patterns.",
      ],
      mid: [
        "Introduce sudoku-for-kids or pattern-completion worksheets.",
        "Play board games involving simple rules and strategy.",
        "Build complex patterns with blocks and let your child copy.",
      ],
      high: [
        "Try logic puzzles like tangrams or rush-hour-style games.",
        "Encourage explaining their reasoning out loud.",
        "Introduce light coding apps (e.g., ScratchJr).",
      ],
    },
  },
  motoric: {
    key: "motoric",
    name: "Motorik",
    emoji: "✋",
    description:
      "Fine and gross motor coordination — how precisely your child can control movement.",
    measures: "Hand-eye coordination, precision, and reaction speed.",
    suggestions: {
      low: [
        "Practice simple drag-and-drop or tracing games.",
        "Try threading beads or stacking blocks.",
        "Daily play with balls — rolling, catching, gentle tossing.",
      ],
      mid: [
        "Introduce drawing within boundaries and cutting along lines.",
        "Try ball-bouncing, jump rope, or balance games.",
        "Build with smaller blocks (LEGO, etc.) for finger precision.",
      ],
      high: [
        "Try sports that demand timing (badminton, table tennis).",
        "Encourage handwriting practice or detailed drawing.",
        "Introduce musical instruments for advanced motor control.",
      ],
    },
  },
  social: {
    key: "social",
    name: "Social",
    emoji: "💛",
    description:
      "Emotional recognition, empathy, and understanding of social situations.",
    measures: "Emotion recognition and contextual social judgment.",
    suggestions: {
      low: [
        "Read picture books and discuss how characters feel.",
        "Use emoji cards to label everyday emotions.",
        "Practice naming feelings during real moments.",
      ],
      mid: [
        "Role-play common situations (sharing, losing a game).",
        "Watch shows together and pause to talk about emotions.",
        "Encourage 'feeling check-ins' once a day.",
      ],
      high: [
        "Discuss more complex emotions (jealousy, pride, embarrassment).",
        "Encourage perspective-taking ('how would they feel?').",
        "Volunteer or group-play to practice empathy in real settings.",
      ],
    },
  },
};

export function getScoreBand(score: number): "low" | "mid" | "high" {
  if (score < 40) return "low";
  if (score <= 70) return "mid";
  return "high";
}

export function getBandLabel(band: "low" | "mid" | "high"): string {
  switch (band) {
    case "low":
      return "Priority Training";
    case "mid":
      return "Balanced Training";
    case "high":
      return "Reinforcement Mode";
  }
}

export function getOverallSuggestion(scores: Record<CriteriaKey, number>): {
  overall: number;
  weakest: CriteriaKey;
  strongest: CriteriaKey;
  summary: string;
} {
  const entries = Object.entries(scores) as [CriteriaKey, number][];
  const overall = Math.round(
    entries.reduce((sum, [, v]) => sum + v, 0) / entries.length,
  );
  const sorted = [...entries].sort((a, b) => a[1] - b[1]);
  const weakest = sorted[0]?.[0] ?? "attention";
  const strongest = sorted[sorted.length - 1]?.[0] ?? "attention";

  let summary = "";
  if (overall >= 70) {
    summary = `Excellent overall progress! Your child shows strong cognitive development. Keep reinforcing skills and let ${CRITERIA[strongest].name.toLowerCase()} lead while gently building up ${CRITERIA[weakest].name.toLowerCase()}.`;
  } else if (overall >= 40) {
    summary = `Solid foundation with room to grow. Focus on strengthening ${CRITERIA[weakest].name.toLowerCase()} this week, and continue practicing ${CRITERIA[strongest].name.toLowerCase()} to maintain momentum.`;
  } else {
    summary = `Early stage — every small win counts. Prioritize ${CRITERIA[weakest].name.toLowerCase()} with daily short activities and celebrate every improvement to build confidence.`;
  }

  return { overall, weakest, strongest, summary };
}
