"use client";

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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? labels.switchToLight : labels.switchToDark}
      title={isDark ? labels.switchToLight : labels.switchToDark}
    >
      <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
    </Button>
  );
}
