import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // El panel de leads no debe aparecer en buscadores
        disallow: "/admin",
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
