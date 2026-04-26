import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductDetailsClient from "./ProductDetailsClient";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20 flex flex-col lg:flex-row gap-12 lg:gap-24">
      {/* Breadcrumb */}
      <div className="w-full lg:hidden mb-4">
        <Link
          href="/products"
          className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
        >
          &larr; Back to Products
        </Link>
      </div>

      {/* Left: Image */}
      <div className="w-full lg:w-1/2">
        <div className="hidden lg:block mb-8">
          <Link
            href="/products"
            className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
          >
            &larr; Back to Products
          </Link>
        </div>
        <div className="aspect-square w-full max-w-2xl mx-auto bg-[#F5F5F5] dark:bg-[#1A1A1A] flex items-center justify-center relative overflow-hidden">
          <Image
            src={
              product.image.startsWith("http") || product.image.startsWith("/") ? product.image : `/${product.image}`
            }
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Right: Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start pt-8 lg:pt-16">
        <ProductDetailsClient product={product} />
      </div>
    </div>
  );
}
