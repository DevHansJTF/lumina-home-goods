import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import Toaster from "@/components/Toaster";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css"; // Global styles

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina Home Goods",
  description: "A modern home goods e-commerce portfolio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#FAFAFA] dark:bg-[#111111] text-gray-900 dark:text-[#EAEAEA] antialiased min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll />
          <StoreProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster />
            <ScrollToTop />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
