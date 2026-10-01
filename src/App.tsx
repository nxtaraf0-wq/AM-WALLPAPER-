import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { WallpaperGrid } from './components/WallpaperGrid';
import { WallpaperModal } from './components/WallpaperModal';
import { SettingsModal } from './components/SettingsModal';
import { AboutModal } from './components/AboutModal';
import { SplashScreen } from './components/SplashScreen';
import { ToastProvider } from './components/ToastProvider';
import { useAppStore } from './store';
import { cn } from './lib/utils';
import { Category } from './types';

export default function App() {
  const { theme, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useAppStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle scroll for "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories: (Category | "All" | "Trending" | "Favorites")[] = [
    "All", "Trending", "Favorites", 
    "Earth & Nature", "Mountains & Peaks", "Oceans & Waterfalls", "Space & Galaxies",
    "Wildlife & Tigers", "Cities & Travel", "Supercars & Speed", "Aurora & Storms",
    "Flowers & Sakura", "AMOLED & Dark", "Aesthetic & Lo-Fi", "Anime & Manga",
    "Jujutsu Kaisen", "One Piece", "Demon Slayer", "Solo Leveling", "Naruto",
    "Dragon Ball", "Attack on Titan", "Studio Ghibli", "Cyberpunk", "Fantasy Art"
  ];

  const quickSearchTags = [
    { label: "🏔️ Himalayas", query: "Himalayas" },
    { label: "🐯 Bengal Tiger", query: "Tiger" },
    { label: "🌌 Milky Way", query: "Milky Way" },
    { label: "🌊 Maldives", query: "Maldives" },
    { label: "⚡ Aurora Borealis", query: "Aurora" },
    { label: "🏎️ Hypercars", query: "Bugatti" },
    { label: "🏙️ Tokyo Night", query: "Tokyo" },
    { label: "🌸 Sakura Kyoto", query: "Sakura" },
    { label: "🌊 Niagara Falls", query: "Niagara" },
    { label: "⛩️ Gojo Satoru", query: "Gojo" }
  ];

  return (
    <div className={cn("min-h-screen bg-zinc-950 text-zinc-50 flex font-sans selection:bg-indigo-500/30", theme === "light" && "light-theme-not-implemented-yet")}>
      <SplashScreen />
      
      <Sidebar 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onOpenAbout={() => setIsAboutOpen(true)}
      />
      
      <main className="flex-1 relative flex flex-col h-screen overflow-hidden">
        {/* Header / Search Area */}
        <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 p-4 md:p-6 shrink-0">
          <div className="mx-auto max-w-7xl flex flex-col gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 transition-colors group-focus-within:text-indigo-400" />
                <input
                  type="text"
                  placeholder="Search 1,000,000+ real wallpapers (Himalayas, Bengal Tiger, Milky Way, Maldives, Dubai, Ferrari, Anime...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:bg-zinc-900 focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 text-xs rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Quick About ARAF button in header for all devices */}
              <button
                onClick={() => setIsAboutOpen(true)}
                className="h-12 px-3.5 flex items-center gap-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition-all text-xs font-semibold shrink-0"
                title="About ARAF Studio & Group of Industries"
              >
                <div className="h-6 w-6 rounded-lg bg-indigo-500/30 flex items-center justify-center font-bold text-[10px] text-white">
                  AR
                </div>
                <span className="hidden sm:inline">About ARAF</span>
              </button>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={cn("md:hidden h-12 w-12 flex items-center justify-center rounded-2xl border transition-colors shrink-0", showFilters ? "bg-indigo-500 border-indigo-500 text-white" : "bg-zinc-900/50 border-white/10 text-zinc-400")}
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Trending / Topic Search Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide text-xs">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                Trending:
              </span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag.query}
                  onClick={() => {
                    setSearchQuery(tag.query);
                    setActiveCategory("All");
                  }}
                  className={cn(
                    "whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 border",
                    searchQuery.toLowerCase().includes(tag.query.toLowerCase())
                      ? "bg-indigo-500/30 text-indigo-300 border-indigo-500/40"
                      : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Category Pills (Desktop always, Mobile toggleable) */}
            <div className={cn("md:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide", showFilters ? "flex" : "hidden")}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    activeCategory === cat
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6" id="scroll-container">
          <div className="mx-auto max-w-7xl h-full">
            <WallpaperGrid />
          </div>
        </div>
      </main>

      <BottomNav 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onOpenAbout={() => setIsAboutOpen(true)}
      />
      
      <WallpaperModal />
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onOpenAbout={() => setIsAboutOpen(true)}
      />
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
      <ToastProvider />

      {/* Floating Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-transform hover:bg-indigo-600 hover:scale-110 active:scale-95"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
