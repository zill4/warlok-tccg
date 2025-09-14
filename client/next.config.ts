import type { NextConfig } from "next";
import withWebSpatial from "@webspatial/next-plugin";

const nextConfig: NextConfig = withWebSpatial()({
  output: "export",
  distDir: "dist",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ygoprodeck.com",
        port: "",
        pathname: "/images/cards/**",
      },
    ],
  },
});

export default nextConfig;
