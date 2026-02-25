import type { Metadata } from "next";
import { getAllPublishedCourses } from "@/lib/db";
import { buildPageMetadata } from "@/lib/seo";
import CoursesGrid from "@/components/courses/CoursesGrid";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "courses",
    "All Courses — Full Stack, Data Science, AI, Design & More",
    "Browse industry-grade courses. Full Stack Development, Data Science, AI/ML, UI/UX Design, Digital Marketing, Cloud Computing & more.",
    "/courses"
  );
}

export default async function CoursesPage() {
  const courses = await getAllPublishedCourses();

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="mesh-bg py-20 border-b border-slate-200/60">
        <div className="section-container text-center">
          <span className="badge badge-blue font-display mb-5 inline-block">Course Catalog</span>
          <h1 className="font-display text-5xl md:text-6xl font-800 text-slate-900 tracking-tight mb-5">
            Find Your Perfect
            <span className="gradient-text block">Course</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Industry-grade programs designed with input from engineering leaders at Google, Microsoft, Amazon, and India&apos;s fastest-growing startups.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span><strong className="text-slate-700">{courses.length}</strong> Courses</span>
            <span><strong className="text-slate-700">50,000+</strong> Students</span>
            <span><strong className="text-slate-700">85%</strong> Placement Rate</span>
            <span><strong className="text-slate-700">4.9★</strong> Avg Rating</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="section-container">
          <CoursesGrid courses={courses} />
        </div>
      </div>
    </div>
  );
}
