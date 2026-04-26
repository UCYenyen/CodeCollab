"use client";

import { useRef, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RevealVariant, ScrollRevealOptions } from "@/types/animations";

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
