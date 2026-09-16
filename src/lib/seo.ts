import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { education, experience, profile, skillCategories, socialLinks, techRegistry } from "@/data";
import { siteConfig } from "./site";

const ogLocale: Record<Locale, string> = { es: "es_CO", en: "en_US" };
const bcp47: Record<Locale, string> = { es: "es-CO", en: "en-US" };

/** Absolute site root including basePath, without trailing slash. */
export const siteRoot = `${siteConfig.url}${siteConfig.basePath}`;

/** Absolute URL of a locale home page, including basePath. */
export function localeUrl(locale: Locale): string {
  return `${siteRoot}/${locale}/`;
}

export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/`]));
  const googleVerification = siteConfig.googleSiteVerification;

  return {
    metadataBase: new URL(siteRoot),
    title: {
      default: dict.meta.title,
      template: `%s · ${profile.shortName}`,
    },
    description: dict.meta.description,
    applicationName: profile.shortName,
    authors: [{ name: profile.fullName, url: localeUrl(locale) }],
    creator: profile.fullName,
    publisher: profile.fullName,
    keywords: dict.meta.keywords,
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: `/${locale}/`,
      languages: { ...languages, "x-default": "/es/" },
    },
    openGraph: {
      type: "profile",
      firstName: "Rafael Alfonso",
      lastName: "Corredor Gambín",
      username: "rafapcjs",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: `/${locale}/`,
      siteName: profile.shortName,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${profile.fullName} · ${profile.role[locale]}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

/**
 * Schema.org graph: WebSite → ProfilePage → Person.
 * Google uses ProfilePage + Person for people/portfolio results.
 */
export function buildJsonLd(locale: Locale): Record<string, unknown> {
  const dict = getDictionary(locale);
  const url = localeUrl(locale);
  const personId = `${siteRoot}/#person`;
  const websiteId = `${siteRoot}/#website`;
  const knowsAbout = Array.from(
    new Set(skillCategories.flatMap((c) => c.skills.map((id) => techRegistry[id].name))),
  );
  const currentJob = experience.find((item) => item.end === null);

  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.fullName,
    givenName: "Rafael Alfonso",
    familyName: "Corredor Gambín",
    alternateName: profile.shortName,
    jobTitle: profile.role[locale],
    description: profile.tagline[locale],
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url,
    image: {
      "@type": "ImageObject",
      url: `${siteRoot}${profile.photo.src}`,
      width: profile.photo.width,
      height: profile.photo.height,
      caption: profile.photo.alt[locale],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cereté",
      addressRegion: "Córdoba",
      addressCountry: "CO",
    },
    nationality: { "@type": "Country", name: "Colombia" },
    sameAs: socialLinks.map((s) => s.url),
    knowsAbout,
    knowsLanguage: profile.languages.map((l) => l.name.en),
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    ...(currentJob
      ? {
          worksFor: { "@type": "Organization", name: currentJob.company },
          hasOccupation: {
            "@type": "Occupation",
            name: currentJob.role[locale],
            occupationLocation: { "@type": "City", name: "Medellín" },
          },
        }
      : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteRoot}/`,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: locales.map((l) => bcp47[l]),
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: bcp47[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteRoot}/images/og.png` },
      },
      person,
    ],
  };
}

/** Serializes JSON-LD safely for inline <script> usage. */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
