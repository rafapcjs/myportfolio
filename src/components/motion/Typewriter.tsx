"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds before typing starts. */
  startDelay?: number;
  className?: string;
};

/** Types `text` character by character with a blinking cursor. Screen readers get the full text at once. */
export function Typewriter({ text, speed = 90, startDelay = 500, className }: Props) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  // With reduced motion the full text is shown immediately (see `visible` below).
  useEffect(() => {
    if (reduceMotion) return;
    let shown = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        shown += 1;
        setCount(shown);
        if (shown >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, reduceMotion]);

  const visible = reduceMotion ? text : text.slice(0, count);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{visible}</span>
      <span
        aria-hidden="true"
        className="animate-blink ml-0.5 inline-block h-[1.1em] w-[0.55ch] translate-y-[0.1em] bg-accent"
      />
    </span>
  );
}
