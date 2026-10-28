import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...["/about", "/products", "/industries", "/why-choose-us", "/contact"].map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/credits`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
