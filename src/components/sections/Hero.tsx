import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TiltCard } from "@/components/motion/TiltCard";
import { Typewriter } from "@/components/motion/Typewriter";
import { ButtonAnchor } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data";
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

      <div className="relative container-page grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center">
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

        <Reveal delay={0.2} variant="pop" className="order-first lg:order-none">
          <TiltCard className="mx-auto w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[380px]">
            <figure className="group relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-accent/40 via-accent/5 to-accent-2/30 blur-xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/30">
                <Image
                  src={withBasePath(profile.photo.src)}
                  alt={profile.photo.alt[locale]}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 280px, 220px"
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent px-4 pt-10 pb-3 font-mono text-xs text-fg">
                  <span className="text-accent">$</span> {profile.shortName}
                  <span className="animate-blink ml-1 text-accent">_</span>
                </figcaption>
              </div>
            </figure>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
