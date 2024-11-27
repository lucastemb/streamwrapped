import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['media.steampowered.com', 'avatars.steamstatic.com'],
  },
};

export default nextConfig;
