// src/lib/db.ts
import { prisma } from "./prisma";
import { Course, CurriculumModule, FAQ } from "@/types";
import { Course as PrismaCourse, SiteSettings, PageSEO } from "@prisma/client";

function isCurriculumModule(obj: unknown): obj is CurriculumModule {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof (obj as CurriculumModule).title === "string" &&
    Array.isArray((obj as CurriculumModule).topics) &&
    typeof (obj as CurriculumModule).duration === "string"
  );
}

export function mapCourse(c: PrismaCourse): Course {
  return {
    slug: c.slug,
    title: c.title,
    tagline: c.tagline,
    description: c.description,
    duration: c.duration,
    level: c.level as Course["level"],
    price: c.price,
    originalPrice: c.originalPrice,
    category: "",
    colorFrom: c.colorFrom,
    colorTo: c.colorTo,
    accentHex: c.accentHex,
    badgeClass: c.badgeClass,
    icon: c.icon,
    rating: c.rating,
    students: c.studentsCount,
    modules: c.modulesCount,
    certificate: c.certificate,
    highlights: c.highlights as string[],
    skills: c.skills as string[],
    curriculum: Array.isArray(c.curriculum as unknown)
      ? (c.curriculum as unknown as unknown[]).filter(isCurriculumModule)
      : [],
    faqs: Array.isArray(c.faqs as unknown) ? (c.faqs as unknown as FAQ[]) : [],
    instructor: {
      name: c.instructorName,
      title: c.instructorTitle,
      experience: "",
      initials: c.instructorInitials,
      avatarColor: c.instructorAvatarColor,
    },
    // SEO fields
    metaTitle: c.metaTitle ?? undefined,
    metaDescription: c.metaDescription ?? undefined,
    ogTitle: c.ogTitle ?? undefined,
    ogDescription: c.ogDescription ?? undefined,
    ogImage: c.ogImage ?? undefined,
    twitterTitle: c.twitterTitle ?? undefined,
    twitterDescription: c.twitterDescription ?? undefined,
    twitterImage: c.twitterImage ?? undefined,
    canonicalUrl: c.canonicalUrl ?? undefined,
    robots: c.robots,
    focusKeyword: c.focusKeyword ?? undefined,
  };
}

export async function getAllPublishedCourses(): Promise<Course[]> {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
    include: { category: true },
  });
  return courses.map((c) => {
    const mapped = mapCourse(c);
    mapped.category = c.category.name;
    return mapped;
  });
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const course = await prisma.course.findFirst({
    where: { slug, isPublished: true },
    include: { category: true },
  });
  if (!course) return null;
  const mapped = mapCourse(course);
  mapped.category = course.category.name;
  return mapped;
}

export async function getAllPublishedSlugs(): Promise<{ slug: string }[]> {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return courses;
}

export async function getActiveCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

// Admin queries
export async function adminGetAllCourses() {
  return prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function adminGetAllCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { courses: true } } },
  });
}

// SiteSettings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const settings = await prisma.siteSettings.findFirst();
  return settings;
}

export async function upsertSiteSettings(data: Partial<SiteSettings>) {
  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    return prisma.siteSettings.update({ where: { id: existing.id }, data });
  }
  return prisma.siteSettings.create({ data: data as SiteSettings });
}

// PageSEO
export async function getPageSEO(pageName: string): Promise<PageSEO | null> {
  return prisma.pageSEO.findUnique({ where: { pageName } });
}

export async function upsertPageSEO(pageName: string, data: Partial<PageSEO>) {
  return prisma.pageSEO.upsert({
    where: { pageName },
    update: data,
    create: { pageName, ...data },
  });
}

export async function getAllPageSEO(): Promise<PageSEO[]> {
  return prisma.pageSEO.findMany({ orderBy: { pageName: "asc" } });
}
