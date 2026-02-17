import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lpwebsite-prod-s3cdn.leapmotor-international.com',
      },
    ],
  },
};

export default nextConfig;
