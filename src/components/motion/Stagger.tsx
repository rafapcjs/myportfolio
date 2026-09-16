"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "ul" | "ol" | "li" | "span";

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  span: motion.span,
} as const;

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Seconds between each child. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
  /** Aria label forwarded to the element (useful for lists). */
  "aria-label"?: string;
};

/** Container that reveals its `StaggerItem` children one after another when scrolled into view. */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
  "aria-label": ariaLabel,
}: ContainerProps) {
  const reduceMotion = useReducedMotion();
  const Component = tags[as];

  return (
    <Component
      className={className}
      aria-label={ariaLabel}
      variants={reduceMotion ? undefined : containerVariants(stagger, delay)}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </Component>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
};

export function StaggerItem({ children, className, as = "div" }: ItemProps) {
  const reduceMotion = useReducedMotion();
  const Component = tags[as];

  return (
    <Component className={className} variants={reduceMotion ? undefined : itemVariants}>
      {children}
    </Component>
  );
}
