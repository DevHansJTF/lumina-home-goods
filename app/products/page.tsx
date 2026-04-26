"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { ChevronDown, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortOptionsData = [
    { value: "default", label: "Curated Showcase" },
    { value: "price-asc", label: "Value: Ascending" },
    { value: "price-desc", label: "Value: Descending" },
    { value: "name-asc", label: "Nomenclature: A-Z" },
    { value: "name-desc", label: "Nomenclature: Z-A" },
  ];

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    // Apply Sorting
    result = [...result];
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortOption]);

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
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
          className="max-w-4xl"
        >
          <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-8 block">Gallery</span>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif leading-[0.9] tracking-tighter mb-8 text-[#141414] dark:text-white">
            The Master <br />
            <span className="italic text-gray-400 dark:text-gray-500">Collection.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl">
            A definitive curation of avant-garde seating and architectural lighting, crafted to define the sanctuaries
            of tomorrow.
          </p>
        </motion.div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-6 pb-32">
        {/* Controls Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-gray-200 dark:border-gray-800 pb-12"
        >
          {/* Categories Filter */}
          <div className="w-full lg:w-auto">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 flex items-center gap-2">
              <Filter className="w-3 h-3" /> Categorization
            </h3>
            <div className="flex flex-wrap gap-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs uppercase tracking-widest pb-2 transition-all relative ${
                    selectedCategory === category
                      ? "text-[#141414] dark:text-white font-semibold"
                      : "text-gray-400 dark:text-gray-500 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Discipline, name, or materiality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-0 pr-10 py-2 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-0 focus:border-[#C5A059] dark:focus:border-[#C5A059] transition-colors text-[#141414] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 appearance-none"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Sort */}
            <div className="relative w-full sm:w-64 z-30" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between py-2 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 text-sm focus:outline-none transition-colors text-[#141414] dark:text-white group"
              >
                <span className="tracking-wide">{sortOptionsData.find((opt) => opt.value === sortOption)?.label}</span>
                <motion.div
                  animate={{ rotate: isSortOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="group-hover:text-[#C5A059] transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 shadow-2xl py-2"
                  >
                    {sortOptionsData.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOption(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 text-xs tracking-wide transition-colors flex items-center justify-between ${
                          sortOption === option.value
                            ? "bg-gray-50 dark:bg-gray-800/50 text-[#C5A059] font-medium"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
                        }`}
                      >
                        {option.label}
                        {sortOption === option.value && (
                          <motion.div layoutId="sortIndicator" className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key="grid"
              variants={containerVars}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVars} layout>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 mb-8 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-300 dark:text-gray-700" />
              </div>
              <p className="text-3xl font-serif text-[#141414] dark:text-[#EAEAEA] mb-4">No results manifest</p>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md font-light">
                Our archives yield no pieces matching your current inquiry parameters. Allow us to suggest alternative
                discoveries.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSortOption("default");
                }}
                className="mt-8 text-xs uppercase tracking-widest border-b border-[#141414] dark:border-white pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
