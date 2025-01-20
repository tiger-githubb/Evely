import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  //TODO: Check if it is the best configuration
  output: process.platform === "win32" ? undefined : "standalone",
  images: {
    remotePatterns: [{ hostname: "yala.events" }, { hostname: "storage.yala.events" }],
    minimumCacheTTL: 300,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
  },
};
export default withNextIntl()(nextConfig);
