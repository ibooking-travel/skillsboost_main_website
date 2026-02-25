import type { Metadata } from "next";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/sections/CTASection";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "about",
    "About SkillsBoost — Our Mission, Team & Story",
    "SkillsBoost was founded to democratize world-class tech education. Learn about our mission, values, founding team, and the community we're building.",
    "/about"
  );
}

const TEAM = [
  { name: "Ashutoash Kumar", role: "Sr. Data Analyst", exp: "Turn data into decisions. Build your career as a Data Analyst today!.", initials: "AK", color: "#2563eb" },
  { name: "Mr. Ankit Kumar", role: "Sr. Digital Marketer", exp: "Become a Sr. Digital Marketer and lead brands to success with powerful strategies and data-driven decisions.", initials: "AK", color: "#0d9488" },
  { name: "Ms. Neha Kumari", role: "Sr. Faculty Data Science", exp: "Sr. Faculty in Data Science at Skills Boost, helping learners master data-driven skills with real-world insights.", initials: "NK", color: "#7c3aed" },
  { name: "Mrs. Kavita", role: "Digital Marketing Specialist", exp: "Kavita is a Digital Marketing Specialist at Skills Boost, skilled in SEO, SMM, and PPC, helping brands grow their online presence.", initials: "K", color: "#f43f5e" },
];

const VALUES = [
  { icon: Target, title: "Outcome First", desc: "Every decision we make is measured by one metric: did it help our students get better jobs?" },
  { icon: Users, title: "Community Driven", desc: "Our strongest asset isn't our content—it's 50,000+ learners who help each other succeed." },
  { icon: Lightbulb, title: "Radical Transparency", desc: "We publish our placement data, course ratings, and instructor quality scores publicly." },
  { icon: Award, title: "Excellence Always", desc: "We partner with engineers from top companies to ensure our curriculum reflects real industry standards." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="mesh-bg py-14 border-b border-slate-200/60">
        <div className="section-container text-center max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel variant="blue">About SkillsBoost</SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl font-800 text-slate-900 tracking-tight mt-5 mb-6">
              We Exist to Make
              <span className="gradient-text block">Tech Careers Accessible</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              SkillsBoost was founded in 2021 by engineers who saw a massive gap between what universities teach and what the industry actually needs. We built the platform we wish existed when we were starting out.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Story */}
      <section className="py-14 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <SectionLabel variant="teal">Our Story</SectionLabel>
              <h2 className="font-display text-4xl font-800 text-slate-900 mt-4 mb-6 tracking-tight">
                Born from Frustration,<br />Built with Purpose
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  Our founders—Aryan and Deepa—spent years interviewing hundreds of candidates at Google and Microsoft. The pattern was clear: brilliant, hardworking people who simply hadn&apos;t been taught the right things.
                </p>
                <p>
                  Existing courses were either too theoretical or too shallow. Bootcamps were expensive and rushed. University degrees took 4 years and cost a fortune. There had to be a better way.
                </p>
                <p>
                  In 2021, they built SkillsBoost with a radical premise: <strong>teach exactly what top companies hire for, nothing less, nothing more.</strong> Within 18 months, 10,000 learners had enrolled. Today we&apos;re 50,000+ strong.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Founded", value: "2021", sub: "Gurgaon, India" },
                  { label: "Students", value: "50K+", sub: "Across 18 countries" },
                  { label: "Courses", value: "11", sub: "Industry-grade" },
                  { label: "Placement Rate", value: "85%", sub: "Within 6 months" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-5 text-center">
                    <p className="font-display text-3xl font-800 gradient-text-blue">{stat.value}</p>
                    <p className="font-700 text-slate-700 text-sm mt-1">{stat.label}</p>
                    <p className="text-xs text-slate-400">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white">
        <div className="section-container">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel variant="violet">Core Values</SectionLabel>
            <h2 className="font-display text-4xl font-800 text-slate-900 mt-4 tracking-tight">
              What We Stand For
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="glass-card p-7 flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
                    <v.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-slate-900 text-lg mb-2">{v.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="mentors" className="py-14 bg-white">
        <div className="section-container">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel variant="rose">Leadership</SectionLabel>
            <h2 className="font-display text-4xl font-800 text-slate-900 mt-4 tracking-tight">
              Meet the Team Behind SkillsBoost
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <div className="glass-card p-6 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-800 text-lg mx-auto mb-4"
                    style={{ background: `linear-gradient(135deg, ${member.color}cc, ${member.color}88)` }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-display font-700 text-slate-900">{member.name}</h3>
                  <p className="text-sm font-600 text-brand-600 mt-1">{member.role}</p>
                  <p className="text-xs text-slate-400 mt-1">{member.exp}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section id="partners" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="section-container text-center">
          <AnimatedSection>
            <SectionLabel variant="teal">Our Presence</SectionLabel>
            <h2 className="font-display text-4xl font-800 text-slate-900 mt-4 mb-10 tracking-tight">Hiring Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {["Google", "Microsoft", "Amazon", "Flipkart", "Razorpay", "Swiggy", "Zomato", "CRED", "PhonePe", "Meesho", "Nykaa", "Byju's"].map((company) => (
                <span key={company} className="font-display font-700 text-xl text-slate-300 hover:text-slate-600 transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
