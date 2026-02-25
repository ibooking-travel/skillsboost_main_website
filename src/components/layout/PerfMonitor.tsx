"use client";

import { useEffect } from "react";

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

export default function PerfMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let lcpObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;

    // Largest Contentful Paint (LCP)
    try {
      lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformanceEntry[];
        const lastEntry = entries[entries.length - 1];

        if (!lastEntry) return;

        const lcpTime =
          (lastEntry as LargestContentfulPaint).renderTime || lastEntry.startTime;

        console.log(
          "✓ LCP:",
          Math.round(lcpTime * 100) / 100,
          "ms"
        );
      });

      lcpObserver.observe({
        type: "largest-contentful-paint",
        buffered: true,
      } as unknown as PerformanceObserverInit);
    } catch {}

    // Cumulative Layout Shift (CLS)
    try {
      let cls = 0;

      clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as LayoutShiftEntry[]) {
          if (!entry.hadRecentInput) {
            cls += entry.value || 0;
          }
        }

        if (cls > 0) {
          console.log(
            "✓ CLS:",
            Math.round(cls * 1000) / 1000
          );
        }
      });

      clsObserver.observe({
        type: "layout-shift",
        buffered: true,
      } as unknown as PerformanceObserverInit);
    } catch {}

    return () => {
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
    };
  }, []);

  return null;
}