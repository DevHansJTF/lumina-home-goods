"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { cartCount, favorites } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Delivery", href: "/delivery" },
    { name: "Contact", href: "/contact" },
  ];

  const isHome = pathname === "/";
  const isTransparentOnDark = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[0.22,1,0.36,1] ${
        scrolled
          ? "bg-[#FAFAFA]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-3 z-50">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Image src="/lumina-logo-3.png" alt="Lumina Logo" width={44} height={44} className="object-contain" />
            </motion.div>
          </Link>

          {/* Desktop Nav (Center Aligned) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 text-xs uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className="relative group py-2">
                  <span
                    className={`relative z-10 transition-colors duration-500 ${
                      isActive
                        ? "text-[#C5A059]"
                        : isTransparentOnDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Indicator */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1] ${
                      isActive ? "bg-transparent" : isTransparentOnDark ? "bg-white" : "bg-[#111111] dark:bg-[#FAFAFA]"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-4 z-50">
            <ThemeToggle isTransparentOnDark={isTransparentOnDark} />

            <Link
              href="/favorites"
              className={`group relative p-2 transition-colors duration-300 hover:text-[#C5A059] ${
                isTransparentOnDark ? "text-white" : "text-[#141414] dark:text-[#EAEAEA]"
              }`}
            >
              <Heart
                className="w-5 h-5 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-110"
                strokeWidth={1.5}
              />
              <AnimatePresence>
                {favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 bg-[#C5A059] text-white text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-md shadow-[#C5A059]/20"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link
              href="/checkout"
              className={`group relative p-2 transition-colors duration-300 hover:text-[#C5A059] ${
                isTransparentOnDark ? "text-white" : "text-[#141414] dark:text-[#EAEAEA]"
              }`}
            >
              <ShoppingCart
                className="w-5 h-5 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-1 group-hover:rotate-[-5deg]"
                strokeWidth={1.5}
              />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 bg-[#D97757] text-[#FAFAFA] text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-md shadow-[#D97757]/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-colors p-2 hover:text-[#C5A059] ${
                isTransparentOnDark ? "text-white" : "text-[#141414] dark:text-[#EAEAEA]"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#FAFAFA]/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-[#C5A059]"
                          : "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
