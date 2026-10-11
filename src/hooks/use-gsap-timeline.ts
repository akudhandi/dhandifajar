"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapTimeline<T extends HTMLElement = HTMLDivElement>(
  animation: (element: T, timeline: gsap.core.Timeline) => void,
  dependencies: any[] = []
) {
  const ref = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline();
    timelineRef.current = tl;

    const ctx = gsap.context(() => {
      if (ref.current) {
        animation(ref.current, tl);
      }
    }, ref);

    return () => {
      ctx.revert();
      tl.kill();
    };
  }, [animation, ...dependencies]);

  return { ref, timeline: timelineRef };
}
