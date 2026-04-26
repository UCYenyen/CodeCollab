export type ResearchCategory =
  | "Attention"
  | "Memory"
  | "Logic"
  | "Motor Skills"
  | "Social Skills";

export type ResearchFilter = ResearchCategory | "All";

export type ResearchItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResearchCategory;
};

export interface ResearchFilterProps {
  filter: ResearchFilter;
  onFilterChange: (filter: ResearchFilter) => void;
}

export interface ResearchListProps {
  items: ResearchItem[];
}
