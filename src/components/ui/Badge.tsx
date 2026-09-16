import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "accent" | "warning";

const tones: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-2 text-muted",
  accent: "border-accent/40 bg-accent/10 text-accent",
  warning: "border-accent-2/40 bg-accent-2/10 text-accent-2",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentPropsWithoutRef<"span"> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 tracking-wide uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
