import type { NextConfig } from "next";

/**
 * NEXT_PUBLIC_BASE_PATH is empty on Vercel (site served from the domain root)
 * and "/<repo-name>" on GitHub Pages project sites. See README.md.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
