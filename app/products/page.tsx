"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

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
    { value: "default", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Alphabetical: A-Z" },
    { value: "name-desc", label: "Alphabetical: Z-A" },
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

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#EAEAEA] mb-4">Our Collection</h1>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Thoughtfully designed pieces for every room. Elevate your space with our curated selection.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-8 mb-10 border-b border-gray-200 dark:border-gray-800 pb-10">
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

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-[#141414] dark:focus:border-[#EAEAEA] transition-colors text-[#141414] dark:text-[#EAEAEA] rounded-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4 w-full md:w-auto relative z-30" ref={sortRef}>
          <label className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Sort By
          </label>
          <div className="relative w-full md:w-56">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 text-xs focus:outline-none transition-colors text-[#141414] dark:text-[#EAEAEA]"
            >
              <span className="font-medium tracking-wide">
                {sortOptionsData.find((opt) => opt.value === sortOption)?.label}
              </span>
              <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
                >
                  {sortOptionsData.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-xs tracking-wide transition-colors ${
                        sortOption === option.value
                          ? "bg-gray-100 dark:bg-gray-800 text-[#141414] dark:text-[#EAEAEA] font-semibold"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#222222] hover:text-[#141414] dark:hover:text-[#EAEAEA]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-serif mb-2">No products found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search query or filters.</p>
        </div>
      )}
    </div>
  );
}
