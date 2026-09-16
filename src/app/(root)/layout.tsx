import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { fontClassNames } from "@/lib/fonts";

/**
 * Minimal root layout for the locale-less entry point ("/").
 * The real site lives under /[locale]; this route only redirects to the preferred language.
 */
export const metadata: Metadata = {
  title: "Rafael Corredor",
  robots: { index: false, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${fontClassNames} dark`}>
      <body className="flex min-h-dvh flex-col bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
