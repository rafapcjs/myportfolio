"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  labels: { switchToLight: string; switchToDark: string };
};

const subscribe = () => () => {};

export function ThemeToggle({ labels }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  // Theme is unknown during SSR; render a neutral placeholder until hydrated to avoid mismatches.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <span aria-hidden="true" className="inline-block h-10 w-10" />;
  }

  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? labels.switchToLight : labels.switchToDark;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex"
        >
          <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
