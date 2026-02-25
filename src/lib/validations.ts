import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  description: z.string().max(500).optional(),
  icon: z.string().max(10).optional(),
  order: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const curriculumModuleSchema = z.object({
  title: z.string().min(1),
  topics: z.array(z.string().min(1)),
  duration: z.string().min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  tagline: z.string().min(1, "Tagline is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  categoryId: z.string().min(1, "Category is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "All Levels"]),
  price: z.coerce.number().int().min(0),
  originalPrice: z.coerce.number().int().min(0),
  duration: z.string().min(1, "Duration is required"),
  modulesCount: z.coerce.number().int().min(1),
  studentsCount: z.coerce.number().int().min(0).default(0),
  rating: z.coerce.number().min(0).max(5).default(4.9),
  certificate: z.boolean().default(true),
  icon: z.string().min(1, "Icon is required"),
  highlights: z.array(z.string().min(1)).min(1, "At least one highlight required"),
  skills: z.array(z.string().min(1)).min(1, "At least one skill required"),
  curriculum: z.array(curriculumModuleSchema).min(1, "At least one curriculum module required"),
  faqs: z.array(faqSchema).min(1, "At least one FAQ required"),
  instructorName: z.string().min(1, "Instructor name is required"),
  instructorTitle: z.string().min(1, "Instructor title is required"),
  instructorInitials: z.string().min(1).max(3),
  instructorAvatarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  colorFrom: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  colorTo: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  accentHex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  badgeClass: z.string().min(1, "Badge class is required"),
  isPublished: z.boolean().default(true),
  // SEO
  metaTitle: z.string().max(60).optional().or(z.literal("")),
  metaDescription: z.string().max(160).optional().or(z.literal("")),
  ogTitle: z.string().max(100).optional().or(z.literal("")),
  ogDescription: z.string().max(200).optional().or(z.literal("")),
  ogImage: z.string().optional().or(z.literal("")),
  twitterTitle: z.string().max(100).optional().or(z.literal("")),
  twitterDescription: z.string().max(200).optional().or(z.literal("")),
  twitterImage: z.string().optional().or(z.literal("")),
  canonicalUrl: z.string().optional().or(z.literal("")),
  robots: z.enum(["index, follow", "noindex, follow", "noindex, nofollow"]).default("index, follow"),
  focusKeyword: z.string().max(100).optional().or(z.literal("")),
});

export const pageSeoSchema = z.object({
  pageName: z.string().min(1, "Page name is required"),
  metaTitle: z.string().max(60).optional().or(z.literal("")),
  metaDescription: z.string().max(160).optional().or(z.literal("")),
  ogTitle: z.string().max(100).optional().or(z.literal("")),
  ogDescription: z.string().max(200).optional().or(z.literal("")),
  ogImage: z.string().optional().or(z.literal("")),
  canonicalUrl: z.string().optional().or(z.literal("")),
  robots: z.enum(["index, follow", "noindex, follow", "noindex, nofollow"]).default("index, follow"),
  focusKeyword: z.string().max(100).optional().or(z.literal("")),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1).max(100),
  siteUrl: z.string().url("Must be a valid URL"),
  defaultTitle: z.string().max(100),
  defaultDescription: z.string().max(300),
  defaultOgImage: z.string().optional().or(z.literal("")),
  logo: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  postalCode: z.string().optional().or(z.literal("")),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  socialLinks: z.any().optional(),
  googleVerificationCode: z.string().optional().or(z.literal("")),
  themeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#2563eb"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type PageSEOInput = z.infer<typeof pageSeoSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
