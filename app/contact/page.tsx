"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Do you offer bespoke design services?",
    answer:
      "Yes, our atelier provides comprehensive bespoke services. From minor modifications to entirely original commissions, our master craftsmen work closely with you to realize your exact vision.",
  },
  {
    question: "What is your return philosophy?",
    answer:
      "We stand uncompromisingly behind our craftsmanship. Should a piece not perfectly align with your sanctuary, we accept returns within 30 days of delivery. Custom commissions are final sale.",
  },
  {
    question: "How do I care for the materials?",
    answer:
      "Each Lumina piece arrives with a detailed provenance and care dossier. Generally, we recommend avoiding direct, harsh sunlight and using only our recommended, natural wood and fabric elixirs.",
  },
  {
    question: "Can I request material samples?",
    answer:
      "Certainly. We offer a curated swatch box of our current textiles, leathers, and wood finishes to ensure perfect harmony with your existing interior architecture before you commit.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-serif text-2xl md:text-3xl text-[#141414] dark:text-[#EAEAEA] group-hover:text-[#C5A059] transition-colors duration-300">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="ml-6 flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const { addToast } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      addToast("Your inquiry has been received. Our concierge will contact you shortly.", "success");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#141414] dark:text-[#EAEAEA] selection:bg-[#C5A059] selection:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-40 md:pt-56 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-8 block">Concierge</span>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif leading-[0.9] tracking-tighter mb-8 text-[#141414] dark:text-white">
            Let&apos;s shape your <br />
            <span className="italic text-gray-400 dark:text-gray-500">sanctuary.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl">
            Whether inquiring about a bespoke commission, an existing order, or seeking design consultation, we are at
            your service.
          </p>
        </motion.div>
      </section>

      {/* Main Content Layout */}
      <section className="px-6 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Contact Details (Left side) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-16"
          >
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                Atelier Location
              </h3>
              <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-4">
                1245 Rue de l&apos;Artisan
                <br />
                Le Quartier, Paris
                <br />
                75003 France
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#C5A059] transition-colors border-b border-transparent hover:border-[#C5A059] pb-1"
              >
                View on Map <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                Direct Inquiry
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:concierge@lumina.design"
                  className="block font-serif text-2xl md:text-3xl hover:text-[#C5A059] transition-colors"
                >
                  concierge@lumina.design
                </a>
                <a
                  href="tel:+33140205050"
                  className="block font-serif text-2xl md:text-3xl hover:text-[#C5A059] transition-colors"
                >
                  +33 1 40 20 50 50
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                Visiting Hours
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-500 dark:text-gray-400 text-sm">
                <div>Monday - Friday</div>
                <div>10:00 AM - 7:00 PM</div>
                <div>Saturday</div>
                <div>By Appointment</div>
                <div>Sunday</div>
                <div>Closed</div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Right side) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-[#111111] p-8 md:p-16 border border-gray-200 dark:border-gray-800 shadow-2xl shadow-black/5 dark:shadow-none">
              <h2 className="font-serif text-4xl mb-12">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative z-0">
                    <input
                      type="text"
                      id="name"
                      required
                      className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative z-0">
                    <input
                      type="email"
                      id="email"
                      required
                      className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative z-0">
                  <input
                    type="text"
                    id="subject"
                    required
                    className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="subject"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                  >
                    Subject / Inquiry Type
                  </label>
                </div>

                <div className="relative z-0">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-700 appearance-none dark:text-white dark:focus:border-[#C5A059] focus:outline-none focus:ring-0 focus:border-[#141414] peer resize-none"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#141414] dark:peer-focus:text-[#C5A059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-widest"
                  >
                    Your Message
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-4 bg-[#141414] dark:bg-white text-white dark:text-[#111111] px-12 py-6 rounded-full text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:pointer-events-none w-full md:w-auto"
                  >
                    <span className="relative z-10">{isSubmitting ? "Transmitting..." : "Submit Inquiry"}</span>
                    {!isSubmitting && (
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    )}
                    <div className="absolute inset-0 bg-[#C5A059] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-500 border border-[#C5A059]" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-white dark:bg-[#111111] transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <span className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
              Knowledge Base
            </span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-800"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
