export type RevealVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fade"
  | "scaleUp";

export type ScrollRevealOptions = {
  variant?: RevealVariant;
  distance?: number;
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  childrenSelector?: string;
  start?: string;
  once?: boolean;
  immediate?: boolean;
};
