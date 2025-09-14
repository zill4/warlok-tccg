import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WARLOK Trading Card Game",
    short_name: "WARLOK TCG",
    description:
      "Virtual Yu-Gi-Oh inspired card shop with spatial computing support",
    start_url: "/",
    display: "standalone",
    background_color: "#4338CA",
    theme_color: "#4338CA",
    orientation: "any",
    scope: "/",
    categories: ["games", "entertainment"],
    icons: [
      {
        src: "/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
      {
        src: "/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}
