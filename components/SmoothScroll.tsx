"use client";

import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __lenis_instance?: any;
  }
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    let lenis: any = null;
    let rafId: number;

    const initLenis = () => {
      if (mediaQuery.matches && !lenis) {
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }

        lenis = new Lenis({
          lerp: 0.05,
          wheelMultiplier: 0.8,
        });

        window.__lenis_instance = lenis;

        const raf = (time: number) => {
          if (lenis) lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);
      } else if (!mediaQuery.matches && lenis) {
        lenis.destroy();
        lenis = null;
        delete window.__lenis_instance;
        cancelAnimationFrame(rafId);
      }
    };

    initLenis();
    mediaQuery.addEventListener("change", initLenis);

    return () => {
      if (lenis) {
        lenis.destroy();
        delete window.__lenis_instance;
        if (rafId) cancelAnimationFrame(rafId);
      }
      mediaQuery.removeEventListener("change", initLenis);
    };
  }, []);

  useLayoutEffect(() => {
    // Ensure scroll is at top when pathname changes, immediately.
    window.scrollTo(0, 0);
    if (window.__lenis_instance) {
      window.__lenis_instance.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
