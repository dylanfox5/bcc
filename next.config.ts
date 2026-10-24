import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "*.squareup.com" },
      { hostname: "squareup.com" },
      { hostname: "*.amazonaws.com" },
    ],
  },
};

export default nextConfig;
