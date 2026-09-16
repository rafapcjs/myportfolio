"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar showing how far the page has been scrolled. Purely decorative. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
    />
  );
}
