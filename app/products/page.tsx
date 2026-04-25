"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");

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
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label
            htmlFor="sort"
            className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 whitespace-nowrap"
          >
            Sort By
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full md:w-auto px-4 py-3 bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 text-xs focus:outline-none focus:border-[#141414] dark:focus:border-[#EAEAEA] transition-colors text-[#141414] dark:text-[#EAEAEA] rounded-none focus:ring-0 cursor-pointer"
          >
            <option value="default">Featured (Default)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical (A-Z)</option>
            <option value="name-desc">Alphabetical (Z-A)</option>
          </select>
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
