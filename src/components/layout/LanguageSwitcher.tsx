"use client";

import Link from "next/link";
import { LOCALE_STORAGE_KEY, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  current: Locale;
  label: string;
  className?: string;
};

function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage may be unavailable (private mode); the switch still works via the URL.
  }
}

/** Segmented ES / EN control. Switching locale navigates to the other root layout, keeping the hash. */
export function LanguageSwitcher({ current, label, className }: Props) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="inline-flex items-center rounded-md border border-border bg-surface p-0.5 font-mono text-xs">
        {locales.map((locale) => {
          const isCurrent = locale === current;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}/`}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => rememberLocale(locale)}
                className={cn(
                  "inline-flex h-8 min-w-9 items-center justify-center rounded px-2 uppercase transition-colors duration-200",
                  isCurrent
                    ? "bg-accent text-accent-fg"
                    : "text-muted hover:bg-surface-2 hover:text-fg",
                )}
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
