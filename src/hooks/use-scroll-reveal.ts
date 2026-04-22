"use client";

import { useRef, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type RevealVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fade"
  | "scaleUp";

export type ScrollRevealOptions = {
  variant?: RevealVariant;
  /** Translation distance in px (default: 50) */
  distance?: number;
  /** Animation duration in seconds (default: 0.75) */
  duration?: number;
  ease?: string;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** Stagger time between children in seconds (default: 0) */
  stagger?: number;
  /** CSS selector for children to stagger — e.g. ":scope > *" */
  childrenSelector?: string;
  /** ScrollTrigger start position (default: "top 85%") */
  start?: string;
  /** Animate only the first time the element enters view (default: false) */
  once?: boolean;
  /** Skip ScrollTrigger and animate immediately on mount (for above-the-fold elements) */
  immediate?: boolean;
};

const VARIANT_FROM: Record<RevealVariant, (d: number) => gsap.TweenVars> = {
  fadeUp:    (d) => ({ opacity: 0, y: d }),
  fadeDown:  (d) => ({ opacity: 0, y: -d }),
  fadeLeft:  (d) => ({ opacity: 0, x: d }),
  fadeRight: (d) => ({ opacity: 0, x: -d }),
  fade:      ()  => ({ opacity: 0 }),
  scaleUp:   (d) => ({ opacity: 0, scale: 0.9, y: d * 0.5 }),
};

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    const {
      variant = "fadeUp",
      distance = 50,
      duration = 0.75,
      ease = "power3.out",
      delay = 0,
      stagger = 0,
      childrenSelector,
      start = "top 85%",
      once = false,
      immediate = false,
    } = options;

    const targets = childrenSelector
      ? el.querySelectorAll(childrenSelector)
      : el;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...VARIANT_FROM[variant](distance),
        duration,
        ease,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start,
              once,
              toggleActions: once ? undefined : "restart none none reset",
            },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}
