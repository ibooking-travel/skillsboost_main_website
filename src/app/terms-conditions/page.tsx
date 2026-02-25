import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";

import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "terms",
    "Terms & Conditions — SkillsBoost",
    "Read SkillsBoost's terms and conditions for using our educational platform and services.",
    "/terms-conditions"
  );
}

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using SkillsBoost 's website, mobile application, or any of our educational services (collectively, the "Services"), you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, you are not permitted to access or use our Services. These terms apply to all visitors, students, and anyone else who accesses or uses the Services.`,
  },
  {
    title: "Enrollment & Payments",
    content: `Course enrollment is confirmed upon successful payment processing. All prices are listed in Indian Rupees (INR) and include applicable GST. SkillsBoost reserves the right to modify pricing at any time. Payment must be completed before access to course content is granted. We accept major credit/debit cards, UPI, net banking, and EMI options through our secure payment gateway partners.`,
  },
  {
    title: "Refund Policy",
    content: `SkillsBoost offers a 30-day money-back guarantee on all courses. To request a refund, contact support@SkillsBoost.in within 30 days of your enrollment date. Refunds are processed within 7-10 business days to your original payment method. Refunds are not available after 30 days, if you've completed more than 50% of the course, or if a certificate has been issued. Special promotions may have different refund terms as specified at the time of purchase.`,
  },
  {
    title: "Intellectual Property",
    content: `All content on the SkillsBoost platform—including videos, course materials, code examples, assessments, and written content—is the exclusive intellectual property of SkillsBoost  or our content partners and is protected by copyright law. Students may access and use course materials for their personal learning purposes only. Reproduction, distribution, modification, or resale of any course content is strictly prohibited without explicit written permission from SkillsBoost.`,
  },
  {
    title: "Student Conduct",
    content: `Students are expected to conduct themselves professionally and respectfully. Prohibited behavior includes: sharing login credentials with others, distributing course materials outside the platform, engaging in academic dishonesty or plagiarism, harassing or abusing other students or instructors, attempting to circumvent platform security, and any activity that violates applicable laws. Violations may result in immediate account termination without refund.`,
  },
  {
    title: "Certificates",
    content: `Certificates are issued upon successful completion of all course modules and assessments with a passing score of 70% or above. Certificates are personal and non-transferable. SkillsBoost uses blockchain verification to authenticate certificate validity. The information on your certificate must match your account information. Fraudulent certificates or misrepresentation of credentials is grounds for certificate revocation.`,
  },
  {
    title: "Limitation of Liability",
    content: `SkillsBoost provides educational services "as is" without warranties of any kind, express or implied. While we strive to ensure job placement, we do not guarantee employment outcomes. SkillsBoost's total liability to you for any claims arising out of or relating to these Terms or our Services shall not exceed the amount you paid for the course in question during the 12 months preceding the claim. We are not liable for any indirect, incidental, special, or consequential damages.`,
  },
  {
    title: "Modifications to Terms",
    content: `SkillsBoost reserves the right to modify these Terms at any time. Material changes will be communicated via email and/or prominent notice on our platform at least 14 days before taking effect. Your continued use of our Services after the effective date of any changes constitutes your acceptance of the updated Terms. If you do not agree to the modified terms, you must discontinue use of our Services.`,
  },
];

export default function TermsPage() {
  return (
    <div className="pt-20">
      <div className="mesh-bg py-20 border-b border-slate-200/60">
        <div className="section-container text-center">
          <AnimatedSection>
            <SectionLabel variant="violet">Legal</SectionLabel>
            <h1 className="font-display text-5xl font-800 text-slate-900 tracking-tight mt-5 mb-5">Terms & Conditions</h1>
            <p className="text-slate-500">Last updated: December 15, 2024</p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="section-container max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="glass-card p-8 mb-8">
              <p className="text-slate-600 leading-relaxed">
                These Terms and Conditions govern your use of SkillsBoost&apos;s services and form a legally binding agreement between you and SkillsBoost  Pvt. Ltd. (CIN: U85300KA2021PTC148923), a company incorporated under the laws of India, with its registered office at WeWork Prestige Atlanta, Bengaluru, Karnataka 560025.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {SECTIONS.map((section, i) => (
              <AnimatedSection key={section.title} delay={i * 0.05}>
                <div className="space-y-3">
                  <h2 className="font-display text-xl font-700 text-slate-900">{i + 1}. {section.title}</h2>
                  <div className="divider" />
                  <p className="text-slate-600 leading-relaxed">{section.content}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12">
            <div className="glass-card p-6 border border-brand-100">
              <h3 className="font-700 text-slate-900 mb-2">Contact Our Legal Team</h3>
              <p className="text-sm text-slate-500 mb-4">
                For questions about these terms or any legal matters related to SkillsBoost services.
              </p>
              <a href="mailto:info@SkillsBoost.in" className="btn-outline text-sm py-2.5 px-6">
                legal@SkillsBoost.in
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
