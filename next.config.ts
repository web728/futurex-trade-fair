import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "futurextrade.com",
      },
      {
        protocol: "https",
        hostname: "www.futurextrade.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/partners",
        destination: "/participants",
        permanent: true,
      },
      {
        source: "/presence",
        destination: "/global-presence",
        permanent: true,
      },
      {
        source: "/media",
        destination: "/news",
        permanent: true,
      },
    ];
  },

  poweredByHeader: false,
};

export default nextConfig;