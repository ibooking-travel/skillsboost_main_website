import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/db";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl || "https://skillsboost.in";

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
