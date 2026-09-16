/** Site-wide constants derived from environment variables. Values are inlined at build time. */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const siteConfig = {
  url: rawUrl.replace(/\/$/, ""),
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, ""),
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
} as const;

/** Prefixes a public asset path with the configured basePath (needed for GitHub Pages). */
export function withBasePath(path: string): string {
  return `${siteConfig.basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
