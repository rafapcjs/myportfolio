import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { fontClassNames } from "@/lib/fonts";
import { buildMetadata, buildPersonJsonLd, serializeJsonLd } from "@/lib/seo";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(isLocale(locale) ? locale : defaultLocale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={fontClassNames} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-bg text-fg antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded-md bg-accent px-4 py-2 font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {dict.nav.skipToContent}
          </a>
          <Navbar
            locale={locale}
            nav={dict.nav}
            theme={dict.theme}
            languageLabel={dict.language.label}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildPersonJsonLd(locale)) }}
        />
      </body>
    </html>
  );
}
