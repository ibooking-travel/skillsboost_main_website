import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/db";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  let settings;
  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.warn("Could not fetch site settings during build:", error);
    settings = null;
  }
  const siteUrl = settings?.siteUrl || "https://skillsboost.in";

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/", "/admin/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
