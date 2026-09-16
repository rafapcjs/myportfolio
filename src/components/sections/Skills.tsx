import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechList } from "@/components/ui/TechChip";
import { skillCategories } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Skills({ locale, dict }: Props) {
  const t = dict.skills;

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="skills-title" index={4} title={t.title} subtitle={t.subtitle} />

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const name = category.name[locale];
            return (
              <li key={category.id} className="flex">
                <Reveal delay={(index % 4) * 0.06} className="flex w-full">
                  <Card className="w-full">
                    <h3 className="flex items-center gap-2 text-base font-semibold">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      {name}
                    </h3>
                    <TechList ids={category.skills} size="md" label={name} className="mt-4" />
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
