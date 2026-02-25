"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Star, TrendingUp } from "lucide-react";
import { JSX } from "react";

const TYPING_WORDS = [
  "Learn Future Skills",
  "Build Real Projects",
  "Upgrade Your Career",
  "Become Industry Ready",
];

const FLOATING_CARDS = [
  { icon: "🚀", label: "Launch Your Career", sub: "85% placement rate", color: "bg-blue-50 border-blue-100" },
  { icon: "🏆", label: "Industry Certified", sub: "Recognized globally", color: "bg-teal-50 border-teal-100" },
  { icon: "⭐", label: "4.9 Star Rating", sub: "From 50,000+ students", color: "bg-amber-50 border-amber-100" },
];
const COMPANY_ICONS: Record<string, JSX.Element> = {
  Google: (
    <svg viewBox="0 0 48 48" className="w-6 h-6">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.64 2.24 30.2 0 24 0 14.64 0 6.56 5.4 2.6 13.3l8.04 6.24C12.54 13.02 17.82 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.64-.14-2.86-.44-4.12H24v7.8h12.9c-.26 2.12-1.68 5.3-4.82 7.46l7.42 5.74C44.9 37.1 46.5 31.52 46.5 24.5z" />
      <path fill="#FBBC05" d="M10.64 28.46A14.45 14.45 0 019.5 24c0-1.54.28-3.02.78-4.38l-8.04-6.24A23.96 23.96 0 000 24c0 3.84.92 7.48 2.56 10.7l8.08-6.24z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.9-2.14 15.86-5.82l-7.42-5.74c-2 1.38-4.72 2.36-8.44 2.36-6.18 0-11.46-3.52-13.36-8.54l-8.08 6.24C6.56 42.6 14.64 48 24 48z" />
    </svg>
  ),

  Microsoft: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect width="10" height="10" fill="#F25022" />
      <rect x="12" width="10" height="10" fill="#7FBA00" />
      <rect y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  ),

  Amazon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-yellow-500">
      <path d="M2 17s3 3 10 3 10-3 10-3-3 5-10 5-10-5-10-5z" />
    </svg>
  ),

  Flipkart: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect width="24" height="24" fill="#2874F0" rx="4"/>
      <path fill="white" d="M8 7h5v2h-3v2h3v2h-3v4H8z"/>
    </svg>
  ),
  

  Razorpay: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect width="24" height="24" rx="4" fill="#0C2451"/>
      <path fill="#2B84EA" d="M7 6h6c3 0 4 2 4 4s-1 4-4 4h-3v4H7z"/>
    </svg>
  ),

  Swiggy: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FC8019]">
      <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z"/>
    </svg>
  ),

  Zomato: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect width="24" height="24" rx="4" fill="#E23744"/>
      <path fill="white" d="M6 7h12v2L9 15h9v2H6v-2l9-6H6z"/>
    </svg>
   
  ),
};

export default function Hero() {
  const typed = useTypewriter({ words: TYPING_WORDS, typeSpeed: 55, deleteSpeed: 32, pauseTime: 2200 });

  return (
    <section className="relative min-h-auto flex items-center overflow-hidden mesh-bg pt-24 pb-4">
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-blue-200/40 -top-20 -left-20 animate-float" />
      <div className="blob w-80 h-80 bg-teal-200/30 top-1/3 -right-16 animate-float-delayed" />
      <div className="blob w-64 h-64 bg-violet-200/25 bottom-10 left-1/3 animate-float-slow" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="badge badge-blue font-display">
                🎓 India&apos;s #1 Tech Learning Platform
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-3"
            >
              <h1 className="font-display text-3xl md:text-6xl xl:text-4xl font-800 text-slate-900 leading-[1.05] tracking-tight">
                The Smarter Way to
              </h1>
              <div className="h-[1.2em] flex items-center">
                <h1 className="font-display  font-800 leading-[1.05] tracking-tight gradient-text">
                  {typed || "\u00A0"}
                  <span className="cursor-blink" />
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="text-lg text-slate-500 leading-relaxed max-w-lg"
            >
              Join 50,000+ learners who&apos;ve transformed their careers with SkillsBoost&apos;s industry-grade curriculum, live mentorship, and guaranteed placement support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/courses/full-stack" className="btn-primary text-base px-8 py-4">
                <ArrowRight className="w-5 h-5" />
                Enroll Now
              </Link>
              <Link href="/courses" className="btn-outline text-base px-8 py-4">
                <BookOpen className="w-5 h-5" />
                Explore Courses
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users className="w-4 h-4 text-brand-500" />
                <span className="font-600 text-slate-700">50,000+</span> Students
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-600 text-slate-700">4.9</span> Avg Rating
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <TrendingUp className="w-4 h-4 text-teal-500" />
                <span className="font-600 text-slate-700">85%</span> Placement Rate
              </div>
            </motion.div>
          </div>

          {/* Right Cards */}
          <div className="relative lg:block hidden">
            <div className="relative h-[520px]">
              {/* Main glass card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-1/4 left-1/4 -translate-x-1/4 -translate-y-1/4 w-80 glass-card p-7 space-y-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-xl shadow-blue-glow">
                    💻
                  </div>
                  <div>
                    <p className="font-display font-700 text-slate-900">Full Stack Development</p>
                    <p className="text-xs text-slate-400">24 Weeks · All Levels</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {["React & Next.js", "Node.js & Express", "PostgreSQL & MongoDB", "Docker & AWS"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="font-display text-xl font-800 gradient-text-blue">₹14,999</span>
                    <span className="text-xs text-slate-400 ml-2 line-through">₹29,999</span>
                  </div>
                  <span className="badge badge-teal text-xs">50% OFF</span>
                </div>
              </motion.div>

              {/* Floating mini cards */}
              {FLOATING_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                  style={{ animation: `float ${6 + i * 1.5}s ease-in-out ${i * 1}s infinite` }}
                  className={`absolute ${i === 0 ? "top-6 right-0" : i === 1 ? "bottom-20 right-4" : "top-8 left-0"
                    } glass-card-static px-4 py-3 flex items-center gap-3 w-fit border ${card.color.replace("bg-", "border-").split(" ")[0]}`}
                >
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <p className="text-xs font-700 text-slate-700">{card.label}</p>
                    <p className="text-xs text-slate-400">{card.sub}</p>
                  </div>
                </motion.div>
              ))}

              {/* Students online badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-4 left-4 glass-card-static px-4 py-3 flex items-center gap-3"
              >
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-75" />
                </div>
                <p className="text-xs font-600 text-slate-600">
                  <span className="text-slate-900 font-700">2,847</span> students learning right now
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 pt-4 border-t border-slate-200/60"
        >
          <p className="text-center text-xs font-700 text-slate-400 uppercase tracking-widest mb-6">
            Our graduates work at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["Google", "Microsoft", "Amazon", "Flipkart", "Razorpay", "Swiggy", "Zomato"].map((company) => (
              <div
                key={company}
                className="flex items-center gap-2 font-display font-700 text-xl text-slate-300 hover:text-slate-500 transition-colors duration-300 cursor-default select-none"
              >
                {COMPANY_ICONS[company]}
                {company}
              </div>
            ))}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
