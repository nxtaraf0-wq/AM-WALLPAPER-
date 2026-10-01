import React, { useState } from "react";
import { Heart, Download } from "lucide-react";
import { motion } from "motion/react";
import { Wallpaper } from "../types";
import { useAppStore } from "../store";
import { cn } from "../lib/utils";

export const WallpaperCard: React.FC<{ wallpaper: Wallpaper; index: number }> = ({ wallpaper, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { favorites, toggleFavorite, setSelectedWallpaper } = useAppStore();
  const isFavorite = favorites.includes(wallpaper.id);

  const formatDownloads = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-zinc-900 aspect-[9/16]"
      onClick={() => setSelectedWallpaper(wallpaper)}
    >
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-800" />
      )}
      
      <img
        src={wallpaper.thumbnailUrl}
        alt={wallpaper.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-700 group-hover:scale-110",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Top badges: Permanent Download Counter Badge */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md border border-white/10 text-white transition-opacity">
        <Download className="h-3 w-3 text-indigo-400" />
        <span className="text-[11px] font-semibold tracking-tight">
          {formatDownloads(wallpaper.downloads || 0)}
        </span>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Actions */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(wallpaper.id);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 transition-transform hover:scale-110 active:scale-95"
        >
          <Heart className={cn("h-4 w-4 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-white")} />
        </button>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
        <h3 className="text-sm font-bold text-white line-clamp-1">{wallpaper.title}</h3>
        <div className="mt-1 flex items-center justify-between text-xs text-zinc-300">
          <span className="line-clamp-1 text-[11px] text-zinc-300">
            {wallpaper.location || wallpaper.animeName}
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px] shrink-0">
            <Download className="h-3 w-3" />
            {(wallpaper.downloads || 0).toLocaleString()}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          <span className="rounded-md bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
            {wallpaper.resolution}
          </span>
          <span className="rounded-md bg-indigo-500/80 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md">
            {wallpaper.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
