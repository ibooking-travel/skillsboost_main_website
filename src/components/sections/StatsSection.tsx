"use client";

import CountUp from "react-countup";
import { useInView } from "@/hooks/useInView";
import AnimatedSection from "@/components/ui/AnimatedSection";

const STATS = [
  { value: 50000, suffix: "+", label: "Students Enrolled" },
  { value: 85, suffix: "%", label: "Placement Rate" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
  { value: 200, suffix: "+", label: "Hiring Partners" },
];

function StatItem({ value, suffix, label, decimals = 0 }: { value: number; suffix: string; label: string; decimals?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-800 text-white mb-2">
        {inView ? <CountUp end={value} duration={2.5} decimals={decimals} separator="," /> : "0"}
        {suffix}
      </div>
      <p className="text-sm font-500 text-blue-200">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-brand-700 to-teal-700" />
      <div className="absolute inset-0 opacity-20"
        style={{ background: "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)" }}
      />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <StatItem value={stat.value} suffix={stat.suffix} label={stat.label} decimals={stat.decimals} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
