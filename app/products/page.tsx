"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="font-serif italic text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#EAEAEA] mb-4">
          Our Collection
        </h1>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Thoughtfully designed pieces for every room. Elevate your space with our curated selection.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-[10px] uppercase tracking-widest pb-1 transition-colors ${
              selectedCategory === category
                ? "border-b border-[#141414] dark:border-[#EAEAEA] text-[#141414] dark:text-[#EAEAEA] font-bold"
                : "border-b border-transparent text-gray-400 dark:text-gray-500 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
