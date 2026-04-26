"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Design Philosophy",
    subtitle: "The Conception",
    content:
      "Every piece at Lumina begins as a singular vision. We sketch without constraints, focusing purely on form, function, and the profound emotional resonance our creations will bring to your living space.",
    align: "right",
  },
  {
    title: "Sourced Elegance",
    subtitle: "Raw Materials",
    content:
      "We travel the globe searching for materials of uncompromising quality. From sustainable old-growth hardwoods to hand-loomed textiles, every element is chosen for its unparalleled texture and enduring strength.",
    align: "left",
  },
  {
    title: "Master Craftsmanship",
    subtitle: "The Atelier",
    content:
      "In our workshops, artisans blend generations of heritage techniques with modern precision. Every joint, seam, and finish is executed by hand, demanding hours of meticulous labor to achieve absolute perfection.",
    align: "right",
  },
  {
    title: "Timeless Permanence",
    subtitle: "The Artifact",
    content:
      "A Lumina product is not built for a season, it is forged for a lifetime. Our goal is to create heirloom-quality artifacts that will age gracefully, accumulating character and stories across generations.",
    align: "left",
  },
];

function CheckpointDiv({
  x,
  y,
  index,
  progress,
}: {
  x: number;
  y: number;
  index: number;
  progress: MotionValue<number>;
}) {
  return null;
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize scroll snapping
  useEffect(() => {
    // Apply native CSS scroll snapping to the document to create the magnetic section effect
    document.documentElement.classList.add("snap-y", "snap-mandatory");

    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a smooth, buttery spring to the raw scroll proportion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 17,
    mass: 0.8,
  });

  // The left translation for the floating image using % to perfectly match the SVG path
  const logoLeftStr = useTransform(smoothProgress, [0, 1 / 3, 2 / 3, 1], ["25%", "75%", "25%", "75%"]);

  // The top translation perfectly matching the 0% to 100% height of the SVG
  const logoTopStr = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Floating rotation to give it an elegant, dynamic feel (purely visual)
  const logoRotate = useTransform(smoothProgress, [0, 1], [-6, 6]);

  const imageScale = useTransform(
    smoothProgress,
    [0, 1 / 6, 1 / 3, 3 / 6, 2 / 3, 5 / 6, 1],
    [1.05, 0.9, 1.05, 0.9, 1.05, 0.9, 1.05],
  );

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#111111] overflow-x-hidden font-sans selection:bg-[#1A1A1A] selection:text-white dark:selection:bg-white dark:selection:text-[#1A1A1A]">
      {/* Header */}
      <div className="pt-32 pb-16 text-center px-6 relative z-20 snap-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#1A1A1A] dark:text-[#EAEAEA] mb-6 tracking-tight">
            The Lumina Story
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium tracking-wide">
            From our founders&apos; vision to your sanctuary. Discover the unyielding standards of our craft and the
            philosophy shaping our designs.
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} className="relative w-full">
        {/* The elegant path line */}
        <div className="absolute top-[50vh] bottom-[50vh] left-0 right-0 z-0 pointer-events-none hidden md:block max-w-[1200px] mx-auto px-12">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Outline Line */}
            <motion.path
              d="M 25 0 L 75 33.333333 L 25 66.666666 L 75 100"
              vectorEffect="non-scaling-stroke"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              className="text-gray-300 dark:text-gray-800"
            />
            {/* Fill Line */}
            <motion.path
              d="M 25 0 L 75 33.333333 L 25 66.666666 L 75 100"
              vectorEffect="non-scaling-stroke"
              stroke="#C5A059"
              strokeWidth="1.5"
              fill="none"
              style={{ pathLength: smoothProgress }}
            />
          </svg>

          {/* Checkpoints mapped across the trajectory */}
          {[
            { x: 25, y: 0 },
            { x: 75, y: 33.333333 },
            { x: 25, y: 66.666666 },
            { x: 75, y: 100 },
          ].map((pt, i) => (
            <CheckpointDiv key={i} x={pt.x} y={pt.y} index={i} progress={smoothProgress} />
          ))}

          {/* The Floating Logo perfectly translating along the path (Desktop) */}
          <motion.div
            style={{ left: logoLeftStr, top: logoTopStr, x: "-50%", y: "-50%" }}
            className="absolute flex items-center justify-center z-20 pointer-events-none"
          >
            <motion.div
              style={{ rotate: logoRotate, scale: imageScale }}
              className="relative w-72 md:w-[28rem] aspect-square drop-shadow-2xl flex items-center justify-center will-change-transform"
            >
              <Image
                src="/lumina-logo-3.png"
                alt="Lumina Signature Logo"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_10px_17px_rgba(0,0,0,0.4)]"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M60 40 L90 40 L90 140 C90 150, 100 160, 110 160 C120 160, 130 150, 130 140 L130 120 L160 120 L160 140 C160 170, 140 190, 110 190 C80 190, 60 170, 60 140 Z' fill='url(%23g)'/%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23C5A059'/%3E%3Cstop offset='100%25' stop-color='%238c6d32'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E";
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Version Logo Center absolute fixed */}
        <div className="absolute inset-0 z-0 pointer-events-none block md:hidden">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 relative md:static">
              <div className="relative w-[95vw] aspect-square">
                <Image
                  src="/lumina-logo-3.png"
                  alt="Logo"
                  fill
                  unoptimized
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Layer */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          {sections.map((section, idx) => (
            <section
              key={idx}
              className={`w-full min-h-[100svh] md:h-screen md:min-h-0 flex flex-col justify-center px-8 md:px-16 py-24 md:py-0 snap-center ${
                section.align === "left" ? "items-start" : "items-end"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`max-w-xl flex flex-col w-full backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-2xl md:rounded-none bg-white/40 dark:bg-black/40 md:bg-transparent md:dark:bg-transparent ${
                  section.align === "left" ? "text-left items-start" : "text-right items-end"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  {section.align === "right" && (
                    <div className="hidden md:block h-[1px] w-12 bg-gray-300 dark:bg-gray-700"></div>
                  )}
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] dark:text-[#EAEAEA]">
                    0{idx + 1} {"//"} {section.subtitle}
                  </span>
                  {section.align === "left" && (
                    <div className="hidden md:block h-[1px] w-12 bg-gray-300 dark:bg-gray-700"></div>
                  )}
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] dark:text-[#EAEAEA] mb-6 leading-[1.1] tracking-tight">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-400 md:max-w-[85%] font-medium">
                  {section.content}
                </p>
              </motion.div>
            </section>
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="relative z-20 bg-[#1A1A1A] text-white py-32 md:py-48 px-6 text-center overflow-hidden snap-center">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <span className="text-9xl font-serif italic tracking-tighter scale-150">Lumina</span>
        </div>
        <div className="relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl mb-6"
          >
            Ready to Experience?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 max-w-lg mx-auto mb-10 text-sm leading-relaxed"
          >
            Our masterfully crafted collections await your discovery. Elevate your living space with designs that merge
            uncompromising quality and timeless aesthetics.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-white text-[#141414] px-10 py-5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gray-100 transition-colors shadow-2xl shadow-white/10"
            >
              Explore Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
