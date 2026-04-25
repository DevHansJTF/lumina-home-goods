"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { products } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

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

export default function Home() {
  const featuredProducts = products.slice(0, 4);
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
    <div className="flex flex-col bg-[#FAFAFA] dark:bg-[#111111] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[75vh] 2xl:h-[800px] overflow-hidden group/hero">
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
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
          <motion.h2
            key={`title-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif text-[#F9F9F9] tracking-tight mb-4 drop-shadow-sm"
          >
            {slides[currentSlideIndex].title}
          </motion.h2>
          <motion.p
            key={`subtitle-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-[#F9F9F9]/90 mb-10 tracking-wide font-light drop-shadow-sm"
          >
            {slides[currentSlideIndex].subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products" className="block group/btn">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-white text-[#1A1A1A] px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold min-w-[180px] text-center shadow-lg border border-transparent transition-colors duration-300 isolate"
              >
                <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500 ease-in-out pointer-events-none">
                  SHOP NOW
                </span>
                <div className="absolute left-1/2 top-[120%] w-[200%] aspect-square -translate-x-1/2 group-hover/btn:top-[-40%] transition-all duration-700 ease-in-out z-0 pointer-events-none">
                  <div
                    className="w-full h-full bg-[#1A1A1A] rounded-[42%] animate-spin"
                    style={{ animationDuration: "6s" }}
                  />
                </div>
              </motion.div>
            </Link>
            <Link href="/contact" className="block group/btn">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-transparent border border-white text-white px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold min-w-[180px] text-center backdrop-blur-sm transition-colors duration-300 isolate"
              >
                <span className="relative z-10 group-hover/btn:text-[#1A1A1A] transition-colors duration-500 ease-in-out pointer-events-none">
                  CONTACT US
                </span>
                <div className="absolute left-1/2 top-[120%] w-[200%] aspect-square -translate-x-1/2 group-hover/btn:top-[-40%] transition-all duration-700 ease-in-out z-0 pointer-events-none">
                  <div
                    className="w-full h-full bg-white rounded-[42%] animate-spin"
                    style={{ animationDuration: "6s" }}
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1A] hover:bg-black text-white rounded-xl flex items-center justify-center transition-all opacity-0 group-hover/hero:opacity-100 z-20"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1A] hover:bg-black text-white rounded-xl flex items-center justify-center transition-all opacity-0 group-hover/hero:opacity-100 z-20"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Featured Products */}
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

        <div className="flex overflow-hidden relative w-full group">
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
                    <h4 className="font-serif text-xl leading-tight mb-1">{product.name}</h4>
                    <p className="text-gray-300 text-xs tracking-wider mb-3">Lumina Collection</p>
                    <p className="text-white font-medium">
                      Price: ${product.price.toFixed(2)}{" "}
                      <span className="line-through text-gray-400 text-sm ml-2">
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

      {/* Value Pointers */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white dark:bg-[#111111] py-24 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <h3 className="font-serif text-xl text-[#141414] dark:text-[#EAEAEA] mb-4">Sustainable Materials</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
              Responsibly sourced woods and eco-friendly fabrics ensure a lighter footprint.
            </p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <h3 className="font-serif text-xl text-[#141414] dark:text-[#EAEAEA] mb-4">Artisan Crafted</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
              Every piece is meticulously constructed by skilled craftspeople.
            </p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <h3 className="font-serif text-xl text-[#141414] dark:text-[#EAEAEA] mb-4">Timeless Design</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
              Aesthetics engineered to outlast trends and remain beautiful for generations.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
