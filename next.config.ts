import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  serverExternalPackages: ['better-sqlite3'],
  // The blog database is read at runtime but never imported, so file tracing
  // cannot infer it. Without this, the deployed bundle omits it and blog
  // routes fail once a scheduled post revalidates.
  outputFileTracingIncludes: {
    '/blog': ['./data/posts.sqlite'],
    '/blog/[slug]': ['./data/posts.sqlite'],
    '/sitemap.xml': ['./data/posts.sqlite'],
    '/feed.xml': ['./data/posts.sqlite'],
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
