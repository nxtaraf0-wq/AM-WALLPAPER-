import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Download, Share2, MapPin, Camera, Smartphone, Check } from "lucide-react";
import { useAppStore } from "../store";
import { cn } from "../lib/utils";

export function WallpaperModal() {
  const { selectedWallpaper, setSelectedWallpaper, favorites, toggleFavorite, incrementDownloads, addToast } = useAppStore();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!selectedWallpaper) return null;

  const isFavorite = favorites.includes(selectedWallpaper.id);

  const handleDownload = (quality: "4k" | "2k" | "original" = "original") => {
    // Increment download counter
    incrementDownloads(selectedWallpaper.id);
    addToast(`Starting ${quality.toUpperCase()} wallpaper download!`, "success");

    // Trigger download
    const link = document.createElement("a");
    link.href = selectedWallpaper.url;
    link.download = `${selectedWallpaper.title.replace(/\s+/g, '_')}_AM_Wallpaper.jpg`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(selectedWallpaper.url);
    setIsCopied(true);
    addToast("Wallpaper link copied to clipboard!", "info");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-2xl p-3 sm:p-6 md:p-8"
        onClick={() => setSelectedWallpaper(null)}
      >
        <button 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          onClick={() => setSelectedWallpaper(null)}
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl md:flex-row border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container with phone lock screen preview toggle */}
          <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[300px]">
            {isPreviewMode ? (
              <div className="relative h-[85%] aspect-[9/19] rounded-[40px] border-4 border-zinc-700 overflow-hidden shadow-2xl bg-black">
                <img
                  src={selectedWallpaper.url}
                  alt={selectedWallpaper.title}
                  className="h-full w-full object-cover"
                />
                {/* Simulated Phone Lock Screen UI */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex flex-col justify-between p-6 pointer-events-none text-white">
                  <div className="text-center pt-8">
                    <p className="text-xs uppercase tracking-widest text-zinc-300 font-medium">Sunday, October 12</p>
                    <h1 className="text-5xl font-light tracking-tight mt-1">09:41</h1>
                  </div>
                  <div className="flex justify-between items-center pb-4 text-xs text-zinc-400">
                    <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">🔦</div>
                    <span className="text-[10px] tracking-wider uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Swipe up to unlock</span>
                    <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">📷</div>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={selectedWallpaper.url}
                alt={selectedWallpaper.title}
                className="h-full w-full object-contain transition-transform duration-500 md:object-cover"
              />
            )}

            {/* Quick Preview Toggle Button */}
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-xl bg-black/60 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md border border-white/10 transition-colors hover:bg-black/80"
            >
              <Smartphone className="h-4 w-4 text-indigo-400" />
              {isPreviewMode ? "Full View" : "Phone Preview"}
            </button>
          </div>

          {/* Info Panel */}
          <div className="flex w-full flex-col bg-zinc-900/95 p-6 md:w-96 overflow-y-auto border-t md:border-t-0 md:border-l border-white/10 shrink-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30">
                {selectedWallpaper.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                {selectedWallpaper.resolution}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{selectedWallpaper.title}</h2>
            
            {selectedWallpaper.location ? (
              <p className="text-zinc-400 text-xs flex items-center gap-1.5 mb-4">
                <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                <span>{selectedWallpaper.location}</span>
              </p>
            ) : (
              <p className="text-indigo-400 font-medium text-xs mb-4">{selectedWallpaper.animeName}</p>
            )}

            <div className="space-y-3 flex-1 text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                <span className="text-zinc-400 text-xs">Total Downloads</span>
                <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                  <Download className="h-3.5 w-3.5" />
                  {(selectedWallpaper.downloads || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                <span className="text-zinc-400 text-xs">Total Views</span>
                <span className="text-white text-xs font-semibold">{(selectedWallpaper.views || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                <span className="text-zinc-400 text-xs">Favorites</span>
                <span className="text-pink-400 text-xs font-semibold flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
                  {(selectedWallpaper.likes || 0).toLocaleString()}
                </span>
              </div>
              
              {selectedWallpaper.photographer && (
                <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                  <span className="text-zinc-400 text-xs flex items-center gap-1">
                    <Camera className="h-3.5 w-3.5 text-zinc-400" />
                    Credit
                  </span>
                  <span className="text-zinc-300 text-xs truncate max-w-[180px]">
                    {selectedWallpaper.photographer}
                  </span>
                </div>
              )}

              <div className="pt-2">
                <span className="text-zinc-400 text-xs block mb-2 font-medium">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedWallpaper.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 text-[11px] font-medium border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-white/10">
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleFavorite(selectedWallpaper.id)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-colors border",
                    isFavorite 
                      ? "bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20" 
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                  {isFavorite ? "Favorited" : "Favorite"}
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-xs font-semibold bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                  title="Copy link"
                >
                  {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                </button>
              </div>

              <button 
                onClick={() => handleDownload("4k")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-95 group"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download 4K Ultra HD
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
