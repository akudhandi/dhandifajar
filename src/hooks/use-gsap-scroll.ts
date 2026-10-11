"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScroll<T extends HTMLElement = HTMLDivElement>(
  animation: (element: T, ctx: gsap.Context) => void,
  dependencies: any[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      if (ref.current) {
        animation(ref.current, ctx);
      }
    }, ref);

    return () => ctx.revert();
  }, [animation, ...dependencies]);

  return ref;
}
