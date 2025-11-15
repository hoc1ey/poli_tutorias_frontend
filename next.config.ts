import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_PROTOCOL === "https" ? "https" : "http",
        hostname: process.env.IMAGE_HOSTNAME || "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "iili.io",
      },
      {
        protocol: "https",
        hostname: "politutoriasstagingeng.blob.core.windows.net",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
