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

  // Generate a secondary image out of the first one for the hover effect
  const primaryImage =
    product.image.startsWith("http") || product.image.startsWith("/") ? product.image : `/${product.image}`;
  const secondaryImage = primaryImage.includes("picsum.photos")
    ? primaryImage.replace(product.id, `${product.id}alt`)
    : primaryImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <Link
        href={`/products/${product.id}`}
        className="aspect-square bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 mb-4 flex items-center justify-center relative overflow-hidden transition-colors block"
      >
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
        />

        {/* Secondary Image (Hover) */}
        <Image
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          fill
          className="object-cover transition-all duration-700 transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 absolute inset-0"
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
          className="absolute bottom-0 left-0 right-0 bg-[#141414] dark:bg-[#EAEAEA] text-white dark:text-[#111111] text-[10px] uppercase tracking-widest py-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-center"
        >
          {product.inStock ? "+ Add to Cart" : "Out of Stock"}
        </button>
      </Link>

      <div className="flex flex-col">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h4 className="text-sm font-medium text-[#141414] dark:text-[#EAEAEA]">{product.name}</h4>
        </Link>
        <p className="text-sm font-sans font-semibold mt-1 text-[#141414] dark:text-gray-300">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
}
