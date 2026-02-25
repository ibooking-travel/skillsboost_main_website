"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Star, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Course } from "@/types";
import { formatNumber } from "@/lib/utils";

export default function CoursesGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <motion.div
          key={course.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link href={`/courses/${course.slug}`} className="group block h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="glass-card h-full overflow-hidden shine-effect"
            >
              <div
                className="h-1.5 w-full"
                style={{ background: `linear-gradient(90deg, ${course.colorFrom}, ${course.colorTo})` }}
              />
              <div className="p-7 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `linear-gradient(135deg, ${course.colorFrom}15, ${course.colorTo}10)`, border: `1px solid ${course.colorFrom}20` }}
                  >
                    {course.icon}
                  </div>
                  <div className="text-right">
                    <span className={`badge ${course.badgeClass}`}>{course.level}</span>
                    <p className="text-xs text-slate-400 mt-1.5">{course.category}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-700 text-xl text-slate-900 group-hover:text-brand-600 transition-colors mb-1.5">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{course.tagline}</p>
                </div>

                <div className="space-y-2">
                  {course.highlights.slice(0, 4).map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-5 text-xs text-slate-400 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {formatNumber(course.students)} enrolled
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-800 text-xl" style={{ color: course.colorFrom }}>
                      ₹{course.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{course.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-600 text-brand-600 group-hover:translate-x-1 transition-transform duration-200">
                    View Course <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
