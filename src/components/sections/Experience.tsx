import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechList } from "@/components/ui/TechChip";
import { experience } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { formatRange } from "@/lib/dates";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Experience({ locale, dict }: Props) {
  const t = dict.experience;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-20 py-20 sm:py-24"
    >
      <div className="container-page">
        <SectionHeading id="experience-title" index={2} title={t.title} subtitle={t.subtitle} />

        <ol className="relative ml-2 border-l border-border sm:ml-3">
          {experience.map((item, index) => {
            const isCurrent = item.end === null;
            return (
              <li key={item.id} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1.5 -left-[7px] h-3.5 w-3.5 rounded-full border-2 border-bg",
                    isCurrent ? "bg-accent-2" : "bg-accent",
                  )}
                />
                <Reveal delay={index * 0.05}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-fg">{item.role[locale]}</h3>
                      <p className="mt-1 text-sm text-muted">{item.company}</p>
                    </div>
                    <p className="font-mono text-xs text-muted sm:text-right">
                      <time dateTime={item.start}>
                        {formatRange(item.start, item.end, locale, t.present)}
                      </time>
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {isCurrent ? <Badge tone="warning">{t.current}</Badge> : null}
                    <Badge>{t.modes[item.mode]}</Badge>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                      {item.location[locale]}
                    </span>
                  </div>

                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                    {item.highlights[locale].map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <TechList ids={item.stack} label={dict.hero.card.stack} className="mt-4" />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
