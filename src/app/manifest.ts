import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: "DRCO Kenyariri",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F0",
    theme_color: "#0E1A2B",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
