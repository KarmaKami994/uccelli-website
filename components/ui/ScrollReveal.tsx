"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({ children, className = "", delay = 0, y = 40, duration = 0.8, once = true }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.set(el, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: "power3.out" });
      },
    });

    return () => { trigger.kill(); };
  }, [delay, y, duration, once]);

  return <div ref={ref} className={className}>{children}</div>;
}
