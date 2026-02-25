"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";
import {
  Monitor, Users, Trophy, Clock, Rocket, ShieldCheck,
  Layers, HeadphonesIcon, BarChart3
} from "lucide-react";

const FEATURES = [
  {
    icon: Monitor,
    title: "Live Interactive Classes",
    description: "Not pre-recorded fluff. Real-time sessions with senior engineers who build at scale every day.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description: "Weekly personal sessions with your dedicated mentor. Real code reviews, real career advice.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Trophy,
    title: "Placement Guarantee",
    description: "85% of our graduates land jobs within 6 months. We keep training until you do.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Layers,
    title: "Industry-Grade Projects",
    description: "Build 5+ production applications. Not tutorial clones—real products with real users.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Courses, recordings, and future curriculum updates—all yours forever.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: ShieldCheck,
    title: "Verified Certificates",
    description: "Blockchain-verified certificates with a unique verification URL for each graduate.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track every milestone. Detailed dashboards show your growth week by week.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Community Support",
    description: "15,000+ learner community. No doubt goes unanswered for more than 2 hours.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Rocket,
    title: "Fast-Track Learning",
    description: "Optimized curriculum removes the noise. Get job-ready 3× faster than traditional paths.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-14 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel variant="teal">Why SkillsBoost</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-800 text-slate-900 mt-4 mb-5 tracking-tight">
            Everything You Need to
            <span className="gradient-text block">Succeed in Tech</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We&apos;ve designed SkillsBoost from the ground up to be the most effective path from zero to hired—regardless of your background.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="glass-card p-6 h-full group cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display font-700 text-slate-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
