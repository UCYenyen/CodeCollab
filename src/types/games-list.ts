import type { CriteriaKey } from "@/lib/assessment/criteria";

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  category: CriteriaKey;
  href: string;
}

export interface GameCategoryData {
  category: CriteriaKey;
  title: string;
  emoji: string;
  description: string;
  games: GameInfo[];
}
