import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import Toaster from "@/components/Toaster";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css"; // Global styles

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lumina Home Goods",
  description: "A modern home goods e-commerce portfolio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#FAFAFA] dark:bg-[#111111] text-gray-900 dark:text-[#EAEAEA] antialiased min-h-screen flex flex-col pt-16 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
