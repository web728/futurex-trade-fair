import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // ESLint warning/any errors build ko block nahi karenge
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'futurextrade.com' },
      { protocol: 'https', hostname: 'www.futurextrade.com' },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;