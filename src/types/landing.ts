import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cardBg: string;
  numberBg: string;
  numberText: string;
};

export type TrustStat = {
  icon: LucideIcon;
  label: string;
  color: string;
};

export type Feature = {
  icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
};

export type DomainRow = {
  emoji: ReactNode;
  label: string;
  value: string;
  valueColor: string;
  barColor: string;
  barWidth: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  cardBackground: string;
};

export type WaveDividerProps = {
  className?: string;
  flip?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};
