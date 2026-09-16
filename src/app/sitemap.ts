import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, localeUrl(locale)]));
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
    alternates: { languages },
  }));
}
