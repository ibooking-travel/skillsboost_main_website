"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import StarRating from "@/components/ui/StarRating";
import { TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14">
          <SectionLabel variant="amber">Student Stories</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-800 text-slate-900 mt-4 mb-5 tracking-tight">
            50,000+ Careers
            <span className="gradient-text block">Transformed</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Real stories from real learners who started exactly where you are.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="glass-card p-6 h-full flex flex-col"
              >
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                  <Quote className="w-5 h-5 text-brand-500" />
                </div>

                {/* Rating */}
                <StarRating rating={t.rating} />

                {/* Content */}
                <p className="text-slate-600 text-sm leading-relaxed mt-4 flex-1">
                  &quot;{t.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-700 shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.avatarColor}cc, ${t.avatarColor}88)` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-700 text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
