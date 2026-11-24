
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existing lint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Serve original images directly.
  // Avoids requests to /_next/image and its 402 errors.
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

  poweredByHeader: false,
};

export default nextConfig;
