import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { education, profile, skillCategories, socialLinks, techRegistry } from "@/data";
import { siteConfig } from "./site";

const ogLocale: Record<Locale, string> = { es: "es_CO", en: "en_US" };

/** Absolute URL of a locale home page, including basePath. */
export function localeUrl(locale: Locale): string {
  return `${siteConfig.url}${siteConfig.basePath}/${locale}/`;
}

export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/`]));

  return {
    metadataBase: new URL(`${siteConfig.url}${siteConfig.basePath}`),
    title: {
      default: dict.meta.title,
      template: `%s · ${profile.shortName}`,
    },
    description: dict.meta.description,
    applicationName: profile.shortName,
    authors: [{ name: profile.fullName, url: localeUrl(locale) }],
    creator: profile.fullName,
    keywords: [
      "Full Stack Developer",
      "DevOps Engineer",
      "Spring Boot",
      "Angular",
      "TypeScript",
      "AWS",
      "Azure DevOps",
      "RAG",
      "MCP",
      "Colombia",
    ],
    alternates: {
      canonical: `/${locale}/`,
      languages: { ...languages, "x-default": "/es/" },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: `/${locale}/`,
      siteName: profile.shortName,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: "/images/og.png", width: 1200, height: 630, alt: profile.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

/** Schema.org Person, injected as JSON-LD. */
export function buildPersonJsonLd(locale: Locale): Record<string, unknown> {
  const knowsAbout = skillCategories.flatMap((c) => c.skills.map((id) => techRegistry[id].name));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.shortName,
    jobTitle: profile.role[locale],
    description: profile.tagline[locale],
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: localeUrl(locale),
    image: `${siteConfig.url}${siteConfig.basePath}${profile.photo.src}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cereté",
      addressRegion: "Córdoba",
      addressCountry: "CO",
    },
    sameAs: socialLinks.map((s) => s.url),
    knowsAbout: Array.from(new Set(knowsAbout)),
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
    knowsLanguage: profile.languages.map((l) => l.name.en),
  };
}

/** Serializes JSON-LD safely for inline <script> usage. */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
