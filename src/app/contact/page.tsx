import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "contact",
    "Contact Us — SkillsBoost",
    "Get in touch with the SkillsBoost team. We're here to help you pick the right course, answer questions, and support your learning journey.",
    "/contact"
  );
}

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "Info@skillsboost.in", href: "mailto:Info@skillsboost.in" },
  { icon: Phone, label: "Phone", value: "+91 9650249028", href: "tel:+919650249028" },
  { icon: MapPin, label: "Office", value: " NM22, 2nd Floor, M Block Old DLF Colony, Sector 14 Gurugram, Haryana 122007 ", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 9AM–8PM IST", href: "#" },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="mesh-bg py-20 border-b border-slate-200/60">
        <div className="section-container text-center">
          <AnimatedSection>
            <SectionLabel variant="blue">Contact Us</SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl font-800 text-slate-900 tracking-tight mt-5 mb-5">
              Let&apos;s Start a
              <span className="gradient-text block">Conversation</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Whether you&apos;re wondering which course suits you best, need help with enrollment, or just want to say hi—we&apos;re here.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection>
                <h2 className="font-display text-2xl font-700 text-slate-900 mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  {CONTACT_INFO.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 p-4 glass-card group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                        <item.icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-xs font-700 text-slate-400 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-500 text-slate-700 mt-0.5">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="glass-card p-5 space-y-3">
                  <p className="font-700 text-slate-900">Before reaching out</p>
                  <ul className="space-y-2">
                    {[
                      "Check our FAQ on each course page",
                      "Explore the full course catalog",
                      "Average response time: under 2 hours",
                    ].map((tip) => (
                      <li key={tip} className="text-sm text-slate-500 flex items-start gap-2">
                        <span className="text-teal-500 mt-0.5">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1}>
                <div className="glass-card p-8">
                  <h2 className="font-display text-2xl font-700 text-slate-900 mb-6">Send a Message</h2>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
