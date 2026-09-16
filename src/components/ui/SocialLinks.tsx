import { socialLinks } from "@/data";
import { cn } from "@/lib/utils";

type Props = {
  /** Screen-reader suffix for external links, e.g. "(opens in a new tab)". */
  newTabLabel: string;
  size?: "md" | "lg";
  className?: string;
};

export function SocialLinks({ newTabLabel, size = "md", className }: Props) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialLinks.map(({ id, label, url, icon: Icon }) => (
        <li key={id}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent",
              size === "lg" ? "h-11 w-11" : "h-10 w-10",
            )}
          >
            <Icon aria-hidden="true" className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
            <span className="sr-only">
              {label} {newTabLabel}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
