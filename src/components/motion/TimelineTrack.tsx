"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Vertical timeline rail whose accent line draws itself as the user scrolls through the content. */
export function TimelineTrack({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 75%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-border" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
        className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent"
      />
      {children}
    </div>
  );
}
