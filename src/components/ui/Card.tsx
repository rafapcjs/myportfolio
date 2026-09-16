import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type CardProps<T extends ElementType> = {
  as?: T;
  dashed?: boolean;
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Card<T extends ElementType = "div">({
  as,
  dashed = false,
  interactive = false,
  className,
  ...props
}: CardProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "rounded-lg border bg-surface p-6",
        dashed ? "border-dashed border-border" : "border-border",
        interactive && "transition-colors duration-200 hover:border-accent/60",
        className,
      )}
      {...props}
    />
  );
}
