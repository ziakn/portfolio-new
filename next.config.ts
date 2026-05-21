import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  serverExternalPackages: ['better-sqlite3'],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
