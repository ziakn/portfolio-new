import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  serverExternalPackages: ['libsql'],
  // In production the database is remote (Turso), so no file needs bundling.
  // These traces keep the on-disk fallback working when TURSO_DATABASE_URL is
  // unset — e.g. a persistent-filesystem host or `next build` reading the
  // file. Harmless on Vercel (the bundled file simply goes unused).
  outputFileTracingIncludes: {
    '/blog': ['./data/posts.sqlite'],
    '/blog/[slug]': ['./data/posts.sqlite'],
    '/sitemap.xml': ['./data/posts.sqlite'],
    '/feed.xml': ['./data/posts.sqlite'],
    '/portfolio': ['./data/posts.sqlite'],
    '/resume': ['./data/posts.sqlite'],
    '/': ['./data/posts.sqlite'],
    '/api/contact': ['./data/posts.sqlite'],
    // The admin panel reads and writes the same database.
    '/admin/**': ['./data/posts.sqlite'],
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
    ];
  },
};

export default nextConfig;
