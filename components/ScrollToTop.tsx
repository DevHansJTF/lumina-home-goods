"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis_instance) {
      window.__lenis_instance.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="group fixed bottom-8 md:bottom-12 right-8 md:right-12 z-50 flex items-center justify-center w-14 h-14 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500"
          aria-label="Scroll to top"
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-[#FAFAFA]/90 dark:bg-[#111111]/90 backdrop-blur-xl transition-all duration-500 group-hover:bg-[#111111] dark:group-hover:bg-[#FAFAFA]" />

          {/* Outline track */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-black/10 dark:text-white/10"
            />
            {/* Dynamic progress */}
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#C5A059] group-hover:text-[#FAFAFA] dark:group-hover:text-[#111111] transition-colors duration-500"
              style={{ pathLength }}
            />
          </svg>

          {/* Arrow inside */}
          <div className="relative text-[#111111] dark:text-[#FAFAFA] group-hover:text-[#FAFAFA] dark:group-hover:text-[#111111] transition-colors duration-500 overflow-hidden w-5 h-5 flex flex-col items-center justify-start">
            <div className="flex flex-col transform transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-5">
              <ArrowUp className="w-5 h-5 shrink-0" strokeWidth={1.5} />
              <ArrowUp className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
