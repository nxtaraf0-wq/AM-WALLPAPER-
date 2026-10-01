import React from "react";
import { Home, Compass, Heart, Settings, Info, Cake, Palette, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { useAppStore } from "../store";

export function Sidebar({ 
  onOpenSettings,
  onOpenAbout,
  onOpenThemesModal,
  onOpenBannersModal,
  onOpenWishesModal
}: { 
  onOpenSettings: () => void;
  onOpenAbout?: () => void;
  onOpenThemesModal?: () => void;
  onOpenBannersModal?: () => void;
  onOpenWishesModal?: () => void;
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

      <nav className="mt-7 flex flex-col gap-1.5 flex-1">
        <div className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Menu
        </div>
        {navItems.map((item) => {
          const isActive = activeCategory === item.category;
          return (
            <button
              key={item.label}
              onClick={() => setActiveCategory(item.category as any)}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
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

        {/* Birthday Campaign Special Category */}
        <div className="mt-3 mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Cake className="h-3.5 w-3.5" />
          <span>LAMIM EDITZ Campaign</span>
        </div>

        {onOpenBannersModal && (
          <button
            onClick={onOpenBannersModal}
            className="group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-300"
          >
            <Sparkles className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:scale-110" />
            <span>100 UI Banners</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
              100
            </span>
          </button>
        )}

        {onOpenThemesModal && (
          <button
            onClick={onOpenThemesModal}
            className="group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all duration-300"
          >
            <Palette className="h-4 w-4 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
            <span>100 Themes Studio</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
              15 B'Day
            </span>
          </button>
        )}

        {onOpenWishesModal && (
          <button
            onClick={onOpenWishesModal}
            className="group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-rose-300 hover:bg-rose-500/10 transition-all duration-300"
          >
            <Cake className="h-4 w-4 text-rose-400 transition-transform duration-300 group-hover:scale-110" />
            <span>Send Birthday Wish</span>
          </button>
        )}

        {onOpenAbout && (
          <button
            onClick={onOpenAbout}
            className="group mt-2 flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            <Info className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 text-indigo-400" />
            <span>About ARAF</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Ecosystem
            </span>
          </button>
        )}
      </nav>

      {/* Birthday Campaign Card */}
      <div 
        onClick={onOpenBannersModal}
        className="my-3 p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-purple-950/30 to-zinc-900 border border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg"
      >
        <div className="flex items-center justify-between gap-2.5 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-black">
              🎂
            </div>
            <span className="text-xs font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
              LAMIM EDITZ B'Day
            </span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Oct 7
          </span>
        </div>
        <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
          100 UI Designs • 1-3 min auto rotation • 15 Special Birthday Themes active!
        </p>
      </div>

      <div className="pt-1">
        <button
          onClick={onOpenSettings}
          className="group flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
        >
          <Settings className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          Settings
        </button>
      </div>
    </aside>
  );
}

