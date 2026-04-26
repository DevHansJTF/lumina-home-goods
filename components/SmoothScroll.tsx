"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
