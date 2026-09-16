import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getTech, type TechId } from "@/data/tech";
import { cn } from "@/lib/utils";

type Size = "sm" | "md";

type ChipProps = {
  id: TechId;
  size?: Size;
  className?: string;
};

/** Technology chip with its brand icon. Renders as a list item so parents can use <ul>. */
export function TechChip({ id, size = "sm", className }: ChipProps) {
  const tech = getTech(id);
  const Icon = tech.icon;
  return (
    <StaggerItem
      as="li"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 font-mono text-muted transition-[color,border-color,transform,box-shadow] duration-200 hover:border-accent/60 hover:text-fg motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:hover:shadow-accent/10",
        size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className,
      )}
    >
      <Icon aria-hidden="true" className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {tech.name}
    </StaggerItem>
  );
}

type ListProps = {
  ids: readonly TechId[];
  size?: Size;
  label: string;
  className?: string;
};

/** Staggered list of technology chips. */
export function TechList({ ids, size = "sm", label, className }: ListProps) {
  return (
    <Stagger
      as="ul"
      stagger={0.04}
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {ids.map((id) => (
        <TechChip key={id} id={id} size={size} />
      ))}
    </Stagger>
  );
}
