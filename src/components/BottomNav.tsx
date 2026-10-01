import React from "react";
import { Home, Compass, Heart, Settings, Info, Palette } from "lucide-react";
import { useAppStore } from "../store";
import { cn } from "../lib/utils";

export function BottomNav({ 
  onOpenSettings,
  onOpenAbout,
  onOpenThemesModal
}: { 
  onOpenSettings: () => void;
  onOpenAbout?: () => void;
  onOpenThemesModal?: () => void;
}) {
  const { activeCategory, setActiveCategory } = useAppStore();

  const navItems = [
    { icon: Home, label: "Home", category: "All" },
    { icon: Compass, label: "Discover", category: "Trending" },
    { icon: Heart, label: "Favorites", category: "Favorites" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10" />
      <div className="relative flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const isActive = activeCategory === item.category;
          return (
            <button
              key={item.label}
              onClick={() => setActiveCategory(item.category as any)}
              className="flex flex-col items-center gap-1"
            >
              <div className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300",
                isActive ? "bg-indigo-500/20 text-indigo-400" : "text-zinc-400"
              )}>
                <item.icon className={cn("h-5 w-5", isActive && "fill-indigo-500/20")} />
              </div>
            </button>
          );
        })}
        {onOpenThemesModal && (
          <button
            onClick={onOpenThemesModal}
            className="flex flex-col items-center gap-1"
            title="100 Themes Studio"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-amber-400 bg-amber-500/10 border border-amber-500/20 transition-all duration-300 active:scale-95">
              <Palette className="h-5 w-5" />
            </div>
          </button>
        )}
        {onOpenAbout && (
          <button
            onClick={onOpenAbout}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-zinc-400 transition-all duration-300 active:bg-white/5 hover:text-indigo-400">
              <Info className="h-5 w-5 text-indigo-400" />
            </div>
          </button>
        )}
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center gap-1"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-zinc-400 transition-all duration-300 active:bg-white/5">
            <Settings className="h-5 w-5" />
          </div>
        </button>
      </div>
    </div>
  );
}
