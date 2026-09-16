/** Site-wide constants derived from environment variables. Values are inlined at build time. */
/** Treats unset and empty variables the same way (CI often passes empty strings). */
const env = (value: string | undefined, fallback = ""): string => value?.trim() || fallback;

export const siteConfig = {
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "https://example.com").replace(/\/$/, ""),
  basePath: env(process.env.NEXT_PUBLIC_BASE_PATH).replace(/\/$/, ""),
  formspreeId: env(process.env.NEXT_PUBLIC_FORMSPREE_ID),
  /** Google Search Console HTML-tag verification token (optional). */
  googleSiteVerification: env(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
} as const;

/** Prefixes a public asset path with the configured basePath (needed for GitHub Pages). */
export function withBasePath(path: string): string {
  return `${siteConfig.basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
