"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "./Button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
  value: string;
  label: string;
  copiedLabel: string;
};

export function CopyButton({ value, label, copiedLabel }: Props) {
  const { copied, copy } = useCopyToClipboard();
  const Icon = copied ? Check : Copy;

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => void copy(value)}
      aria-label={copied ? copiedLabel : label}
      className={copied ? "border-accent text-accent" : undefined}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </Button>
  );
}
