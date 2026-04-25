"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Send } from "lucide-react";

export default function ContactPage() {
  const { addToast } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      addToast("Your message has been sent. We will get back to you shortly.", "success");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center mb-16 border-b border-gray-200 dark:border-gray-800 pb-12">
        <h1 className="font-serif italic text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#EAEAEA] mb-4">Contact Us</h1>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Have a question about a product, order, or our design services? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] p-8 md:p-12 border border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 focus:border-[#141414] dark:focus:border-[#EAEAEA] focus:ring-0 outline-none bg-white dark:bg-[#111111] text-sm text-[#141414] dark:text-[#EAEAEA] transition-colors rounded-none"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 focus:border-[#141414] dark:focus:border-[#EAEAEA] focus:ring-0 outline-none bg-white dark:bg-[#111111] text-sm text-[#141414] dark:text-[#EAEAEA] transition-colors rounded-none"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 focus:border-[#141414] dark:focus:border-[#EAEAEA] focus:ring-0 outline-none bg-white dark:bg-[#111111] text-sm text-[#141414] dark:text-[#EAEAEA] transition-colors rounded-none"
              placeholder="How can we help?"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 focus:border-[#141414] dark:focus:border-[#EAEAEA] focus:ring-0 outline-none bg-white dark:bg-[#111111] text-sm text-[#141414] dark:text-[#EAEAEA] transition-colors rounded-none resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#141414] dark:bg-[#EAEAEA] hover:bg-black dark:hover:bg-white text-white dark:text-[#111111] py-4 text-[11px] uppercase tracking-[0.2em] font-bold shadow-lg transition-colors mt-8 rounded-none disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
