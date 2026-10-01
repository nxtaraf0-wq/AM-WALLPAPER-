import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Sparkles, Palette, Cake, Flame, Crown, LayoutGrid, Search } from "lucide-react";
import { ALL_APP_THEMES, AppTheme } from "../lib/birthdayCampaignData";
import { useAppStore } from "../store";
import { playBirthdayCelebrationSound } from "../lib/celebrationAudio";
import { cn } from "../lib/utils";

interface ThemeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeStudioModal({ isOpen, onClose }: ThemeStudioModalProps) {
  const { activeThemeId, setActiveThemeId, addToast } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>("All (100)");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (!isOpen) return null;

  const categories = [
    { label: "All (100)", key: "All" },
    { label: "🎂 15 Birthday Themes", key: "Birthday Specials" },
    { label: "⛩️ 45 Anime Elements", key: "Anime Elements" },
    { label: "💎 25 Ultimate Luxury", key: "Ultimate Luxury" },
    { label: "🌐 15 Clean & Modern", key: "Clean & Modern" }
  ];

  const filteredThemes = ALL_APP_THEMES.filter((theme) => {
    if (activeCategory !== "All" && theme.category !== activeCategory) {
      return false;
    }
    if (searchTerm && !theme.name.toLowerCase().includes(searchTerm.toLowerCase()) && !theme.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleApplyTheme = (theme: AppTheme) => {
    setActiveThemeId(theme.id);
    if (theme.category === "Birthday Specials") {
      playBirthdayCelebrationSound();
    }
    addToast(`Applied theme: ${theme.name}!`, "success");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative flex flex-col h-[90vh] w-full max-w-5xl rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-6 bg-zinc-900/60 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-purple-400" />
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  100 Themes Studio • Birthday & Anime Elements
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Featuring 15 Birthday Celebration Themes, 45 Anime Element Themes, 25 Ultimate Luxury & 15 Clean Themes.
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search & Category Tabs */}
          <div className="p-4 border-b border-white/10 bg-zinc-900/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    "whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border",
                    activeCategory === cat.key
                      ? "bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-500/25"
                      : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search 100 themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Themes Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredThemes.map((theme) => {
              const isSelected = activeThemeId === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => handleApplyTheme(theme)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-2xl p-4 border transition-all duration-300 hover:scale-[1.02] bg-zinc-900/70",
                    isSelected
                      ? "border-purple-400 ring-2 ring-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                      : "border-white/10 hover:border-white/25 hover:bg-zinc-900"
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-5 w-5 rounded-full border border-white/20 shadow-sm shrink-0" 
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">
                        {theme.category}
                      </span>
                    </div>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500 text-white">
                        <Check className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-500 group-hover:text-purple-300 transition-colors">
                        Apply
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                    {theme.name}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {theme.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                    </div>
                    <span className="text-zinc-500 font-mono text-[10px]">{theme.id}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="border-t border-white/10 p-4 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400 shrink-0">
            <span>{filteredThemes.length} Themes available</span>
            <span>LAMIM EDITZ Celebration Theme Studio</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
