"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { formatNumber } from "@/lib/utils";
import { Course } from "@/types";

export default function CoursesPreview({ courses }: { courses: Course[] }) {
  const featured = courses.slice(0, 6);

  return (
    <section className="py-14  mesh-bg">
      <div className="section-container">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel variant="blue">Course Catalog</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-800 text-slate-900 mt-4 tracking-tight">
              Courses Built for
              <span className="gradient-text block">Real Careers</span>
            </h2>
          </div>
          <Link href="/courses" className="btn-outline self-start md:self-auto shrink-0">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((course, i) => (
            <AnimatedSection key={course.slug} delay={i * 0.07}>
              <Link href={`/courses/${course.slug}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="glass-card h-full overflow-hidden shine-effect"
                >
                  {/* Card top gradient */}
                  <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(90deg, ${course.colorFrom}, ${course.colorTo})` }}
                  />

                  <div className="p-6 space-y-4">
                    {/* Icon & Category */}
                    <div className="flex items-start justify-between">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ background: `linear-gradient(135deg, ${course.colorFrom}18, ${course.colorTo}10)`, border: `1px solid ${course.colorFrom}20` }}
                      >
                        {course.icon}
                      </div>
                      <span className={`badge ${course.badgeClass}`}>{course.level}</span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-display font-700 text-lg text-slate-900 group-hover:text-brand-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">{course.tagline}</p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {formatNumber(course.students)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {course.rating}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5">
                      {course.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="text-xs px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-500">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-800 text-lg" style={{ color: course.colorFrom }}>
                          ₹{course.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{course.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-xs font-600 text-brand-600 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
