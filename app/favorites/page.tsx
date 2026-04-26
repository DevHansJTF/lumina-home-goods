"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
  const { favorites } = useStore();
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#141414] dark:text-[#EAEAEA] selection:bg-[#C5A059] selection:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-40 md:pt-56 pb-20 px-6 max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-center mx-auto"
        >
          <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-8 block flex justify-center items-center gap-3">
            <Heart className="w-4 h-4" /> Curriculum
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter mb-8 text-[#141414] dark:text-white">
            Curated <br />
            <span className="italic text-gray-400 dark:text-gray-500">Selections.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            A private gallery of pieces that resonate with your vision for the perfect sanctuary.
          </p>
        </motion.div>
      </section>

      {/* Main Content Layout */}
      <section className="px-6 max-w-screen-2xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          {favoriteProducts.length > 0 ? (
            <motion.div
              key="grid"
              variants={containerVars}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
            >
              {favoriteProducts.map((product) => (
                <motion.div key={product.id} variants={itemVars}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="relative mb-12">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[#C5A059] blur-[60px] rounded-full"
                />
                <Heart className="w-16 h-16 text-[#C5A059] relative z-10 stroke-[1.5px]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#141414] dark:text-[#EAEAEA] mb-6 tracking-tight">
                Your gallery is currently empty
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto font-light leading-relaxed">
                Wander through our collections and select the pieces that speak to your architectural desires.
              </p>

              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center gap-4 bg-[#141414] dark:bg-white text-white dark:text-[#111111] px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/5"
              >
                <span className="relative z-10">Explore Collections</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-[#C5A059] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-500 border border-[#C5A059]" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
