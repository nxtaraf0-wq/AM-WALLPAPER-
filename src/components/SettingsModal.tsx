import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Moon, Sun, MonitorSmartphone, Languages, Trash2, Info } from "lucide-react";
import { useAppStore } from "../store";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAbout?: () => void;
}

export function SettingsModal({ isOpen, onClose, onOpenAbout }: SettingsModalProps) {
  const { theme, toggleTheme, quality, setQuality, language, setLanguage, clearCache } = useAppStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-xl p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <h2 className="text-xl font-bold text-white">Settings</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Theme */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Appearance</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-indigo-400" />}
                  <span className="text-white font-medium">Dark Mode</span>
                </div>
                <button
                  onClick={toggleTheme}
                  className="relative h-7 w-12 rounded-full bg-indigo-500 transition-colors"
                >
                  <motion.div
                    className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm"
                    animate={{ x: theme === 'dark' ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Quality */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Image Quality</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MonitorSmartphone className="h-5 w-5 text-indigo-400" />
                  <span className="text-white font-medium">Download Quality</span>
                </div>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as any)}
                  className="bg-zinc-800 text-white rounded-lg px-3 py-1.5 text-sm border border-zinc-700 outline-none focus:border-indigo-500"
                >
                  <option value="High">High (4K)</option>
                  <option value="Medium">Medium (1080p)</option>
                  <option value="Low">Low (720p)</option>
                </select>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Localization</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-indigo-400" />
                  <span className="text-white font-medium">Language</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-zinc-800 text-white rounded-lg px-3 py-1.5 text-sm border border-zinc-700 outline-none focus:border-indigo-500"
                >
                  <option value="English">English</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                  <option value="Japanese">日本語</option>
                  <option value="Spanish">Español</option>
                </select>
              </div>
            </div>

            {/* Data & About */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              {onOpenAbout && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAbout();
                  }}
                  className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 px-4 py-3 text-indigo-300 transition-all hover:bg-indigo-500/20 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                      ARAF
                    </div>
                    <span className="font-semibold text-sm">About ARAF Studio & Industries</span>
                  </div>
                  <Info className="h-4 w-4 text-indigo-400" />
                </button>
              )}

              <button
                onClick={() => {
                  clearCache();
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-xl bg-red-500/10 px-4 py-3 text-red-500 transition-colors hover:bg-red-500/20"
              >
                <span className="font-medium">Clear Cache & Data</span>
                <Trash2 className="h-5 w-5" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs mt-4">
                <Info className="h-4 w-4" />
                <span>AM WALLPAPER v1.0.0 • Developed by ARAF STUDIO</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
