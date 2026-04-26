"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, Globe, ShieldCheck, MapPin } from "lucide-react";
import Lenis from "lenis";

const deliveryPhases = [
  {
    num: "01",
    title: "Authentication & Casing",
    description:
      "Every piece undergoes a final multi-point inspection by our master artisans before being secured in custom-built, climate-resistant casing designed exclusively for its dimensions.",
    icon: Package,
    image: "https://images.unsplash.com/photo-1615800098779-1e32dc39b1eb?q=80&w=2000&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Global Transit Network",
    description:
      "We bypass standard couriers. Our partnerships with elite, private logistics networks ensure your artifact crosses oceans and borders with zero friction and absolute priority.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2000&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "White Glove Installation",
    description:
      "Our dedicated installation team doesn't just deliver; they orchestrate the final placement. We handle unboxing, assembly, and precise positioning within your sanctuary.",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "The Handover",
    description:
      "A formal transfer of ownership. You receive the physical Certificate of Authenticity, care guides, and the digital provenance records, marking the completion of the journey.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=2000&auto=format&fit=crop",
  },
];

function PhaseCard({
  phase,
  index,
  progress,
  total,
}: {
  phase: any;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  // calculate when this card is in the center
  // total = 4.
  // index 0 -> center at progress 0
  // index 1 -> center at progress 0.333
  // index 2 -> center at progress 0.666
  // index 3 -> center at progress 1

  const centerValue = index / (total - 1);
  const distance = 1 / (total - 1);

  // Opacity and scale based on distance to center
  const opacity = useTransform(progress, [centerValue - distance, centerValue, centerValue + distance], [0.1, 1, 0.1]);

  const scale = useTransform(progress, [centerValue - distance, centerValue, centerValue + distance], [0.8, 1, 0.8]);

  const yOffset = useTransform(progress, [centerValue - distance, centerValue, centerValue + distance], [100, 0, -100]);

  const bgScale = useTransform(progress, [centerValue - distance, centerValue, centerValue + distance], [1.2, 1, 1.2]);

  const Icon = phase.icon;

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6 md:p-24 relative overflow-hidden shrink-0">
      {/* Background Image Parallax Effect */}
      <motion.div
        style={{ scale: bgScale, opacity }}
        className="absolute inset-0 z-0 overflow-hidden opacity-30 md:opacity-40"
      >
        <Image
          src={phase.image}
          alt={phase.title}
          fill
          unoptimized
          className="object-cover grayscale mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] dark:from-[#0A0A0A] via-[#FAFAFA]/80 dark:via-[#0A0A0A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] dark:from-[#0A0A0A] via-transparent to-[#FAFAFA] dark:to-[#0A0A0A]" />
      </motion.div>

      <motion.div
        style={{ scale, y: yOffset, opacity }}
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
      >
        {/* Number & Icon graphic */}
        <div className="flex flex-col gap-8 md:gap-16">
          <div className="text-[#C5A059] font-serif text-8xl md:text-[12rem] leading-none tracking-tighter opacity-80 mix-blend-screen">
            <span>{phase.num}</span>
          </div>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-[#C5A059]/30 flex items-center justify-center backdrop-blur-md relative overflow-hidden">
            {/* Rotating halo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-2 border-[#C5A059] rounded-full opacity-50"
            />
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#C5A059] relative z-10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="overflow-hidden">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1]">{phase.title}</h2>
          </div>
          <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-lg">
            {phase.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function EnhancedDeliveryPage() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

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
  }, []);

  const { scrollYProgress: horizontalScrollProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Spring physics for buttery smooth scrolling inside the horizontal section
  const smoothProgress = useSpring(horizontalScrollProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  });

  // Since we have 4 items, the total width is 400vw. We want to translate it to -300vw
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  // Hero section parallax
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#141414] dark:text-white min-h-screen selection:bg-[#C5A059] selection:text-white font-sans transition-colors duration-300">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-8 block">
              Logistics & Care
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto text-[#141414] dark:text-white">
              The Art of
              <br /> <span className="italic text-gray-500 dark:text-gray-500">Arrival.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            Uncompromising transport tailored for the world&apos;s most discerning collectors. Every mile carefully
            orchestrated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 48 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-gray-500"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] transform rotate-90 translate-y-12 shrink-0">
              Scroll
            </span>
            <div className="w-[1px] h-full bg-gradient-to-b from-[#C5A059] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Horizontal Scroll Section */}
      <section
        ref={horizontalScrollRef}
        className="relative h-[400vh] bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300"
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex w-[400vw]">
            {deliveryPhases.map((phase, index) => (
              <PhaseCard
                key={index}
                phase={phase}
                index={index}
                progress={smoothProgress}
                total={deliveryPhases.length}
              />
            ))}
          </motion.div>

          {/* Global Progress Line inside the sticky container */}
          <div className="absolute bottom-12 left-12 right-12 md:left-24 md:right-24 h-[1px] bg-white/10 z-20">
            <motion.div className="h-full bg-[#C5A059]" style={{ scaleX: smoothProgress, transformOrigin: "left" }} />
          </div>
        </div>
      </section>

      {/* Assurance Section */}
      <section className="py-32 md:py-48 px-6 bg-white dark:bg-[#111111] relative z-20 overflow-hidden transition-colors duration-300">
        {/* Abstract shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none transform skew-x-12" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-[#C5A059] uppercase tracking-[0.3em] font-bold text-[10px] md:text-xs mb-8 block"
          >
            Ironclad Assurance
          </motion.span>

          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-6xl font-serif tracking-tight"
            >
              Fully Insured at Every Vertical
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 md:text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto"
          >
            From the moment it leaves our hands to the second it rests in yours, your piece is protected by
            comprehensive, zero-deductible transit insurance underwritten by Lloyds of London.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 mt-16 text-left relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

            {[
              {
                title: "Real-Time Tracking",
                desc: "Access minute-by-minute updates via our private concierge portal, featuring GPS telemetry and milestone confirmations.",
              },
              {
                title: "Climate Control",
                desc: "Sensitive materials are transported in hermetically sealed, humidity-regulated environments to prevent warping or degradation.",
              },
              {
                title: "Dedicated Liaison",
                desc: "A single point of contact oversees your entire delivery journey, available 24/7 to address any logistical requirements.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <h4 className="text-[#141414] dark:text-white font-serif text-2xl mb-4">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-black transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1615800098779-1e32dc39b1eb?q=80&w=2000&auto=format&fit=crop"
            alt="Background Texture"
            fill
            unoptimized
            className="object-cover grayscale mix-blend-screen opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-black via-gray-100/80 dark:via-black/80 to-white/0 dark:to-[#111111]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter text-[#141414] dark:text-white">
            Your Sanctuary Awaits
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-12 font-light">
            Experience the pinnacle of craftsmanship and care. Begin acquiring your legacy pieces today.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/products"
              className="inline-flex items-center gap-4 bg-[#C5A059] text-black px-10 py-5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)]"
            >
              Shop Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
