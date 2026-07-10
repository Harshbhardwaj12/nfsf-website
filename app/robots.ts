import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt. Allows crawling of public pages, blocks admin and
 * donor-specific pages that shouldn't be indexed, and points to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/thank-you", "/api"],
    },
    sitemap: "https://nfsf.in/sitemap.xml",
    host: "https://nfsf.in",
  };
}
