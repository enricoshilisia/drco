import type { MetadataRoute } from "next";
import { advocates, posts, practiceAreas } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["/", "/practice-areas", "/about", "/advocates", "/insights", "/contact", "/faq", "/privacy", "/disclaimer"].map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/privacy" || path === "/disclaimer" ? 0.3 : 0.8,
    }),
  );
  return [
    ...staticPages,
    ...practiceAreas.map((p) => ({ url: absoluteUrl(`/practice-areas/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...advocates.map((a) => ({ url: absoluteUrl(`/advocates/${a.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/insights/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
