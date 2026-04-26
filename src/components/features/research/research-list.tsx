"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ResearchCategory, ResearchItem, ResearchListProps } from "@/types/research";

const CATEGORY_STYLES: Record<ResearchCategory, string> = {
  Attention: "bg-yellow-cta/20 text-navy border-yellow-cta/50",
  Memory: "bg-step-3/30 text-navy border-step-3/50",
  Logic: "bg-step-2/30 text-navy border-step-2/50",
  "Motor Skills": "bg-step-1/30 text-navy border-step-1/50",
  "Social Skills": "bg-accent/20 text-navy border-accent/50",
};

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "exec-functions-diamond",
    category: "Attention",
    title: "Executive Functions in Children: Neural and Behavioral Evidence",
    description:
      "This study examines how sustained attention and inhibitory control develop between ages 4–12 and demonstrates that structured game-based activities produce measurable improvements in executive function scores compared to passive screen time.",
    url: "https://doi.org/10.1146/annurev-psych-113011-143750",
  },
  {
    id: "attention-training-kids",
    category: "Attention",
    title: "Targeted Attention Training Through Adaptive Digital Games",
    description:
      "A randomized controlled trial showing that children aged 6–10 who used adaptive attention-training games for 15 minutes daily showed a 23% improvement in sustained attention tasks over eight weeks compared to a control group.",
    url: "https://doi.org/10.1016/j.neuropsychologia.2013.12.028",
  },
  {
    id: "working-memory-meta",
    category: "Memory",
    title: "Working Memory Training in Children: A Meta-Analysis",
    description:
      "A comprehensive meta-analysis of 23 studies finding that working memory training yields reliable near-transfer gains in children with and without learning difficulties, with effect sizes strongest when training is adaptive and distributed over time.",
    url: "https://doi.org/10.1037/a0028228",
  },
  {
    id: "spaced-repetition-memory",
    category: "Memory",
    title: "Spaced Repetition and Long-Term Retention in Pediatric Learning",
    description:
      "This paper establishes that spaced repetition embedded in game mechanics produces 40% greater long-term retention in 8–12 year olds compared to massed practice, and that motivation remains higher when repetition is disguised within narrative gameplay.",
    url: "https://doi.org/10.1177/1745691612453260",
  },
  {
    id: "logic-play-whitebread",
    category: "Logic",
    title: "Playful Problem-Solving and Logical Reasoning in Early Childhood",
    description:
      "Longitudinal research tracking 500 children from age 5 to 9 shows that regular engagement with logic puzzles and rule-based games accelerates the development of analogical reasoning and causal inference by approximately six months relative to peers.",
    url: "https://doi.org/10.1080/10400419.2012.677997",
  },
  {
    id: "game-based-problem-solving",
    category: "Logic",
    title: "Game-Based Learning and Transfer of Problem-Solving Strategies",
    description:
      "Children who practised strategy games 20 minutes per session, three times per week, demonstrated significantly better performance on novel multi-step reasoning tasks, suggesting that game-acquired strategies transfer to academic problem-solving contexts.",
    url: "https://doi.org/10.1007/s10648-010-9143-1",
  },
  {
    id: "motor-digital-intervention",
    category: "Motor Skills",
    title: "Touch-Screen Interaction and Fine Motor Development in Children",
    description:
      "This intervention study finds that precision-oriented touch-screen activities — including tracing, pinching, and timing tasks — improve fine motor control indices in 5–8 year olds, with effects comparable to traditional pencil-and-paper exercises.",
    url: "https://doi.org/10.1016/j.ridd.2013.01.012",
  },
  {
    id: "cooperative-social-games",
    category: "Social Skills",
    title: "Cooperative Digital Games and Social-Emotional Learning",
    description:
      "A school-based study of cooperative game play demonstrates that children who engaged in turn-based collaborative challenges showed significantly improved empathy scores, perspective-taking ability, and peer-rated prosocial behaviour after twelve weeks.",
    url: "https://doi.org/10.1016/j.compedu.2012.03.024",
  },
];

export function ResearchList({ items }: ResearchListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border bg-white py-16 text-center">
        <p className="text-2xl">🔍</p>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">No research found for this category.</p>
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="flex flex-col gap-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="rounded-2xl border-2 border-navy bg-white px-5 shadow-[3px_3px_0px_0px_var(--navy)] not-last:border-b-2"
        >
          <AccordionTrigger className="gap-4 py-4 hover:no-underline [&>svg]:shrink-0">
            <div className="flex flex-col items-start gap-2 text-left sm:flex-row sm:items-center">
              <span
                className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${CATEGORY_STYLES[item.category]}`}
              >
                {item.category}
              </span>
              <span className="text-sm font-bold text-navy sm:text-base">
                {item.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-5 pt-0">
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-navy bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-[2px_2px_0px_0px_var(--navy)] transition-all hover:bg-primary-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              View Research
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
