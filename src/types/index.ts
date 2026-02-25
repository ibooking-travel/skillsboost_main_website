export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  price: number;
  originalPrice: number;
  category: string;
  colorFrom: string;
  colorTo: string;
  accentHex: string;
  badgeClass: string;
  icon: string;
  rating: number;
  students: number;
  modules: number;
  certificate: boolean;
  highlights: string[];
  curriculum: CurriculumModule[];
  faqs: FAQ[];
  instructor: Instructor;
  skills: string[];
  // SEO
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
  focusKeyword?: string;
}

export interface CurriculumModule {
  title: string;
  topics: string[];
  duration: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Instructor {
  name: string;
  title: string;
  experience?: string;
  initials: string;
  avatarColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
  avatarColor: string;
  courseSlug: string;
}

export interface SiteSettingsType {
  id?: string;
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage?: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  socialLinks?: Record<string, string>;
  googleVerificationCode?: string;
  themeColor: string;
}

export interface PageSEOType {
  id?: string;
  pageName: string;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots: string;
  focusKeyword?: string;
}
