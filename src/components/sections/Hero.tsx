import { ArrowDown, Download } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TiltCard } from "@/components/motion/TiltCard";
import { Typewriter } from "@/components/motion/Typewriter";
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
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-drift absolute -top-20 left-[15%] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="animate-drift-slow absolute top-1/3 -right-10 h-80 w-80 rounded-full bg-accent-2/10 blur-3xl" />
      </div>

      <div className="relative container-page grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <Stagger stagger={0.1}>
          <StaggerItem>
            <p className="font-mono text-sm">
              <span className="text-muted">~/rafael $</span>{" "}
              <Typewriter text={t.prompt} className="text-accent" />
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-8 text-base text-muted">{t.greeting}</p>
          </StaggerItem>
          <StaggerItem>
            <h1
              id="hero-title"
              className="mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {profile.fullName}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-xl font-medium text-accent sm:text-2xl">
              {profile.role[locale]}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-xl text-lg text-muted">{profile.tagline[locale]}</p>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-wrap gap-3">
            <ButtonAnchor href="#projects" className="group">
              {t.viewProjects}
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-y-0.5"
              />
            </ButtonAnchor>
            <div
              role="group"
              aria-label={t.downloadCv}
              className="inline-flex h-11 items-stretch overflow-hidden rounded-md border border-border bg-surface text-sm font-medium transition-[border-color,box-shadow] duration-200 hover:border-accent/60 motion-safe:hover:shadow-md motion-safe:hover:shadow-accent/10"
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
          </StaggerItem>

          <StaggerItem>
            <SocialLinks className="mt-8" newTabLabel={dict.common.opensInNewTab} />
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.35} variant="right">
          <TiltCard>
            <HeroCard locale={locale} dict={dict} />
          </TiltCard>
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
      <Stagger
        as="div"
        stagger={0.09}
        delay={0.6}
        className="space-y-3 p-5 font-mono text-sm leading-6"
      >
        <span aria-hidden="true" className="text-muted">
          {"{"}
        </span>
        <dl className="contents">
          {rows.map((row) => (
            <StaggerItem key={row.key} className="grid grid-cols-[auto_1fr] gap-x-3 pl-4">
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
                        {index < row.value.length - 1 ? (
                          <span className="text-muted">,</span>
                        ) : null}
                      </span>
                    ))}
                    <span className="text-muted">]</span>
                  </span>
                ) : (
                  <>&quot;{row.value}&quot;</>
                )}
              </dd>
            </StaggerItem>
          ))}
        </dl>
        <span aria-hidden="true" className="text-muted">
          {"}"}
        </span>
      </Stagger>
    </div>
  );
}
