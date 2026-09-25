import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  // Every server route reads the committed SQLite database. Include it in the
  // deployed function bundle, including on Vercel where it is read-only.
  outputFileTracingIncludes: {
    // All of these routes share data helpers. A global route glob prevents a
    // newly added server route from deploying without the SQLite fallback.
    '/*': ['./data/posts.sqlite'],
  },
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      // The listing is date-sensitive. The browser revalidates it, while the
      // edge cache serves the static page and monthly indexes for one day.
      {
        source: '/blog',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate, s-maxage=86400, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/posts/:year/:month/index.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate, s-maxage=86400, stale-while-revalidate=3600',
          },
        ],
      },
      // Article HTML is immutable within a deployment. Keep it at the edge
      // for 360 days while requiring browsers to revalidate on every visit.
      {
        source: '/blog/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate, s-maxage=31104000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
