"use client";

/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock, Users, Star, Award, CheckCircle2, BookOpen,
  ChevronDown, ChevronUp, ArrowRight, Play, Zap
} from "lucide-react";
import { Course } from "@/types";
import { formatNumber } from "@/lib/utils";
import EnrollModal from "@/components/modals/EnrollModal";
import StarRating from "@/components/ui/StarRating";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface CoursePageClientProps {
  course: Course;
}

export default function CoursePageClient({ course }: CoursePageClientProps) {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div className="pt-20">
      {/* Hero */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${course.colorFrom}08 0%, ${course.colorTo}05 100%), #f8faff`
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${course.colorFrom} 0%, transparent 60%)`
          }}
        />
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className={`badge ${course.badgeClass}`}>{course.level}</span>
                <span className="text-sm text-slate-500">{course.category}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${course.colorFrom}20, ${course.colorTo}10)`,
                      border: `1px solid ${course.colorFrom}25`
                    }}
                  >
                    {course.icon}
                  </div>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-800 text-slate-900 tracking-tight mb-3">
                  {course.title}
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed">{course.tagline}</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-slate-600 leading-relaxed"
              >
                {course.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-6 text-sm"
              >
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-brand-500" />
                  <strong>{course.duration}</strong>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <BookOpen className="w-4 h-4 text-teal-500" />
                  <strong>{course.modules}</strong> Modules
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="w-4 h-4 text-violet-500" />
                  <strong>{formatNumber(course.students)}</strong> Students
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <strong>{course.rating}</strong> Rating
                </div>
              </motion.div>

              {/* Instructor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center gap-4 p-4 bg-white/70 border border-slate-100 rounded-2xl"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-700 text-sm shrink-0"
                  style={{ background: `linear-gradient(135deg, ${course.instructor.avatarColor}cc, ${course.instructor.avatarColor}88)` }}
                >
                  {course.instructor.initials}
                </div>
                <div>
                  <p className="font-700 text-slate-900">{course.instructor.name}</p>
                  <p className="text-sm text-slate-500">{course.instructor.title} · {course.instructor.experience} experience</p>
                </div>
              </motion.div>
            </div>

            {/* Right — Pricing Card */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card p-6 space-y-5 sticky top-24"
              >
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl font-800" style={{ color: course.colorFrom }}>
                      ₹{course.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-slate-400 line-through text-lg">₹{course.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-teal text-xs">{discount}% OFF</span>
                    <span className="text-xs text-slate-500">Limited time offer</span>
                  </div>
                </div>

                <button
                  onClick={() => setEnrollOpen(true)}
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  <Zap className="w-5 h-5" />
                  Enroll Now
                </button>

                <div className="space-y-3">
                  {[
                    `${course.duration} structured program`,
                    `${course.modules} in-depth modules`,
                    "Live weekly Q&A sessions",
                    "1-on-1 mentor support",
                    "Job placement assistance",
                    "Lifetime access + updates",
                    course.certificate ? "Verified digital certificate" : "",
                  ].filter(Boolean).map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="divider" />
                <p className="text-xs text-center text-slate-400">
                  🔒 Secure payment · 30-day money-back guarantee
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* Highlights */}
              <AnimatedSection>
                <h2 className="font-display text-2xl font-700 text-slate-900 mb-6">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.highlights.map((item) => {
                    return (
                      <div key={item} className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>

              {/* Skills */}
              <AnimatedSection>
                <h2 className="font-display text-2xl font-700 text-slate-900 mb-5">Skills You'll Master</h2>
                <div className="flex flex-wrap gap-2.5">
                  {course.skills.map((skill) => {
                    return (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-xl text-sm font-600 bg-white border border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-600 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </AnimatedSection>

              {/* Curriculum */}
              <AnimatedSection>
                <h2 className="font-display text-2xl font-700 text-slate-900 mb-6">Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((module, i) => (
                    <div key={module.title} className="glass-card-static border border-slate-100">
                      <button
                        onClick={() => setOpenModule(openModule === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-700"
                            style={{ background: `linear-gradient(135deg, ${course.colorFrom}, ${course.colorTo})` }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-700 text-slate-900">{module.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{module.topics.length} topics · {module.duration}</p>
                          </div>
                        </div>
                        {openModule === i ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {openModule === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-5 pb-5 border-t border-slate-100"
                        >
                          <div className="pt-4 space-y-2">
                            {module.topics.map((topic) => (
                              <div key={topic} className="flex items-center gap-3 text-sm text-slate-600 py-1.5">
                                <Play className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* FAQs */}
              <AnimatedSection>
                <h2 className="font-display text-2xl font-700 text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {course.faqs.map((faq, i) => (
                    <div key={faq.question} className="glass-card-static border border-slate-100">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left gap-4"
                      >
                        <span className="font-600 text-slate-800">{faq.question}</span>
                        {openFaq === i ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar sticky CTA */}
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-5">
                <div className="glass-card p-5 text-center">
                  <div className="flex justify-center mb-3">
                    <StarRating rating={course.rating} />
                  </div>
                  <p className="font-display font-800 text-3xl gradient-text-blue mb-1">{course.rating}</p>
                  <p className="text-sm text-slate-500">{formatNumber(course.students)} students enrolled</p>
                  <button onClick={() => setEnrollOpen(true)} className="btn-primary w-full justify-center mt-5">
                    <ArrowRight className="w-4 h-4" />
                    Enroll Now
                  </button>
                </div>

                <div className="glass-card p-5 space-y-3">
                  <p className="text-xs font-700 text-slate-400 uppercase tracking-widest">Course Includes</p>
                  {[
                    { icon: Clock, label: course.duration + " program" },
                    { icon: BookOpen, label: course.modules + " modules" },
                    { icon: Award, label: "Verified certificate" },
                    { icon: Users, label: "Community access" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-slate-600">
                      <Icon className="w-4 h-4 text-brand-500 shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom mobile CTA */}
      <div className="sticky bottom-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-800 text-xl" style={{ color: course.colorFrom }}>
              ₹{course.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-slate-400 line-through">₹{course.originalPrice.toLocaleString("en-IN")}</span>
          </div>
          <p className="text-xs text-teal-600 font-600">{discount}% off</p>
        </div>
        <button onClick={() => setEnrollOpen(true)} className="btn-primary">
          Enroll Now
        </button>
      </div>

      <EnrollModal
        isOpen={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        courseTitle={course.title}
        coursePrice={course.price}
        originalPrice={course.originalPrice}
      />
    </div>
  );
}

// Add missing class helper
