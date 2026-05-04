"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, ArrowLeft, Quote } from "lucide-react";
import { products } from "@/lib/data";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

const slides = [
  {
    title: "Furniture",
    subtitle: "Timeless Designs for Every Room",
    image: "/velvet-emerald-sofa.jpg",
  },
  {
    title: "Lighting",
    subtitle: "Illuminate Your Space in Style",
    image: "/brushed-brass-lamp-floor.jpg",
  },
  {
    title: "Textiles",
    subtitle: "Comfort Meets Elegance",
    image: "/chunky-knit-throw-blanket.jpg",
  },
  {
    title: "Decor",
    subtitle: "The Exquisite Details",
    image: "/asymmetrical-brass-wall-mirror.jpg",
  },
];

const testimonials = [
  {
    quote:
      "Lumina Studio transformed our living space into a sanctuary of peace and elegance. The attention to detail is truly unparalleled.",
    author: "Sarah Jenkins",
    role: "Interior Architect",
  },
  {
    quote:
      "The craftsmanship is breathtaking. Each piece feels less like furniture and more like a functional work of art.",
    author: "David Chen",
    role: "Private Collector",
  },
  {
    quote:
      "A paradigm shift in modern design. Their curations define the aesthetic of tomorrow's most beautiful homes.",
    author: "Elena Rossi",
    role: "Design Review",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scaleImage = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const opacityText = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const yText = useTransform(heroScroll, [0, 1], [0, 200]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] min-h-screen text-[#141414] dark:text-[#EAEAEA] selection:bg-[#C5A059] selection:text-white transition-colors duration-300">
      {/* 1. Immersive Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-black flex items-center justify-center group/hero"
      >
        <motion.div style={{ scale: scaleImage }} className="absolute inset-0 z-0 origin-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={slides[currentSlideIndex].image}
                alt={slides[currentSlideIndex].title}
                fill
                sizes="100vw"
                className="object-cover opacity-80"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          style={{ opacity: opacityText, y: yText }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-6 block drop-shadow-md">
              Lumina Studio
            </span>
          </motion.div>

          <motion.h1
            key={`title-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tighter mb-4 drop-shadow-xl max-w-5xl leading-[0.9]"
          >
            {slides[currentSlideIndex].title}
          </motion.h1>

          <motion.p
            key={`subtitle-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 mb-12 tracking-wide font-light max-w-lg drop-shadow-md"
          >
            {slides[currentSlideIndex].subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:bg-white hover:text-black"
            >
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 backdrop-blur-md hover:bg-white/20 border border-white/10 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover/hero:opacity-100 z-20"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 backdrop-blur-md hover:bg-white/20 border border-white/10 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover/hero:opacity-100 z-20"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[9px] uppercase tracking-widest text-white/50">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Brand Philosophy / Manifesto */}
      <section className="py-32 md:py-48 px-6 max-w-screen-xl mx-auto w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight text-[#141414] dark:text-white"
        >
          &quot;We believe the spaces we inhabit shape the lives we lead. Every piece is a{" "}
          <span className="text-[#C5A059] italic">conversation </span> between form, function, and emotion.&quot;
        </motion.p>
      </section>

      {/* 3. Featured Pieces */}
      <section className="py-24 px-0 max-w-screen-2xl mx-auto w-full overflow-hidden">
        <div className="px-6 md:px-12 flex flex-col sm:flex-row justify-between items-end mb-12 pb-4">
          <h3 className="text-3xl font-serif text-[#141414] dark:text-[#EAEAEA]">Signature Pieces</h3>
          <Link
            href="/products"
            className="text-[10px] uppercase tracking-widest text-[#141414] dark:text-[#EAEAEA] font-medium hover:opacity-70 transition-opacity mt-4 sm:mt-0 flex items-center gap-2"
          >
            View All Products <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex overflow-hidden relative w-full">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex w-max gap-6 px-6"
          >
            {/* Double the products array to create an infinite scroll effect */}
            {[...products.slice(0, 8), ...products.slice(0, 8)].map((product, index) => {
              const primaryImage =
                product.image.startsWith("http") || product.image.startsWith("/") ? product.image : `/${product.image}`;
              return (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/products/${product.id}`}
                  className="relative block w-[280px] md:w-[320px] aspect-[4/5] rounded-3xl overflow-hidden group shrink-0"
                >
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 320px"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white z-10">
                    <h4 className="font-sans font-semibold text-xl leading-tight mb-1">{product.name}</h4>
                    <p className="text-gray-100 text-xs tracking-wider mb-3">Lumina Collection</p>
                    <p className="text-white font-medium">
                      Price: ${product.price.toFixed(2)}{" "}
                      <span className="line-through text-gray-300 text-sm ml-2">
                        ${(product.price * 1.1).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Craftsmanship Split Section */}
      <section className="relative py-24 bg-[#111111] text-white overflow-hidden w-full">
        <div className="max-w-screen-2xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative w-full rounded-2xl overflow-hidden bg-black/50 flex flex-col justify-center">
            <MuxPlayer
              playbackId="g1ur4QIrNIZy7qZzYBP01YmwEr01asfiSNgWG2JabnkdE"
              metadata={{
                video_id: "artisan",
                video_title: "artisan",
              }}
              autoPlay="muted"
              loop
              muted
              playsInline
              style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold mb-6">The Process</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
              Honoring the <br />
              <span className="italic text-gray-500 dark:text-gray-400">Material.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-10 max-w-lg">
              We collaborate with master artisans worldwide. Each piece is an exercise in restraint—stripping away the
              unnecessary to reveal the raw beauty of solid woods, cast metals, and hand-woven textiles.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-serif mb-2">Sustainable</h4>
                <p className="text-sm text-gray-500">Ethically sourced materials with a minimal carbon footprint.</p>
              </div>
              <div>
                <h4 className="text-xl font-serif mb-2">Heritage</h4>
                <p className="text-sm text-gray-500">Traditional joinery and metalworking techniques.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials (New) */}
      <section className="py-32 px-6 max-w-screen-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold mb-6">Voices</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#141414] dark:text-white">
            Words of <span className="italic text-gray-500 dark:text-gray-400">Praise.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <Quote className="w-8 h-8 text-[#C5A059] mb-8 opacity-50" />
              <p className="text-lg md:text-xl font-serif leading-relaxed text-[#141414] dark:text-[#EAEAEA] mb-8">
                &quot;{t.quote}&quot;
              </p>
              <div className="mt-auto">
                <p className="text-xs uppercase tracking-widest font-bold text-[#141414] dark:text-white mb-1">
                  {t.author}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Massive Footer CTA */}
      <section className="py-32 md:py-48 px-6 bg-[#C5A059] text-center text-white w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-serif tracking-tighter leading-none mb-8">
            Curate Your <br />
            <span className="italic">World.</span>
          </h2>
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-4 bg-white text-[#C5A059] px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10">Begin Exploring</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
