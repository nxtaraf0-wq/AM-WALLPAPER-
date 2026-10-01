import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Sparkles, Filter, Cake } from "lucide-react";
import { BIRTHDAY_BANNER_DESIGNS, BirthdayBannerDesign } from "../lib/birthdayCampaignData";
import { useAppStore } from "../store";
import { cn } from "../lib/utils";

interface BirthdayBannersGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BirthdayBannersGalleryModal({ isOpen, onClose }: BirthdayBannersGalleryModalProps) {
  const { activeBannerIndex, setActiveBannerIndex, addToast } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = [
    "All",
    "Royal & Luxury",
    "Cyber & Neon",
    "Anime & Manga",
    "Party & Celebration",
    "Cosmic & Space",
    "Retro & Synth",
    "Nature & Elements"
  ];

  const filteredDesigns = selectedCategory === "All"
    ? BIRTHDAY_BANNER_DESIGNS
    : BIRTHDAY_BANNER_DESIGNS.filter((d) => d.category === selectedCategory);

  const handleSelectDesign = (index: number, design: BirthdayBannerDesign) => {
    setActiveBannerIndex(index);
    addToast(`Activated UI Design #${design.id}: ${design.name}!`, "success");
    onClose();
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
          className="relative flex flex-col h-[90vh] w-full max-w-6xl rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-6 bg-zinc-900/60 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <Cake className="h-5 w-5 text-amber-400" />
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  100 UI Banner Designs • HAPPY BIRTHDAY LAMIM EDITZ
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Explore all 100 artistic banner themes. Select any design to make it your active banner.
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Categories */}
          <div className="p-4 border-b border-white/10 bg-zinc-900/30 flex items-center gap-2 overflow-x-auto scrollbar-hide shrink-0">
            <Filter className="h-4 w-4 text-zinc-500 shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border",
                  selectedCategory === cat
                    ? "bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20"
                    : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat} {cat === "All" ? `(100)` : `(${BIRTHDAY_BANNER_DESIGNS.filter(d => d.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* 100 Banner Cards Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDesigns.map((design) => {
              const isActive = activeBannerIndex === design.id - 1;
              return (
                <div
                  key={design.id}
                  onClick={() => handleSelectDesign(design.id - 1, design)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl",
                    isActive 
                      ? "border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.25)]" 
                      : "border-white/10 hover:border-white/30"
                  )}
                >
                  {/* Design Background */}
                  <div className={cn("absolute inset-0 bg-gradient-to-r opacity-90", design.themeStyle.bgGradient)} />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

                  {/* Design Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-bold border", design.themeStyle.badgeBg)}>
                        #{design.id} • {design.category}
                      </span>
                      {isActive ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-black">
                          <Check className="h-3 w-3" /> Active Now
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-zinc-400 group-hover:text-white transition-colors">
                          Click to Apply
                        </span>
                      )}
                    </div>

                    <h3 className={cn("text-xl sm:text-2xl font-black tracking-tight", design.themeStyle.textColor)}>
                      {design.headline}
                    </h3>
                    
                    <p className="mt-1 text-xs text-zinc-300 font-medium line-clamp-1">
                      {design.subtitle}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10">
                      <span className="text-zinc-400 text-[11px]">Style: {design.name}</span>
                      <div className="flex items-center gap-1 text-base">
                        {design.decorations.map((d, i) => (
                          <span key={i}>{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="border-t border-white/10 p-4 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400 shrink-0">
            <span>Showing {filteredDesigns.length} of 100 UI Banner Designs</span>
            <span>Happy Birthday LAMIM EDITZ • Celebration Campaign</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
