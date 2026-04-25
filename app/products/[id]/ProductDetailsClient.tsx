"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Link as LinkIcon, Heart, Plus, Minus } from "lucide-react";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [dimensionsOpen, setDimensionsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = () => {
    // Current store API doesn't have a quantity-based addToCart.
    // It's fine to just call it multiple times or we could just add one like quick add.
    // Let's add it a loop or just send one for now.
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-xl">
      <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] dark:text-[#EAEAEA] mb-4">{product.name}</h1>
      <p className="text-lg text-[#141414] dark:text-gray-300 font-medium mb-6">${product.price.toFixed(2)}</p>

      <p className="text-xs text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest">
        SKU{" "}
        <span className="font-sans font-medium text-[#141414] dark:text-[#EAEAEA] ml-1">
          {product.id.padStart(6, "0")}
        </span>
      </p>

      <div className="flex items-end gap-4 mb-8">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            Quantity
          </label>
          <div className="flex items-center border border-gray-200 dark:border-gray-700 h-12 w-32 bg-[#FAFAFA] dark:bg-[#1A1A1A]">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#141414] dark:hover:text-[#EAEAEA] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex-1 text-center text-sm font-medium dark:text-[#EAEAEA]">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#141414] dark:hover:text-[#EAEAEA] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 h-12 bg-[#141414] dark:bg-[#EAEAEA] text-white dark:text-[#111111] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.inStock ? "Add To Cart" : "Out of Stock"}
        </button>

        <button
          onClick={() => toggleFavorite(product.id)}
          className="w-12 h-12 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all hover:border-[#D97757]"
          aria-label="Toggle Favorite"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-[#D97757] text-[#D97757]" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col gap-3 py-6 border-t border-b border-gray-100 dark:border-gray-800 mb-8">
        <span className="text-xs text-[#141414] dark:text-[#EAEAEA] font-medium">Share this:</span>
        <div className="flex gap-3">
          <button
            onClick={copyLink}
            className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </button>
          <button
            onClick={copyLink}
            className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </button>
          <button
            onClick={copyLink}
            className="w-8 h-8 rounded-full bg-[#bd081c] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M12 2A10 10 0 0 0 2 12c0 4.3 2.7 8 6.5 9.5a1 1 0 0 1 .5.5c0 1 0 2-1 3.5c0 1 0 2-1 3.5c0 1 0 2-1 3.5a10 10 0 0 1 10 10c0 4.4-4.8 9.5-12 9.5a3.5 3.5 1 0 0 7 0" />
            </svg>
          </button>
          <button
            onClick={copyLink}
            className="w-8 h-8 rounded-full bg-[#141414] dark:bg-gray-700 text-white flex items-center justify-center hover:opacity-80 transition-opacity relative"
          >
            <LinkIcon className="w-4 h-4" />
            {copied && (
              <span className="absolute -top-8 bg-black text-white text-[10px] py-1 px-2 rounded">Copied!</span>
            )}
          </button>
        </div>
      </div>

      {/* Accordions */}
      <div className="flex flex-col w-full border-t border-gray-100 dark:border-gray-800 border-b">
        {/* Details */}
        <div className="flex flex-col border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="flex justify-between items-center py-5 w-full text-left bg-gray-50/50 dark:bg-[#151515] px-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#141414] dark:text-[#EAEAEA]">
              Details
            </span>
            {detailsOpen ? (
              <Minus className="w-4 h-4 dark:text-gray-400" />
            ) : (
              <Plus className="w-4 h-4 dark:text-gray-400" />
            )}
          </button>
          {detailsOpen && (
            <div className="pb-6 pt-2 px-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              <p className="mb-4">{product.description}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Category: {product.category}</li>
                <li>Premium materials selected for longevity</li>
                <li>Responsibly manufactured</li>
                <li>Care instructions included</li>
              </ul>
            </div>
          )}
        </div>

        {/* Dimensions */}
        <div className="flex flex-col border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setDimensionsOpen(!dimensionsOpen)}
            className="flex justify-between items-center py-5 w-full text-left bg-gray-50/50 dark:bg-[#151515] px-4 -mt-px mt-0"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#141414] dark:text-[#EAEAEA]">
              Dimensions
            </span>
            {dimensionsOpen ? (
              <Minus className="w-4 h-4 dark:text-gray-400" />
            ) : (
              <Plus className="w-4 h-4 dark:text-gray-400" />
            )}
          </button>
          {dimensionsOpen && (
            <div className="pb-6 pt-2 px-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              <ul className="list-none space-y-2">
                <li>
                  <span className="font-medium text-[#141414] dark:text-gray-300">Width:</span> Standard variations
                </li>
                <li>
                  <span className="font-medium text-[#141414] dark:text-gray-300">Height:</span> Standard variations
                </li>
                <li>
                  <span className="font-medium text-[#141414] dark:text-gray-300">Depth:</span> Fits typical room sizes
                </li>
                <li className="pt-2 text-xs italic">Please contact support for exact measurements.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
