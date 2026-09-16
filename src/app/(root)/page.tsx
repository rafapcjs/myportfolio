"use client";

import { useEffect } from "react";
import {
  defaultLocale,
  isLocale,
  LOCALE_STORAGE_KEY,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
import { siteConfig } from "@/lib/site";

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // localStorage unavailable; fall through to browser language.
  }
  const browser = navigator.language.slice(0, 2).toLowerCase();
  return isLocale(browser) ? browser : defaultLocale;
}

/** Client-side language redirect. Static export cannot redirect on the server, so this runs in the browser. */
export default function LocaleRedirect() {
  useEffect(() => {
    window.location.replace(`${siteConfig.basePath}/${detectLocale()}/`);
  }, []);

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <nav aria-label="Idioma / Language" className="text-center font-mono text-sm">
        <p className="text-muted">Redirecting…</p>
        <ul className="mt-4 flex justify-center gap-4">
          {locales.map((locale) => (
            <li key={locale}>
              <a
                href={`${siteConfig.basePath}/${locale}/`}
                hrefLang={locale}
                lang={locale}
                className="text-accent underline underline-offset-4"
              >
                {localeNames[locale]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
