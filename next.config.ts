import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "loremflickr.com" },
      { hostname: "cloudflare-ipfs.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "minio.100visagesls.xyz" },
    ],
  },
};

export default nextConfig;
