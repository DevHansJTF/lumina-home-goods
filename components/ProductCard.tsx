"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { motion } from "motion/react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const isFavorite = favorites.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer flex flex-col"
    >
      <div className="aspect-square bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 mb-4 p-6 flex items-center justify-center relative overflow-hidden transition-colors">
        <Image
          src={product.image.startsWith("http") || product.image.startsWith("/") ? product.image : `/${product.image}`}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
        />

        {/* Badges/Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product.id);
            }}
            className="p-2 bg-white/90 dark:bg-[#111111]/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-[#D97757] transition-all shadow-sm"
            aria-label="Toggle Favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-[#D97757] text-[#D97757]" : ""}`} />
          </button>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={!product.inStock}
          className="absolute bottom-0 left-0 right-0 bg-[#141414] dark:bg-[#EAEAEA] text-white dark:text-[#111111] text-[10px] uppercase tracking-widest py-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {product.inStock ? "+ Quick Inquiry" : "Out of Stock"}
        </button>
      </div>

      <div className="flex flex-col">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
          {product.category}
        </p>
        <h4 className="text-sm font-medium text-[#141414] dark:text-[#EAEAEA]">{product.name}</h4>
        <p className="text-sm font-serif italic mt-1 text-[#141414] dark:text-gray-300">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}
