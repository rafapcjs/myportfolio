import type { MetadataRoute } from "next";
import { profile } from "@/data";
import { getDictionary } from "@/i18n/getDictionary";
import { defaultLocale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/** Web app manifest: name, colors and icon for "add to home screen" and Lighthouse best practices. */
export default function manifest(): MetadataRoute.Manifest {
  const dict = getDictionary(defaultLocale);
  return {
    name: dict.meta.title,
    short_name: profile.shortName,
    description: dict.meta.description,
    lang: defaultLocale,
    start_url: `${siteConfig.basePath}/`,
    scope: `${siteConfig.basePath}/`,
    display: "standalone",
    background_color: "#0b0f14",
    theme_color: "#0b0f14",
    icons: [{ src: `${siteConfig.basePath}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
