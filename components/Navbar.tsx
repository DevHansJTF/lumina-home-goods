"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { cartCount, favorites } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsMobileMenuOpen(false); // Close mobile menu if open when scrolling down
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Delivery", href: "/delivery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full bg-[#FAFAFA]/95 dark:bg-[#111111]/95 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Desktop Nav in one group like HTML */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/lumina-logo-3.png" alt="Lumina Logo" width={48} height={48} className="object-contain" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium opacity-70">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors text-[#141414] dark:text-[#EAEAEA] ${
                    pathname === link.href ? "opacity-100 font-semibold" : "hover:opacity-100 opacity-60"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <ThemeToggle />

            <Link
              href="/favorites"
              className="relative p-2 cursor-pointer text-[#141414] dark:text-[#EAEAEA] hover:opacity-70 transition-opacity"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#C5A059] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              href="/checkout"
              className="relative p-2 cursor-pointer text-[#141414] dark:text-[#EAEAEA] hover:opacity-70 transition-opacity"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#D97757] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#141414] dark:text-[#EAEAEA]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAFA] dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 pt-4 pb-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xs uppercase tracking-widest font-medium ${
                  pathname === link.href
                    ? "text-[#141414] dark:text-[#EAEAEA] font-semibold"
                    : "text-gray-500 dark:text-gray-400 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
