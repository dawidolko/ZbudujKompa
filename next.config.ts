import type { NextConfig } from 'next';

/**
 * Base path for GitHub Pages.
 * A repository published at https://<user>.github.io/<repo>/ needs a basePath.
 * The site runs on a custom domain, so this stays empty unless overridden.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Full static export - no server, runs anywhere including GitHub Pages.
  output: 'export',

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // GitHub Pages serves directories through their index.html, so trailing
  // slashes are required; without them /products would 404 instead of
  // resolving to /products/index.html.
  trailingSlash: true,

  images: {
    // next/image has no optimizer under output:'export' - images are already
    // pre-processed into AVIF/WebP by scripts/optimize-images.mjs.
    unoptimized: true,
  },

  // A type error must stop the production build.
  // Linting runs separately (npm run lint) - Next 16 no longer accepts an
  // `eslint` key in this config.
  typescript: { ignoreBuildErrors: false },

  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
