import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, education } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { formatRange } from "@/lib/dates";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Education({ locale, dict }: Props) {
  const t = dict.education;

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="scroll-mt-20 py-20 sm:py-24"
    >
      <div className="container-page">
        <SectionHeading id="education-title" index={5} title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase">
              <GraduationCap aria-hidden="true" className="h-4 w-4 text-accent" />
              {t.educationTitle}
            </h3>
            <ol className="space-y-4">
              {education.map((item, index) => {
                const hasDates = item.start !== null || item.end !== null;
                return (
                  <li key={item.id}>
                    <Reveal delay={index * 0.05}>
                      <Card className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="text-base font-semibold text-fg">{item.degree[locale]}</h4>
                          <p className="mt-1 text-sm text-muted">
                            {item.institution} · {item.country[locale]}
                          </p>
                          {item.note ? (
                            <p className="mt-1 font-mono text-xs text-muted">{item.note[locale]}</p>
                          ) : null}
                        </div>
                        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                          <Badge tone={item.status === "in-progress" ? "warning" : "accent"}>
                            {t.status[item.status]}
                          </Badge>
                          {hasDates ? (
                            <p className="font-mono text-xs text-muted">
                              {formatRange(item.start, item.end, locale, t.present)}
                            </p>
                          ) : null}
                        </div>
                      </Card>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase">
              <Award aria-hidden="true" className="h-4 w-4 text-accent" />
              {t.certificationsTitle}
            </h3>
            <ul className="space-y-4">
              {certifications.map((cert, index) => (
                <li key={cert.id}>
                  <Reveal delay={index * 0.05}>
                    <Card className="p-5">
                      <h4 className="text-base font-semibold text-fg">{cert.name[locale]}</h4>
                      {cert.issuer ? (
                        <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                      ) : null}
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
                        >
                          {t.viewCredential}
                          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                          <span className="sr-only"> {dict.common.opensInNewTab}</span>
                        </a>
                      ) : null}
                    </Card>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
