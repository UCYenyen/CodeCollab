"use client";

import Link from "next/link";
import { ExternalLink, CheckCircle2 } from "lucide-react";
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
  General: "bg-primary/20 text-navy border-primary/50",
  "Parent Engagement": "bg-green-500/20 text-green-900 border-green-500/50",
};

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "gui-meta-analysis-2024",
    category: "General",
    title: "Game-Based Learning in Early Childhood Education",
    description: "A systematic review and meta-analysis confirming game-based learning as a highly effective tool for early educators (Gui et al., 2024).",
    keyPoints: [
      "Demonstrated significant positive effects on cognitive development (g = 0.46).",
      "Measurable improvements in social (g = 0.38) and emotional development (g = 0.35).",
      "Confirmed moderate-to-large effect sizes in increasing student motivation and engagement."
    ],
    url: "https://doi.org/10.3389/fpsyg.2024.1307881",
  },
  {
    id: "collantes-ef-2024",
    category: "Attention",
    title: "Serious Games for Executive Functions in Neurodiverse Populations",
    description: "A systematic review of 16 studies examining how structured digital games influence executive functioning (Collantes et al., 2024).",
    keyPoints: [
      "15 out of 16 studies reported significant improvements in executive function domains.",
      "Most consistently replicated improvements were found in attention and inhibitory control.",
      "Validated the use of interactive digital challenges to build cognitive flexibility."
    ],
    url: "https://doi.org/10.2196/59053",
  },
  {
    id: "miri-adhd-2025",
    category: "Attention",
    title: "Serious Games as Digital Therapeutics for ADHD",
    description: "A comprehensive review of 35 RCTs indicating serious games can act as digital therapeutics for attention challenges (Miri et al., 2025).",
    keyPoints: [
      "89% of trials showed children exhibited a highly positive attitude toward game interventions.",
      "Measurable decreases in hyperactivity-impulsivity and increases in sustained attention.",
      "Neuroimaging (EEG) supported the efficacy, showing active changes in alpha and beta brainwave bands."
    ],
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12093074/",
  },
  {
    id: "rahimi-wm-2017",
    category: "Memory",
    title: "Working Memory Training in the Form of Structured Games",
    description: "A controlled study testing the practical application of game mechanics on long-term working memory retention (Rahimi et al., 2017).",
    keyPoints: [
      "Produced significant improvement in post-test working memory measures.",
      "Correlated with a significant reduction in parents' reports of daily inattentiveness.",
      "Concluded that structured games benefit both neurotypical and neurodiverse children in building academic mind skills."
    ],
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5206324/",
  },
  {
    id: "abedi-minecraft-2023",
    category: "Memory",
    title: "Working Memory Training using Adaptive Stepwise Methods",
    description: "Research examining adaptive, self-select working memory training delivered in short 20-minute digital sessions (Abedi et al., 2023).",
    keyPoints: [
      "Demonstrated near, intermediate, and far transfer gains in working memory.",
      "Proved that durable cognitive benefits can be achieved in structured bursts of 20 minutes or less.",
      "Validated the importance of adaptive difficulty systems that scale to the child's real-time performance."
    ],
    url: "https://doi.org/10.2196/45326",
  },
  {
    id: "liu-vr-motor-2025",
    category: "Motor Skills",
    title: "Effects of Virtual Reality Motor Games on Motor Skills",
    description: "A large-scale meta-analysis of 19 studies involving 850 children, testing technology-based motor interventions (Liu et al., 2025).",
    keyPoints: [
      "Found technology-based motor games significantly improve fine motor control.",
      "Demonstrated a large, statistically significant effect size (SMD = 0.73).",
      "Established digital interfaces as active training environments rather than passive screen time."
    ],
    url: "https://doi.org/10.3389/fpsyg.2024.1483370",
  },
  {
    id: "rukmini-fine-motor-2024",
    category: "Motor Skills",
    title: "Impact of Technology-Based Games on Fine Motor Development",
    description: "A targeted study measuring the physical development outcomes of interactive digital tablet applications (Rukmini et al., 2024).",
    keyPoints: [
      "The number of children scoring 'good' in fine motor ability jumped from 21.4% to 57.1%.",
      "Results proved statistically significant (p = .000), proving physical translation of digital actions.",
      "Tasks like precision-dragging and timed-tapping directly transfer to real-world dexterity."
    ],
    url: "https://adihusada.ac.id/jurnal/index.php/AHNJ/article/download/628/411",
  },
  {
    id: "villadangos-sel-2025",
    category: "Social Skills",
    title: "Gamified Socio-Emotional Learning for Children",
    description: "A thematic analysis synthesizing data from 122 peer-reviewed studies on gamified social-emotional development (Villadangos et al., 2025).",
    keyPoints: [
      "Confirmed gamified environments promote emotional regulation and proactive coping skills.",
      "Demonstrated reliable increases in interpersonal communication and prosocial behaviour.",
      "Explicitly linked strong social-emotional outcomes to accelerated cognitive and psychomotor growth."
    ],
    url: "https://www.ejosdr.com",
  },
  {
    id: "swartz-brain-agents-2025",
    category: "Social Skills",
    title: "Game-Based Social-Emotional Learning: A Pilot Study",
    description: "A pilot study testing a trauma-informed, game-based social-emotional intervention in middle schools (Swartz et al., 2025).",
    keyPoints: [
      "Positively impacted real-world resilience and stress-coping behaviours.",
      "Younger students showed the highest engagement metrics with the digital narrative formats.",
      "Validated video games as a safe, highly effective sandbox for practicing emotional responses."
    ],
    url: "https://doi.org/10.2196/67550",
  },
  {
    id: "camilleri-parents-2021",
    category: "Parent Engagement",
    title: "Parents' Acceptance of Educational Technology",
    description: "A cross-national study examining the predictors of parental involvement in children's digital learning (Camilleri et al., 2021).",
    keyPoints: [
      "Parents are significantly more engaged when provided with structured, transparent technological tools.",
      "Automated reports and accessible data metrics successfully convert parental concern into active participation.",
      "Ease of use and clear facilitating conditions are the strongest predictors of long-term parent adoption."
    ],
    url: "https://doi.org/10.3389/fpsyg.2021.719430",
  }
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
            <p className="mb-4 text-sm font-medium leading-relaxed text-navy/80">
              {item.description}
            </p>
            
            <div className="mb-5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Findings</h4>
              <ul className="space-y-2">
                {item.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border-2 border-navy bg-primary px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0px_0px_var(--navy)] transition-all hover:bg-primary-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Read Full Paper
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
