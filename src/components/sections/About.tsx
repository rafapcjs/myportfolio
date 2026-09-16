import { ProfileCard } from "./ProfileCard";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experience, profile } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

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

        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} variant="right">
            <TiltCard maxTilt={4}>
              <ProfileCard locale={locale} dict={dict} />
            </TiltCard>
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
