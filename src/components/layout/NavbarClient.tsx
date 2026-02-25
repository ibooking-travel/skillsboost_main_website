"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Course } from "@/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses", hasDropdown: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface NavbarClientProps {
  featuredCourses: Course[];
}

export default function NavbarClient({ featuredCourses }: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCoursesOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 glass border-b border-white/60"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center ">
              <Image src="/img/skillsboost-logo.webp" alt="Skills Boost Logo" width={192} height={48} className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setCoursesOpen(true)}
                  onMouseLeave={() => setCoursesOpen(false)}
                >
                  <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-600 transition-all duration-200 ${
                    pathname.startsWith("/courses")
                      ? "text-brand-600 bg-brand-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}>
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${coursesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {coursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 glass-card-static p-3 border border-white/90"
                      >
                        <p className="text-xs font-700 text-slate-400 uppercase tracking-widest px-3 mb-2">Popular Courses</p>
                        {featuredCourses.map((course) => (
                          <Link
                            key={course.slug}
                            href={`/courses/${course.slug}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors duration-200 group"
                          >
                            <span className="text-xl">{course.icon}</span>
                            <div>
                              <p className="text-sm font-600 text-slate-800 group-hover:text-brand-600 transition-colors">{course.title}</p>
                              <p className="text-xs text-slate-500">{course.duration} · {course.level}</p>
                            </div>
                            
                          </Link>
                          
                        ))}
                        <Link href="/courses" className="text-sm font-600 text-brand-600 hover:text-brand-700 transition-colors">
                  View All Courses →
                </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-600 transition-all duration-200 ${
                    pathname === link.href
                      ? "text-brand-600 bg-brand-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/courses" className="btn-outline text-sm py-2.5 px-6">
              Explore
            </Link>
            <Link href="/courses/full-stack" className="btn-primary text-sm py-2.5 px-6">
              Enroll Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 border border-slate-200/80 text-slate-700 hover:bg-slate-50 transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-20 pb-8 overflow-y-auto"
          >
            <div className="section-container space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3.5 rounded-xl text-base font-600 text-slate-700 hover:text-brand-600 hover:bg-brand-50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link href="/courses" className="btn-outline w-full justify-center">
                  Explore Courses
                </Link>
                <Link href="/courses/full-stack" className="btn-primary w-full justify-center">
                  Enroll Now
                </Link>
              </div>
              <div className="pt-6">
                <p className="text-xs font-700 text-slate-400 uppercase tracking-widest px-4 mb-3">Courses</p>
                {featuredCourses.slice(0, 8).map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xl">{course.icon}</span>
                    <span className="text-sm font-500 text-slate-700">{course.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
