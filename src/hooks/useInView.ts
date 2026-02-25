"use client";

import { useInView as useReactInView } from "react-intersection-observer";

export function useInView(threshold = 0.15) {
  const { ref, inView } = useReactInView({
    threshold,
    triggerOnce: true,
  });
  return { ref, inView };
}
