import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experience, profile } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { withBasePath } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function About({ locale, dict }: Props) {
  const t = dict.about;
  const current = experience[0];
  const studying = education.filter((e) => e.status === "in-progress").map((e) => e.degree[locale]);

  const facts: Array<{ label: string; value: string }> = [
    { label: t.location, value: profile.location[locale] },
    {
      label: t.languages,
      value: profile.languages.map((l) => `${l.name[locale]} · ${l.level[locale]}`).join(", "),
    },
    { label: t.studying, value: studying.join(" · ") },
  ];
  if (current) {
    facts.push({ label: t.currentRole, value: `${current.role[locale]} · ${current.company}` });
  }

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="about-title" index={1} title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <Reveal className="mx-auto w-full max-w-[300px] lg:mx-0">
            <figure className="group relative overflow-hidden rounded-lg border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent/60 motion-safe:hover:shadow-xl motion-safe:hover:shadow-accent/10">
              <Image
                src={withBasePath(profile.photo.src)}
                alt={profile.photo.alt[locale]}
                width={profile.photo.width}
                height={profile.photo.height}
                sizes="(min-width: 1024px) 300px, 80vw"
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent px-4 pt-10 pb-3 font-mono text-xs text-fg">
                <span className="text-accent">$</span> {profile.shortName}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal
            delay={0.05}
            className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-start-2"
          >
            {profile.summary[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <Card className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <h3 className="sr-only">{t.factsTitle}</h3>
              <dl className="contents">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-xs text-accent">{fact.label}</dt>
                    <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
