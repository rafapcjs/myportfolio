import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "sm" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg hover:brightness-110",
  secondary: "border border-border bg-surface text-fg hover:border-accent hover:text-accent",
  ghost: "text-muted hover:bg-surface-2 hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-3 text-sm",
  icon: "h-10 w-10",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize };

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  // React 19 forwards `ref` as a regular prop, so no forwardRef wrapper is needed.
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & StyleProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

/** Plain anchor for external URLs and downloads (next/link is not needed there). */
export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: ComponentPropsWithoutRef<"a"> & StyleProps) {
  return <a className={buttonClasses(variant, size, className)} {...props} />;
}
