import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.monkeycode-ai.live", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
