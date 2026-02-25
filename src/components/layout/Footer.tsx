import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { getAllPublishedCourses } from "@/lib/db";

export default async function Footer() {
  const courses = await getAllPublishedCourses();
  const COURSE_LINKS = courses.slice(0, 6);
  return (
    <footer className="relative py-14 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/60">
      <div className="section-container pt-16 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-200/60">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex items-center justify-center ">
                <Image src="/img/skillsboost-logo.webp" alt="Skills Boost Logo" width={192} height={48} className="object-contain" priority />
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Learn Digital, Earn Digital. Your path to mastering in-demand skills and landing your dream job.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h4 className="text-sm font-700 text-slate-800 uppercase tracking-widest">Courses</h4>
            <ul className="space-y-2.5">
              {COURSE_LINKS.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors duration-200"
                  >
                    <span className="text-base leading-none">{course.icon}</span>
                    {course.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/courses" className="text-sm font-600 text-brand-600 hover:text-brand-700 transition-colors">
                  View All Courses →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-700 text-slate-800 uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About SkillsBoost" },
                { href: "/contact", label: "Contact Us" },
                { href: "/courses", label: "All Courses" },
                { href: "/about#careers", label: "Careers" },
                { href: "/about#partners", label: "Hiring Partners" },
                { href: "/about#mentors", label: "Become a Mentor" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-500 hover:text-brand-600 transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-700 text-slate-800 uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:info@SkillsBoost.in" className="flex items-start gap-3 text-sm text-slate-500 hover:text-brand-600 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  skillsboost.in
                </a>
              </li>
              <li>
                <a href="tel:+919650249028" className="flex items-start gap-3 text-sm text-slate-500 hover:text-brand-600 transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  +91 9650249028
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>NM22, 2nd Floor, M Block
                  Old DLF Colony,<br /> Sector 14
                  Gurugram, Haryana 122007</span>
              </li>
            </ul>
            <div className="glass-card-static p-4 !rounded-2xl">
              <p className="text-xs font-600 text-slate-600 mb-1">Mon–Sat: 9AM – 8PM IST</p>
              <p className="text-xs text-slate-500">Average response time: under 2 hours</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Skillsboost. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-brand-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-sm text-slate-400 hover:text-brand-600 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
