"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  label: string;
};

/** Floating "back to top" button that appears after scrolling past the hero. */
export function BackToTop({ label }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          key="back-to-top"
          href="#home"
          aria-label={label}
          title={label}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed right-5 bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 text-muted shadow-lg shadow-black/20 backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUp aria-hidden="true" className="h-5 w-5" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
