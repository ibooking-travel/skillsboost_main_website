import { MetadataRoute } from "next";
import { getAllPublishedSlugs, getSiteSettings, getAllPageSEO } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { PageSEO } from "@prisma/client";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let settings;
  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.warn("Could not fetch site settings during build:", error);
    settings = null;
  }
  const base = settings?.siteUrl || "https://skillsboost.in";

  // Get all published slugs
  let slugs: { slug: string }[] = [];
  try {
    slugs = await getAllPublishedSlugs();
  } catch (error) {
    console.warn("Could not fetch course slugs during build:", error);
    slugs = [];
  }

  // Get all published courses that are indexable (not noindex)
  const indexableSlugs: typeof slugs = [];
  if (slugs.length > 0) {
    try {
      const courses = await prisma.course.findMany({
        where: { isPublished: true },
        select: { slug: true, robots: true, updatedAt: true },
      });
      for (const c of courses) {
        if (!c.robots.includes("noindex")) {
          indexableSlugs.push({ slug: c.slug });
        }
      }
    } catch (error) {
      console.warn("Could not fetch courses for sitemap during build:", error);
    }
  }

  // Get page SEO to check which static pages are noindex
  let allPageSEO: PageSEO[] = [];
  try {
    allPageSEO = await getAllPageSEO();
  } catch (error) {
    console.warn("Could not fetch page SEO during build:", error);
    allPageSEO = [];
  }
  const noindexPages = new Set(
    allPageSEO.filter((p) => p.robots.includes("noindex")).map((p) => p.pageName)
  );

  const staticRouteMap: Record<string, string> = {
    home: "/",
    courses: "/courses",
    about: "/about",
    contact: "/contact",
    privacy: "/privacy-policy",
    terms: "/terms-conditions",
  };

  const staticRoutes = Object.entries(staticRouteMap)
    .filter(([pageName]) => !noindexPages.has(pageName))
    .map(([, route]) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8,
    }));

  return [
    ...staticRoutes,
    ...indexableSlugs.map((course) => ({
      url: `${base}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
