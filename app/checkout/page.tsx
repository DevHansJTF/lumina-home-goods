"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, addToast } = useStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      city: formData.get("city"),
      zip: formData.get("zip"),
      cart: cart.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
      total: cartTotal,
    };

    try {
      // Simulate webhook POST request
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        clearCart();
        addToast("Your inquiry has been sent! We will email you shortly.", "success");
        router.push("/");
      } else {
        throw new Error("Failed to submit inquiry");
      }
    } catch (error) {
      addToast("There was an error submitting your request. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] flex flex-col items-center justify-center px-6 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mb-12 relative flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#C5A059] blur-[60px] rounded-full w-24 h-24 mx-auto"
            />
            <div className="w-24 h-24 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center relative z-10 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
              <span className="text-2xl text-gray-400">0</span>
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#141414] dark:text-[#EAEAEA] mb-6 tracking-tight">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto font-light leading-relaxed">
            Begin curating your sanctuary. Discover pieces that elevate your space.
          </p>
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-4 bg-[#141414] dark:bg-white text-white dark:text-[#111111] px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/5"
          >
            <span className="relative z-10">Explore Collections</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-[#C5A059] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-500 border border-[#C5A059]" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#141414] dark:text-[#EAEAEA] selection:bg-[#C5A059] selection:text-white transition-colors duration-300">
      <section className="pt-40 md:pt-48 pb-12 px-6 max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Inquiry</span>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter mb-4 text-[#141414] dark:text-white pb-6 border-b border-gray-200 dark:border-gray-800">
            Your Folio
          </h1>
        </motion.div>
      </section>

      <section className="px-6 pb-32 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* Cart Items */}
          <div className="flex-1">
            <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-12">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVars}
                    layout
                    className="group flex flex-col sm:flex-row gap-8 items-start sm:items-center py-6 border-b border-gray-200/60 dark:border-gray-800/60 transition-colors hover:border-[#C5A059]/30"
                  >
                    <div className="relative w-full sm:w-32 h-40 sm:h-32 bg-gray-100 dark:bg-[#111111] flex-shrink-0 overflow-hidden">
                      <Image
                        src={
                          item.image.startsWith("http") || item.image.startsWith("/") ? item.image : `/${item.image}`
                        }
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="text-lg font-serif tracking-tight text-[#141414] dark:text-[#EAEAEA]">
                            {item.name}
                          </h5>
                          <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">{item.category}</p>
                        </div>
                        <div className="text-lg font-serif text-[#141414] dark:text-[#EAEAEA]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-8">
                        <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-full p-1 bg-white dark:bg-[#111111]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#141414] hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-[#141414] hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 flex justify-between items-end border-t border-gray-200 dark:border-gray-800 pt-8"
            >
              <div>
                <span className="block text-[#C5A059] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                  Estimation
                </span>
                <span className="opacity-50 text-xs uppercase tracking-widest">Total Value</span>
              </div>
              <div className="text-right">
                <span className="block font-serif text-4xl md:text-5xl">${cartTotal.toFixed(2)}</span>
                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                  Shipping & taxes calculated prior to finalization.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-[460px] xl:w-[500px]"
          >
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 p-8 md:p-12 sticky top-32 shadow-2xl shadow-black/5 dark:shadow-none">
              <h3 className="font-serif text-3xl text-[#141414] dark:text-[#EAEAEA] mb-4">Finalize Request</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 font-light leading-relaxed">
                Provide your details to initiate the acquisition process. A dedicated concierge will contact you with a
                formal proposal.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative z-0">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative z-0">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative z-0">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                  >
                    Delivery Address
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="relative z-0">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="city"
                      className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                    >
                      City
                    </label>
                  </div>
                  <div className="relative z-0">
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      required
                      className="block py-3 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="zip"
                      className="absolute text-xs text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                    >
                      Postal Code
                    </label>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-widest font-bold">
                    No payment required at this step.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-4 bg-[#141414] dark:bg-white text-white dark:text-[#111111] w-full py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    <span className="relative z-10">{isSubmitting ? "Transmitting..." : "Submit Inquiry"}</span>
                    {!isSubmitting && (
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    )}
                    <div className="absolute inset-0 bg-[#C5A059] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-500 border border-[#C5A059] rounded-full" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
