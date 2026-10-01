import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Info, XCircle } from "lucide-react";
import { useAppStore } from "../store";
import { cn } from "../lib/utils";

export function ToastProvider() {
  const { toasts, removeToast } = useAppStore();

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 md:bottom-8 md:right-8 md:left-auto md:translate-x-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => removeToast(toast.id)}
            className="flex min-w-[280px] cursor-pointer items-center gap-3 rounded-2xl bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-xl border border-white/10"
          >
            {toast.type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
            {toast.type === "info" && <Info className="h-5 w-5 text-indigo-500" />}
            {toast.type === "error" && <XCircle className="h-5 w-5 text-red-500" />}
            <span className="text-sm font-medium text-white">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
