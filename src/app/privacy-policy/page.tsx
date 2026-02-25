import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";

import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "privacy",
    "Privacy Policy — SkillsBoost",
    "SkillsBoost's privacy policy. Learn how we collect, use, and protect your personal information.",
    "/privacy-policy"
  );
}

const SECTIONS = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us when you create an account, enroll in a course, or contact us for support. This includes your name, email address, phone number, and payment information. We also automatically collect certain information when you use our platform, including your IP address, browser type, device identifiers, and usage data such as pages visited, courses accessed, and time spent on each module.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve our educational services. This includes processing enrollments and payments, personalizing your learning experience, sending course updates and notifications, providing customer support, and analyzing how our platform is used to improve our offerings. We may also use your contact information to send you promotional communications about new courses, special offers, or events—you can opt out of these at any time.`,
  },
  {
    title: "Information Sharing",
    content: `SkillsBoost does not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential. We may also disclose your information when required by law, or to protect the rights, property, or safety of SkillsBoost, our users, or others.`,
  },
  {
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Payment information is handled by PCI-DSS compliant payment processors and is never stored on our servers. Despite these measures, no method of transmission over the internet or electronic storage is 100% secure.`,
  },
  {
    title: "Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to enhance your experience on our platform. Essential cookies are required for the platform to function correctly. Analytics cookies help us understand how our platform is used. Marketing cookies may be used to personalize advertisements. You can control cookie preferences through your browser settings, though disabling certain cookies may affect the functionality of our platform.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal information at any time. You can update your profile information through your account settings or contact us directly. You may request a copy of all personal data we hold about you. You have the right to withdraw consent for marketing communications at any time by using the unsubscribe link in our emails or contacting us directly at privacy@SkillsBoost.in.`,
  },
  {
    title: "Children's Privacy",
    content: `Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at privacy@SkillsBoost.in and we will take steps to delete such information from our systems.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page with an updated revision date and, where appropriate, through email notification. Your continued use of our services after any changes constitutes acceptance of the revised policy.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <div className="mesh-bg py-20 border-b border-slate-200/60">
        <div className="section-container text-center">
          <AnimatedSection>
            <SectionLabel variant="blue">Legal</SectionLabel>
            <h1 className="font-display text-5xl font-800 text-slate-900 tracking-tight mt-5 mb-5">Privacy Policy</h1>
            <p className="text-slate-500">Last updated: December 15, 2024</p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="section-container max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="glass-card p-8 mb-8">
              <p className="text-slate-600 leading-relaxed">
                At SkillsBoost  Pvt. Ltd. (&quot;SkillsBoost&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), your privacy is fundamental to how we operate. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {SECTIONS.map((section, i) => (
              <AnimatedSection key={section.title} delay={i * 0.05}>
                <div className="space-y-3">
                  <h2 className="font-display text-xl font-700 text-slate-900">{section.title}</h2>
                  <div className="divider" />
                  <p className="text-slate-600 leading-relaxed">{section.content}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12">
            <div className="glass-card p-6 border border-brand-100">
              <h3 className="font-700 text-slate-900 mb-2">Questions About This Policy?</h3>
              <p className="text-sm text-slate-500 mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer.
              </p>
              <a href="mailto:info@SkillsBoost.in" className="btn-primary text-sm py-2.5 px-6">
                Contact DPO
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
