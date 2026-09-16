import { ExternalLink, FolderGit2, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechList } from "@/components/ui/TechChip";
import { projects } from "@/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Project, ProjectStatus } from "@/types/content";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const statusTone: Record<ProjectStatus, "accent" | "warning" | "neutral"> = {
  done: "accent",
  "in-progress": "warning",
  planned: "neutral",
};

export function Projects({ locale, dict }: Props) {
  const t = dict.projects;

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="projects-title" index={3} title={t.title} subtitle={t.subtitle} />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id} className="flex">
              <Reveal delay={(index % 3) * 0.08} className="flex w-full">
                <ProjectCard project={project} locale={locale} dict={dict} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, locale, dict }: { project: Project } & Props) {
  const t = dict.projects;

  return (
    <Card
      as="article"
      dashed={project.placeholder}
      interactive={!project.placeholder}
      aria-labelledby={`project-${project.id}`}
      className="flex w-full flex-col gap-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={statusTone[project.status]}>{t.status[project.status]}</Badge>
        {project.placeholder ? <Badge>{t.placeholderBadge}</Badge> : null}
      </div>

      <h3 id={`project-${project.id}`} className="text-lg leading-snug font-semibold text-fg">
        {project.title[locale]}
      </h3>

      <p className="text-sm leading-relaxed text-muted">{project.description[locale]}</p>

      <div className="rounded-md border border-border bg-surface-2 p-3 text-sm leading-relaxed">
        <p className="font-mono text-xs text-accent">{t.problem}</p>
        <p className="mt-1 text-muted">{project.problem[locale]}</p>
      </div>

      {project.confidential ? (
        <p className="flex items-start gap-2 text-xs text-muted">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {t.confidential}
        </p>
      ) : null}

      <TechList ids={project.stack} label={dict.hero.card.stack} className="mt-auto" />

      <div className="flex flex-wrap gap-4 border-t border-border pt-4 font-mono text-xs">
        <ProjectLink
          href={project.repoUrl}
          label={t.repo}
          fallback={t.comingSoon}
          icon={FolderGit2}
          newTabLabel={dict.common.opensInNewTab}
        />
        <ProjectLink
          href={project.demoUrl}
          label={t.demo}
          fallback={t.comingSoon}
          icon={ExternalLink}
          newTabLabel={dict.common.opensInNewTab}
        />
      </div>
    </Card>
  );
}

function ProjectLink({
  href,
  label,
  fallback,
  icon: Icon,
  newTabLabel,
}: {
  href: string | null;
  label: string;
  fallback: string;
  icon: typeof ExternalLink;
  newTabLabel: string;
}) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted/70">
        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
        {label} · {fallback}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-fg transition-colors duration-200 hover:text-accent"
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {label}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
