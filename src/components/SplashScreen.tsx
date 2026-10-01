import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../store";

export function SplashScreen() {
  const { isSplashVisible, setSplashVisible } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [setSplashVisible]);

  return (
    <AnimatePresence>
      {isSplashVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_40px_rgba(99,102,241,0.5)]">
              <span className="text-4xl font-black tracking-tighter text-white">AM</span>
              <motion.div 
                className="absolute inset-0 rounded-3xl border-2 border-white/20"
                animate={{ rotate: 180 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl sm:text-4xl font-black tracking-tight text-transparent"
            >
              AM WALLPAPER
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-2 text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-widest text-center px-4"
            >
              1,000,000+ Real 4K Wallpapers • সুন্দর পৃথিবীর সবকিছু নিয়ে
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-3 flex items-center gap-1.5 text-xs text-indigo-400 font-semibold"
            >
              <span>By ARAF STUDIO & ARAF GROUP OF INDUSTRIES</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
