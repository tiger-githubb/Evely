import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "loremflickr.com" },
      { hostname: "cloudflare-ipfs.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "minio.100visagesls.xyz" },
    ],
    //TODO: Check if this is needed and if it is the good config

    minimumCacheTTL: 300,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
  },
};

export default nextConfig;
