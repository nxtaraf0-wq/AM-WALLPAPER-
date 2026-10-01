import React from "react";
import { Home, Compass, Heart, Settings, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { useAppStore } from "../store";

export function Sidebar({ 
  onOpenSettings,
  onOpenAbout
}: { 
  onOpenSettings: () => void;
  onOpenAbout?: () => void;
}) {
  const { activeCategory, setActiveCategory } = useAppStore();

  const navItems = [
    { icon: Home, label: "Home", category: "All" },
    { icon: Compass, label: "Discover", category: "Trending" },
    { icon: Heart, label: "Favorites", category: "Favorites" },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl md:flex shrink-0">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-white tracking-tighter text-sm">AM</span>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white block leading-tight">AM WALLPAPER</span>
            <span className="text-[10px] font-semibold text-indigo-400 tracking-wider uppercase">by ARAF STUDIO</span>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-2 flex-1">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Menu
        </div>
        {navItems.map((item) => {
          const isActive = activeCategory === item.category;
          return (
            <button
              key={item.label}
              onClick={() => setActiveCategory(item.category as any)}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400 font-semibold"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", isActive && "text-indigo-400")} />
              {item.label}
            </button>
          );
        })}

        {onOpenAbout && (
          <button
            onClick={onOpenAbout}
            className="group mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            <Info className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 text-indigo-400" />
            <span>About ARAF</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Ecosystem
            </span>
          </button>
        )}
      </nav>

      {/* ARAF Brand Card */}
      <div 
        onClick={onOpenAbout}
        className="my-4 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-zinc-900 border border-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between gap-2.5 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-black">
              1M+
            </div>
            <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
              1M+ Real Library
            </span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Real 4K
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
          ১,০০০,০০০+ ওয়ালপেপার • Real Earth, Wildlife, Oceans, Galaxies, Supercars & Anime by ARAF STUDIO.
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={onOpenSettings}
          className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
        >
          <Settings className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          Settings
        </button>
      </div>
    </aside>
  );
}
