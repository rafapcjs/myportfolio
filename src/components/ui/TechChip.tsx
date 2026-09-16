import { getTech, type TechId } from "@/data/tech";
import { cn } from "@/lib/utils";

type Props = {
  id: TechId;
  size?: "sm" | "md";
  className?: string;
};

/** Technology chip with its brand icon. Renders as a list item so parents can use <ul>. */
export function TechChip({ id, size = "sm", className }: Props) {
  const tech = getTech(id);
  const Icon = tech.icon;
  return (
    <li
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 font-mono text-muted transition-colors duration-200 hover:border-accent/60 hover:text-fg",
        size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className,
      )}
    >
      <Icon aria-hidden="true" className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {tech.name}
    </li>
  );
}

export function TechList({
  ids,
  size = "sm",
  label,
  className,
}: {
  ids: readonly TechId[];
  size?: "sm" | "md";
  label: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {ids.map((id) => (
        <TechChip key={id} id={id} size={size} />
      ))}
    </ul>
  );
}
