"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CTASection() {
  return (
    <section className="py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-teal-700" />
      <div className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%)"
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -right-32 -top-32 w-80 h-80 border border-white/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 -bottom-20 w-60 h-60 border border-white/10 rounded-full"
      />

      <div className="section-container relative z-10 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 mb-8">
            <Zap className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-600 text-white">Limited spots per batch · Next batch starts soon</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-800 text-white mb-6 tracking-tight leading-tight">
            Your Tech Career<br />Starts Right Now
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Don&apos;t wait for the &quot;right time.&quot; Every week you delay is a week someone else with less talent gets the role you deserve. Enroll today—we&apos;ll handle the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/courses/full-stack"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-700 text-base rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <ArrowRight className="w-5 h-5" />
              Start Learning Today
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-600 text-base rounded-full hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              Browse All Courses
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            30-day money-back guarantee · No questions asked
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
