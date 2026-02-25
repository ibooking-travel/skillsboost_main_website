// src/lib/seo.ts
// Utility functions for SEO metadata generation

import type { Metadata } from "next";
import { getSiteSettings, getPageSEO } from "./db";

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  robots?: string;
}

export function parseRobots(robots: string): { index: boolean; follow: boolean } {
  const noindex = robots.includes("noindex");
  const nofollow = robots.includes("nofollow");
  return { index: !noindex, follow: !nofollow };
}

export async function buildMetadata(
  seo: SEOData,
  fallbackTitle: string,
  fallbackDescription: string,
  path?: string
): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl || "https://skillsboost.in";
  const siteName = settings?.siteName || "SkillsBoost";
  const defaultOgImage = settings?.defaultOgImage || "/og-image.png";

  const title = seo.metaTitle || fallbackTitle;
  const description = seo.metaDescription || fallbackDescription;
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const ogImage = seo.ogImage || defaultOgImage;
  const twitterTitle = seo.twitterTitle || ogTitle;
  const twitterDescription = seo.twitterDescription || ogDescription;
  const twitterImage = seo.twitterImage || ogImage;
  const canonical = seo.canonicalUrl || (path ? `${siteUrl}${path}` : siteUrl);
  const robots = parseRobots(seo.robots || "index, follow");

  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: robots.index,
      follow: robots.follow,
      googleBot: {
        index: robots.index,
        follow: robots.follow,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName,
      locale: "en_IN",
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

  if (settings?.googleVerificationCode) {
    metadata.verification = { google: settings.googleVerificationCode };
  }

  return metadata;
}

export async function buildPageMetadata(pageName: string, fallbackTitle: string, fallbackDescription: string, path?: string): Promise<Metadata> {
  const pageSeo = await getPageSEO(pageName);
  const seoData: SEOData = pageSeo
    ? {
        metaTitle: pageSeo.metaTitle ?? undefined,
        metaDescription: pageSeo.metaDescription ?? undefined,
        ogTitle: pageSeo.ogTitle ?? undefined,
        ogDescription: pageSeo.ogDescription ?? undefined,
        ogImage: pageSeo.ogImage ?? undefined,
        canonicalUrl: pageSeo.canonicalUrl ?? undefined,
        robots: pageSeo.robots,
      }
    : {};
  return buildMetadata(seoData, fallbackTitle, fallbackDescription, path);
}

export async function generateOrganizationSchema() {
  const settings = await getSiteSettings();
  if (!settings) return null;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: settings.siteUrl,
    logo: settings.logo ? `${settings.siteUrl}${settings.logo}` : undefined,
    contactPoint: settings.phone
      ? { "@type": "ContactPoint", telephone: settings.phone, contactType: "customer service" }
      : undefined,
    sameAs: settings.socialLinks ? Object.values(settings.socialLinks as Record<string, string>) : [],
  };

  // LocalBusiness schema if address exists
  if (settings.address) {
    return {
      "@context": "https://schema.org",
      "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
      name: settings.siteName,
      url: settings.siteUrl,
      logo: settings.logo ? `${settings.siteUrl}${settings.logo}` : undefined,
      telephone: settings.phone,
      email: settings.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address,
        addressLocality: settings.city,
        addressRegion: settings.state,
        postalCode: settings.postalCode,
        addressCountry: settings.country || "IN",
      },
      geo:
        settings.latitude && settings.longitude
          ? {
              "@type": "GeoCoordinates",
              latitude: settings.latitude,
              longitude: settings.longitude,
            }
          : undefined,
      sameAs: settings.socialLinks ? Object.values(settings.socialLinks as Record<string, string>) : [],
    };
  }

  return schema;
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateCourseSchema(course: {
  title: string;
  description: string;
  slug: string;
  price: number;
  rating: number;
  students: number;
  instructor: { name: string };
  tagline: string;
  siteUrl?: string;
}) {
  const siteUrl = course.siteUrl || "https://skillsboost.in";
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${siteUrl}/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: "SkillsBoost",
      url: siteUrl,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      name: course.title,
      description: course.tagline,
      instructor: {
        "@type": "Person",
        name: course.instructor.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      reviewCount: Math.max(Math.round(course.students / 50), 1),
    },
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };
}
