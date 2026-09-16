import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { fontClassNames } from "@/lib/fonts";
import { siteRoot } from "@/lib/seo";

/**
 * Minimal root layout for the locale-less entry point ("/").
 * The real site lives under /[locale]; this route only redirects to the preferred language.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteRoot),
  title: "Rafael Corredor",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/", languages: { es: "/es/", en: "/en/", "x-default": "/es/" } },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${fontClassNames} dark`}>
      <body className="flex min-h-dvh flex-col bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
