"use client";

import { useStore } from "@/lib/store";
import { X, CheckCircle, Info, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Toaster() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 md:px-0 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`pointer-events-auto flex items-center gap-4 px-6 py-4 shadow-xl text-xs font-medium border ${
              toast.type === "success"
                ? "bg-[#D97757] text-white border-transparent"
                : toast.type === "error"
                  ? "bg-red-600 text-white border-transparent"
                  : "bg-[#141414] dark:bg-[#1A1A1A] text-white border-transparent dark:border-gray-800"
            }`}
          >
            <div className="flex-shrink-0">
              {toast.type === "success" && <CheckCircle className="w-4 h-4" />}
              {toast.type === "error" && <AlertCircle className="w-4 h-4" />}
              {toast.type === "info" && <Info className="w-4 h-4" />}
            </div>

            <p className="flex-1">{toast.message}</p>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white focus:outline-none transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
