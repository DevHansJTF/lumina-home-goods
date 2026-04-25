import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col bg-[#FAFAFA] dark:bg-[#111111] min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row h-auto md:h-[600px]">
        <div className="w-full md:w-1/2 bg-[#EFECE8] dark:bg-[#1A1A1A] flex flex-col justify-center px-10 py-16 md:px-16 lg:px-24">
          <span className="text-[#D97757] uppercase text-[10px] tracking-[0.3em] font-bold mb-4">New Collection</span>
          <h2 className="text-5xl lg:text-6xl font-serif italic mb-6 leading-tight text-[#1A1A1A] dark:text-[#EAEAEA]">
            The Art of <br />
            Living Quietly
          </h2>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
            Hand-curated modern essentials for the refined interior. From mid-century oak to brushed brass, discover
            pieces that speak in whispers.
          </p>
          <Link
            href="/products"
            className="border border-[#141414] dark:border-[#EAEAEA] px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-[#141414] dark:hover:bg-[#EAEAEA] hover:text-white dark:hover:text-[#111111] transition-colors w-max italic text-[#141414] dark:text-[#EAEAEA]"
          >
            Explore Gallery
          </Link>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
          <Image
            src="https://picsum.photos/seed/hero/2000/1000"
            alt="Modern living room interior"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 border-b border-gray-200 dark:border-gray-800 pb-4">
          <h3 className="text-2xl font-serif italic text-[#141414] dark:text-[#EAEAEA]">Signature Pieces</h3>
          <Link
            href="/products"
            className="text-[10px] uppercase tracking-widest text-[#141414] dark:text-[#EAEAEA] font-medium hover:opacity-70 transition-opacity mt-4 sm:mt-0"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Value Pointers */}
      <section className="bg-white dark:bg-[#111111] py-20 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div>
            <h3 className="font-serif italic text-lg text-[#141414] dark:text-[#EAEAEA] mb-3">Sustainable Materials</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
              Responsibly sourced woods and eco-friendly fabrics ensure a lighter footprint.
            </p>
          </div>
          <div>
            <h3 className="font-serif italic text-lg text-[#141414] dark:text-[#EAEAEA] mb-3">Artisan Crafted</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
              Every piece is meticulously constructed by skilled craftspeople.
            </p>
          </div>
          <div>
            <h3 className="font-serif italic text-lg text-[#141414] dark:text-[#EAEAEA] mb-3">Timeless Design</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
              Aesthetics engineered to outlast trends and remain beautiful for generations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
