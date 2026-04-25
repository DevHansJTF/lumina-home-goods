"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

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

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-[#141414] dark:text-[#EAEAEA] mb-6">
          Your Selection is Empty
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Looks like you haven&apos;t added any items to your inquiry yet.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-10 py-4 bg-[#141414] dark:bg-[#EAEAEA] text-white dark:text-[#111111] text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black dark:hover:bg-white transition-colors"
        >
          Explore Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-[#141414] dark:text-[#EAEAEA] mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
        Your Selection
      </h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Cart Review */}
        <div className="flex-1">
          <div className="space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 items-start border-b border-gray-100 dark:border-gray-800 pb-8">
                <div className="relative w-24 h-24 bg-[#F5F5F5] dark:bg-[#1A1A1A] flex-shrink-0">
                  <Image
                    src={item.image.startsWith("http") || item.image.startsWith("/") ? item.image : `/${item.image}`}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h5 className="text-xs font-semibold uppercase tracking-tighter text-[#141414] dark:text-[#EAEAEA]">
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-gray-400 mt-1 italic">{item.category}</p>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] font-medium w-4 text-center dark:text-[#EAEAEA]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#141414] dark:hover:text-[#EAEAEA]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-xs font-medium text-[#141414] dark:text-[#EAEAEA]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center text-sm md:text-base font-medium text-[#141414] dark:text-[#EAEAEA]">
            <span className="opacity-50 text-xs uppercase tracking-widest">Est. Inquiry Value</span>
            <span className="font-sans text-2xl">${cartTotal.toFixed(2)}</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 text-right italic">
            Shipping and taxes calculated after inquiry review.
          </p>
        </div>

        {/* Inquiry Form */}
        <div className="w-full lg:w-[420px]">
          <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 p-8 md:p-10 sticky top-28">
            <h3 className="font-serif text-xl text-[#141414] dark:text-[#EAEAEA] mb-3">Request a Quote</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Submit your details. Our design team will review your selection and follow up with a finalized quote and
              shipping estimate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#141414] focus:ring-0 outline-none bg-white text-sm text-[#141414] transition-colors rounded-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#141414] focus:ring-0 outline-none bg-white text-sm text-[#141414] transition-colors rounded-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-[10px] uppercase tracking-widest text-gray-500">
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#141414] focus:ring-0 outline-none bg-white text-sm text-[#141414] transition-colors rounded-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <label htmlFor="city" className="text-[10px] uppercase tracking-widest text-gray-500">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 focus:border-[#141414] dark:focus:border-[#EAEAEA] focus:ring-0 outline-none bg-white dark:bg-[#111111] text-sm text-[#141414] dark:text-[#EAEAEA] transition-colors rounded-none"
                  />
                </div>
                <div className="space-y-2 w-1/3">
                  <label htmlFor="zip" className="text-[10px] uppercase tracking-widest text-gray-500">
                    ZIP
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 focus:border-[#141414] dark:focus:border-[#EAEAEA] focus:ring-0 outline-none bg-white dark:bg-[#111111] text-sm text-[#141414] dark:text-[#EAEAEA] transition-colors rounded-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#141414] dark:bg-[#EAEAEA] hover:bg-black dark:hover:bg-white text-white dark:text-[#111111] py-4 text-[11px] uppercase tracking-[0.2em] font-bold shadow-lg transition-colors mt-8 rounded-none disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Order Inquiry"}
              </button>

              <p className="text-[10px] text-center text-gray-400 mt-6 italic">No payment required at this step.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
