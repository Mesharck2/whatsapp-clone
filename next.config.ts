import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {hostname: "careful-goldfish-499.convex.cloud"},
    ]
  }

};

export default nextConfig;
