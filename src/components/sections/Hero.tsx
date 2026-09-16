import { ArrowDown, Download } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonAnchor } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getTech, profile } from "@/data";
import { localeNames, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { withBasePath } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: Props) {
  const t = dict.hero;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_20%,transparent_100%)]"
      />

      <div className="relative container-page grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <Reveal>
          <p className="font-mono text-sm">
            <span className="text-muted">~/rafael $</span>{" "}
            <span className="text-accent">{t.prompt}</span>
          </p>
          <p className="mt-8 text-base text-muted">{t.greeting}</p>
          <h1
            id="hero-title"
            className="mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {profile.fullName}
          </h1>
          <p className="mt-4 text-xl font-medium text-accent sm:text-2xl">{profile.role[locale]}</p>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline[locale]}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonAnchor href="#projects">
              {t.viewProjects}
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </ButtonAnchor>
            <div
              role="group"
              aria-label={t.downloadCv}
              className="inline-flex h-11 items-stretch overflow-hidden rounded-md border border-border bg-surface text-sm font-medium"
            >
              <span className="inline-flex items-center gap-2 px-4 text-fg">
                <Download aria-hidden="true" className="h-4 w-4" />
                {t.downloadCv}
              </span>
              {locales.map((cvLocale) => (
                <a
                  key={cvLocale}
                  href={withBasePath(profile.cv[cvLocale])}
                  download={`CV_Rafael_Corredor_${cvLocale.toUpperCase()}.pdf`}
                  hrefLang={cvLocale}
                  lang={cvLocale}
                  aria-label={`${t.downloadCv} · ${localeNames[cvLocale]}`}
                  className="inline-flex items-center border-l border-border px-3 font-mono text-xs text-muted uppercase transition-colors duration-200 hover:bg-surface-2 hover:text-accent"
                >
                  {cvLocale}
                </a>
              ))}
            </div>
            <ButtonAnchor variant="ghost" href="#contact">
              {t.contact}
            </ButtonAnchor>
          </div>

          <SocialLinks className="mt-8" newTabLabel={dict.common.opensInNewTab} />
        </Reveal>

        <Reveal delay={0.15}>
          <HeroCard locale={locale} dict={dict} />
        </Reveal>
      </div>
    </section>
  );
}

function HeroCard({ locale, dict }: Props) {
  const t = dict.hero.card;
  const rows: Array<{ key: string; value: string | string[] }> = [
    { key: t.status, value: t.statusValue },
    { key: t.location, value: profile.location[locale] },
    { key: t.stack, value: profile.coreStack.map((id) => getTech(id).name) },
    {
      key: t.languages,
      value: profile.languages.map((l) => `${l.name[locale]} (${l.level[locale]})`),
    },
    { key: t.focus, value: t.focusValue },
  ];

  return (
    <div className="rounded-lg border border-border bg-surface shadow-2xl shadow-black/20 dark:shadow-black/50">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="ml-2 font-mono text-xs text-muted">{t.title}</span>
      </div>
      <dl className="space-y-3 p-5 font-mono text-sm leading-6">
        <span aria-hidden="true" className="text-muted">
          {"{"}
        </span>
        {rows.map((row) => (
          <div key={row.key} className="grid grid-cols-[auto_1fr] gap-x-3 pl-4">
            <dt className="text-accent-2">
              &quot;{row.key}&quot;<span className="text-muted">:</span>
            </dt>
            <dd className="text-fg">
              {Array.isArray(row.value) ? (
                <span className="flex flex-wrap gap-x-1">
                  <span className="text-muted">[</span>
                  {row.value.map((item, index) => (
                    <span key={item}>
                      &quot;{item}&quot;
                      {index < row.value.length - 1 ? <span className="text-muted">,</span> : null}
                    </span>
                  ))}
                  <span className="text-muted">]</span>
                </span>
              ) : (
                <>&quot;{row.value}&quot;</>
              )}
            </dd>
          </div>
        ))}
        <span aria-hidden="true" className="text-muted">
          {"}"}
        </span>
      </dl>
    </div>
  );
}
