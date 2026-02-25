"use client";

import CountUp from "react-countup";
import { useInView } from "@/hooks/useInView";

interface CounterCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export default function CounterCard({ value, suffix = "", prefix = "", label, decimals = 0 }: CounterCardProps) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-800 gradient-text-blue mb-2">
        {prefix}
        {inView ? <CountUp end={value} duration={2.5} decimals={decimals} separator="," /> : "0"}
        {suffix}
      </div>
      <p className="text-sm font-500 text-slate-500">{label}</p>
    </div>
  );
}
