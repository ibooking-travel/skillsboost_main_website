"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { CheckCircle2, XCircle } from "lucide-react";

const COMPARISONS = [
  { feature: "Live mentor sessions", SkillsBoost: true, others: false },
  { feature: "Industry-grade projects", SkillsBoost: true, others: false },
  { feature: "Placement support", SkillsBoost: true, others: false },
  { feature: "Lifetime access & updates", SkillsBoost: true, others: false },
  { feature: "Verified certificates", SkillsBoost: true, others: true },
  { feature: "Community Q&A", SkillsBoost: true, others: true },
  { feature: "Job-ready portfolio", SkillsBoost: true, others: false },
  { feature: "Real-world capstone projects", SkillsBoost: true, others: false },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 bg-gradient-to-b from-white to-slate-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <SectionLabel variant="violet">The SkillsBoost Difference</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-800 text-slate-900 mt-4 mb-6 tracking-tight">
              Not Just a Course.
              <span className="gradient-text block">A Career System.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              Most platforms give you videos and wish you luck. SkillsBoost gives you a proven system—structured learning, real mentors, industry projects, and job placement support—everything required to actually get hired.
            </p>

            <div className="space-y-2">
              {["Start learning on day 1", "No fluff, just skills", "Mentors who work at top companies", "Built-in accountability systems"].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm font-500 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="glass-card p-6 overflow-hidden">
              <div className="grid grid-cols-3 text-center text-xs font-700 text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-100">
                <span className="text-left">Feature</span>
                <span className="gradient-text-blue">SkillsBoost</span>
                <span>Others</span>
              </div>
              <div className="divide-y divide-slate-50">
                {COMPARISONS.map((row) => (
                  <div key={row.feature} className="grid grid-cols-3 text-center py-3.5 items-center">
                    <span className="text-left text-sm text-slate-600">{row.feature}</span>
                    <span className="flex justify-center">
                      <CheckCircle2 className="w-5 h-5 text-teal-500" />
                    </span>
                    <span className="flex justify-center">
                      {row.others ? (
                        <CheckCircle2 className="w-5 h-5 text-slate-300" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-300" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
