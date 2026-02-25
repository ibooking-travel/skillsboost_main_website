import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseBySlug, getAllPublishedSlugs, getSiteSettings } from "@/lib/db";
import { parseRobots, generateBreadcrumbSchema, generateFAQSchema, generateCourseSchema } from "@/lib/seo";
import CoursePageClient from "@/components/courses/CoursePageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((c) => ({ slug: c.slug }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl || "https://skillsboost.in";
  const defaultOgImage = settings?.defaultOgImage || "/og-image.png";
  const siteName = settings?.siteName || "SkillsBoost";

  const title = course.metaTitle || `${course.title} — ${course.duration} · ${course.level}`;
  const description = course.metaDescription || course.description;
  const ogTitle = course.ogTitle || course.title;
  const ogDescription = course.ogDescription || course.tagline;
  const ogImage = course.ogImage || defaultOgImage;
  const twitterTitle = course.twitterTitle || ogTitle;
  const twitterDescription = course.twitterDescription || ogDescription;
  const twitterImage = course.twitterImage || ogImage;
  const canonical = course.canonicalUrl || `${siteUrl}/courses/${slug}`;
  const robots = parseRobots(course.robots || "index, follow");

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: robots.index,
      follow: robots.follow,
      googleBot: { index: robots.index, follow: robots.follow, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName,
      type: "website",
      images: [{ url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage.startsWith("http") ? twitterImage : `${siteUrl}${twitterImage}`],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl || "https://skillsboost.in";

  const courseSchema = generateCourseSchema({ ...course, siteUrl });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Courses", url: `${siteUrl}/courses` },
    { name: course.title, url: `${siteUrl}/courses/${slug}` },
  ]);
  const faqSchema = generateFAQSchema(course.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <CoursePageClient course={course} />
    </>
  );
}
