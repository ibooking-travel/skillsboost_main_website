import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import CoursesPreview from "@/components/sections/CoursesPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import { getAllPublishedCourses } from "@/lib/db";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "home",
    "Skills Boost — Learn Digital, Earn Digital",
    "Master in-demand tech skills with Skills Boost. Industry-grade courses in Full Stack, Data Science, AI/ML, UI/UX, Digital Marketing & more.",
    "/"
  );
}

export default async function HomePage() {
  const courses = await getAllPublishedCourses();

  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <CoursesPreview courses={courses} />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
