export function initPerformanceMonitoring() {
  if (typeof window === "undefined") return;

  try {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as PerformanceEntry[];
      const lastEntry = entries[entries.length - 1];

      if (!lastEntry) return;

      const lcpTime =
        (lastEntry as LargestContentfulPaint).renderTime || lastEntry.startTime;

      console.log("LCP:", lcpTime);
    });

    observer.observe({
      type: "largest-contentful-paint",
      buffered: true,
    } as unknown as PerformanceObserverInit);
  } catch {
    // Ignore browser errors
  }
}