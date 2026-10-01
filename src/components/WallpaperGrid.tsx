import React, { useState, useEffect, useRef, useCallback } from "react";
import { Download, Sparkles, Globe, MapPin } from "lucide-react";
import { WallpaperCard } from "./WallpaperCard";
import { useAppStore } from "../store";

// Bengali common search dictionary to match English tags seamlessly
const BENGALI_SEARCH_SYNONYMS: Record<string, string> = {
  "বাঘ": "tiger",
  "পাহাড়": "mountain",
  "পর্বত": "mountain",
  "সমুদ্র": "ocean",
  "সাগর": "ocean",
  "মহাকাশ": "space",
  "গাড়ি": "car",
  "ফুল": "flower",
  "সূর্যাস্ত": "sunset",
  "শহর": "city",
  "জলপ্রপাত": "waterfall",
  "প্রকৃতি": "nature",
  "আকাশ": "sky",
  "বন": "forest",
  "জঙ্গল": "forest",
  "হিমালয়": "himalayas",
  "সুন্দরবন": "sundarbans",
  "নদী": "river"
};

export function WallpaperGrid() {
  const { wallpapers, loadMoreWallpapers, activeCategory, searchQuery, favorites } = useAppStore();
  const [displayedCount, setDisplayedCount] = useState(24);
  
  // Normalize search query with Bengali translation support
  const normalizedSearch = searchQuery.toLowerCase().trim();
  const translatedSearch = BENGALI_SEARCH_SYNONYMS[normalizedSearch] || normalizedSearch;

  const filteredWallpapers = wallpapers.filter((wp) => {
    // Filter by search
    if (normalizedSearch) {
      const matchTitle = wp.title.toLowerCase().includes(normalizedSearch) || wp.title.toLowerCase().includes(translatedSearch);
      const matchTags = wp.tags.some(t => t.toLowerCase().includes(normalizedSearch) || t.toLowerCase().includes(translatedSearch));
      const matchCategory = wp.category.toLowerCase().includes(normalizedSearch) || wp.category.toLowerCase().includes(translatedSearch);
      const matchLocation = wp.location ? (wp.location.toLowerCase().includes(normalizedSearch) || wp.location.toLowerCase().includes(translatedSearch)) : false;
      const matchSubject = wp.animeName.toLowerCase().includes(normalizedSearch) || wp.animeName.toLowerCase().includes(translatedSearch);

      if (!matchTitle && !matchTags && !matchCategory && !matchLocation && !matchSubject) {
        return false;
      }
    }
    
    // Filter by category
    if (activeCategory === "Favorites") {
      if (!favorites.includes(wp.id)) return false;
    } else if (activeCategory === "Trending") {
      // Show all sorted by views
      return true;
    } else if (activeCategory !== "All") {
      if (wp.category !== activeCategory) {
        // Also check if category matches tag
        if (!wp.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase())) {
          return false;
        }
      }
    }

    return true;
  });

  // If Trending, sort by views
  const sortedWallpapers = activeCategory === "Trending" 
    ? [...filteredWallpapers].sort((a, b) => b.views - a.views)
    : filteredWallpapers;

  const currentWallpapers = sortedWallpapers.slice(0, displayedCount);

  // Infinite scroll logic that also triggers loadMoreWallpapers when reaching the end
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (displayedCount < sortedWallpapers.length) {
          setDisplayedCount(prev => prev + 24);
        } else {
          // If we reached the end of the loaded set, generate next real world wallpapers from the 1M+ catalog!
          loadMoreWallpapers();
          setDisplayedCount(prev => prev + 24);
        }
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [displayedCount, sortedWallpapers.length, loadMoreWallpapers]);

  useEffect(() => {
    setDisplayedCount(24); // Reset on filter change
  }, [activeCategory, searchQuery]);

  if (sortedWallpapers.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center pt-20 pb-40">
        <div className="rounded-full bg-zinc-900 p-6 shadow-xl mb-4 border border-zinc-800">
          <Globe className="h-10 w-10 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No wallpapers found for &quot;{searchQuery}&quot;</h3>
        <p className="text-zinc-400 text-center max-w-sm text-sm">
          Try searching for real world wonders like &quot;Himalayas&quot;, &quot;Tiger&quot;, &quot;Ocean&quot;, &quot;Aurora&quot;, &quot;Ferrari&quot;, &quot;Maldives&quot;, or &quot;Gojo&quot;.
        </p>
      </div>
    );
  }

  const isHome = activeCategory === "All" && !searchQuery;
  const featuredWallpaper = isHome ? wallpapers[0] : null;

  return (
    <div className="pb-32 md:pb-12">
      {/* 1,000,000+ REAL WALLPAPERS WORLDWIDE BANNER on Home */}
      {isHome && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-zinc-900 border border-indigo-500/25 p-5 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xs shadow-lg shadow-indigo-500/30 shrink-0">
              1M+
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white tracking-wide">
                  ১,০০০,০০০+ ওয়ালপেপার (সুন্দর পৃথিবীর সবকিছু নিয়ে)
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  1,000,000+ Real 4K Wallpapers
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-0.5">
                Real 4K/8K photography & art • Himalayas, Deep Oceans, Bengal Tigers, Galaxies, Supercars, World Cities & Anime
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 font-semibold">
              1,000,000+ Available
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium hidden sm:inline-flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Infinite 4K Scroll
            </span>
          </div>
        </div>
      )}

      {/* Featured Masterpiece */}
      {isHome && featuredWallpaper && (
        <div 
          className="relative mb-8 h-[320px] md:h-[420px] w-full overflow-hidden rounded-3xl bg-zinc-900 cursor-pointer group shadow-2xl border border-white/10"
          onClick={() => useAppStore.getState().setSelectedWallpaper(featuredWallpaper)}
        >
          <img 
            src={featuredWallpaper.url} 
            alt="Featured" 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-block rounded-full bg-indigo-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md border border-indigo-500/40">
                1M+ Masterpiece
              </span>
              <span className="inline-block rounded-full bg-black/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md border border-white/10">
                8K Ultra HD
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                <Download className="h-3.5 w-3.5" />
                {(featuredWallpaper.downloads || 0).toLocaleString()} Downloads
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2 leading-tight drop-shadow-md">
              {featuredWallpaper.title}
            </h2>
            <p className="text-zinc-200 text-sm md:text-base flex items-center gap-2 drop-shadow">
              {featuredWallpaper.location ? (
                <>
                  <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>{featuredWallpaper.location}</span>
                </>
              ) : (
                <span>{featuredWallpaper.animeName}</span>
              )}
              <span>•</span>
              <span className="font-semibold text-indigo-300">{featuredWallpaper.category}</span>
            </p>
          </div>
        </div>
      )}

      {/* Responsive Wallpaper Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {currentWallpapers.map((wp, index) => (
          <WallpaperCard key={`${wp.id}-${index}`} wallpaper={wp} index={index % 12} />
        ))}
      </div>
      
      {/* Infinite Scroll Sensor */}
      <div ref={loadMoreRef} className="mt-12 flex flex-col items-center justify-center pb-8 gap-2">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500"></div>
        </div>
        <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">
          Loading 1,000,000+ Real 4K Wallpapers...
        </span>
      </div>
    </div>
  );
}
