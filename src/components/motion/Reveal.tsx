"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type RevealVariant = "up" | "left" | "right" | "pop";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small values (0.05–0.2) for staggered lists. */
  delay?: number;
  variant?: RevealVariant;
};

const variants: Record<RevealVariant, Variants> = {
  up: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } },
  pop: { hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1 } },
};

const transitions: Record<RevealVariant, Transition> = {
  up: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  left: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  right: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  pop: { type: "spring", stiffness: 320, damping: 18 },
};

/** Animates content into view once. Disabled when the user prefers reduced motion. */
export function Reveal({ children, className, delay = 0, variant = "up" }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : variants[variant]}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ ...transitions[variant], delay }}
    >
      {children}
    </motion.div>
  );
}
