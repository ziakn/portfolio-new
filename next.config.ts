import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  serverExternalPackages: ['libsql'],
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
    ];
  },
};

export default nextConfig;
