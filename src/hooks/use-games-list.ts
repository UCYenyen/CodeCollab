import { useMemo } from "react";
import { CRITERIA, type CriteriaKey } from "@/lib/assessment/criteria";
import type { GameInfo, GameCategoryData } from "@/types/games-list";

const ALL_GAMES: GameInfo[] = [
  {
    id: "target-rush",
    name: "Target Rush",
    description: "Test your focus and reaction speed by tapping the correct targets before they disappear.",
    category: "attention",
    href: "/dashboard/games/target-rush",
  },
  {
    id: "memory-lights",
    name: "Memory Lights",
    description: "Watch the pattern of flashing lights and try to repeat it. How far can you go?",
    category: "memory",
    href: "/dashboard/games/memory-lights",
  },
  {
    id: "pattern-builder",
    name: "Pattern Builder",
    description: "Identify the missing piece in a sequence to train your logical reasoning.",
    category: "logic",
    href: "/dashboard/games/pattern-builder",
  },
  {
    id: "drag-precision",
    name: "Drag Precision",
    description: "Carefully drag objects into their correct slots to improve fine motor skills.",
    category: "motoric",
    href: "/dashboard/games/drag-precision",
  },
  {
    id: "emotion-match",
    name: "Emotion Match",
    description: "Match facial expressions to the correct emotion to build social awareness.",
    category: "social",
    href: "/dashboard/games/emotion-match",
  }
];

export function useGamesList() {
  const categories = useMemo(() => {
    const grouped: Record<CriteriaKey, GameInfo[]> = {
      attention: [],
      memory: [],
      logic: [],
      motoric: [],
      social: [],
    };

    ALL_GAMES.forEach((game) => {
      grouped[game.category].push(game);
    });

    const categoryData: GameCategoryData[] = (Object.keys(CRITERIA) as CriteriaKey[]).map((key) => {
      const criteria = CRITERIA[key];
      return {
        category: key,
        title: criteria.name,
        emoji: criteria.emoji,
        description: criteria.description,
        games: grouped[key] || [],
      };
    });

    return categoryData;
  }, []);

  const allGames = ALL_GAMES;

  return { categories, allGames };
}
