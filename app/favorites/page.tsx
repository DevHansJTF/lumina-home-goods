"use client";

import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { HeartCrack } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useStore();

  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center mb-16 border-b border-gray-200 dark:border-gray-800 pb-12">
        <h1 className="font-serif italic text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#EAEAEA] mb-4">
          Your Selection
        </h1>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Pieces you&apos;ve curated. Review your favorites and quickly add them to your inquiry.
        </p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <HeartCrack className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-6 stroke-1" />
          <h2 className="text-xl font-serif italic text-[#1A1A1A] dark:text-[#EAEAEA] mb-4">No favorites yet</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Explore the gallery to find pieces that speak to you.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#141414] dark:bg-[#EAEAEA] hover:bg-black dark:hover:bg-white text-white dark:text-[#111111] px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
          >
            Explore Gallery
          </Link>
        </div>
      )}
    </div>
  );
}
