import type { MetadataRoute } from "next";

/**
 * Generates /sitemap.xml so search engines discover every public page,
 * not just the homepage. Submit https://nfsf.in/sitemap.xml in Google
 * Search Console after deploying.
 */
const SITE_URL = "https://nfsf.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/donate", changeFrequency: "monthly", priority: 0.9 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
    { path: "/why-nfsf", changeFrequency: "monthly", priority: 0.8 },
    { path: "/impact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/verify", changeFrequency: "yearly", priority: 0.4 },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
