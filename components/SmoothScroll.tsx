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
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.8,
    });

    window.__lenis_instance = lenis; // Expose globally to access in other effect if needed, but we can also just use window.scrollTo

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.__lenis_instance;
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
