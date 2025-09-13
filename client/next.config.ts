import type { NextConfig } from "next";
import withWebSpatial from "@webspatial/next-plugin";

const nextConfig: NextConfig = withWebSpatial()({
  output: "export",
  distDir: "dist",
});

export default nextConfig;
