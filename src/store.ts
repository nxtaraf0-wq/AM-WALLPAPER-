import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, Wallpaper } from "./types";
import { wallpapersData, generateMoreWallpapers } from "./data";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface AppState {
  theme: "dark" | "light";
  toggleTheme: () => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  activeCategory: Category | "All" | "Trending" | "Favorites";
  setActiveCategory: (category: Category | "All" | "Trending" | "Favorites") => void;
  
  favorites: string[]; // array of wallpaper IDs
  toggleFavorite: (id: string) => void;
  
  wallpapers: Wallpaper[];
  loadMoreWallpapers: () => void;
  
  selectedWallpaper: Wallpaper | null;
  setSelectedWallpaper: (wp: Wallpaper | null) => void;

  incrementDownloads: (id: string) => void;

  isSplashVisible: boolean;
  setSplashVisible: (visible: boolean) => void;
  
  language: string;
  setLanguage: (lang: string) => void;
  
  quality: "High" | "Medium" | "Low";
  setQuality: (quality: "High" | "Medium" | "Low") => void;

  clearCache: () => void;

  // Birthday Campaign & 100-Theme System
  activeThemeId: string;
  setActiveThemeId: (id: string) => void;
  activeBannerIndex: number;
  setActiveBannerIndex: (index: number) => void;
  bannerIntervalSeconds: number; // 60, 120, 180 seconds
  setBannerIntervalSeconds: (seconds: number) => void;
  isConfettiActive: boolean;
  toggleConfetti: () => void;
  isBannerAutoPlay: boolean;
  toggleBannerAutoPlay: () => void;
  birthdayWishes: { id: string; name: string; message: string; date: string }[];
  addBirthdayWish: (name: string, message: string) => void;

  toasts: Toast[];
  addToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
      
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      activeCategory: "All",
      setActiveCategory: (category) => set({ activeCategory: category }),
      
      favorites: [],
      toggleFavorite: (id) => set((state) => {
        const isFav = state.favorites.includes(id);
        const newFavorites = isFav 
          ? state.favorites.filter(favId => favId !== id)
          : [...state.favorites, id];
        
        // Add a toast notification when toggling
        const toastId = Math.random().toString(36).substring(2, 9);
        setTimeout(() => {
          set((s) => ({ toasts: s.toasts.filter(t => t.id !== toastId) }));
        }, 3000);

        return {
          favorites: newFavorites,
          toasts: [...state.toasts, {
            id: toastId,
            message: isFav ? "Removed from favorites" : "Added to favorites",
            type: isFav ? "info" : "success"
          }]
        };
      }),
      
      wallpapers: wallpapersData,
      loadMoreWallpapers: () => set((state) => {
        const nextBatch = generateMoreWallpapers(state.wallpapers.length + 1, 24);
        return {
          wallpapers: [...state.wallpapers, ...nextBatch]
        };
      }),
      
      selectedWallpaper: null,
      setSelectedWallpaper: (wp) => set({ selectedWallpaper: wp }),
      
      incrementDownloads: (id) => set((state) => {
        const updatedWallpapers = state.wallpapers.map((wp) =>
          wp.id === id ? { ...wp, downloads: wp.downloads + 1 } : wp
        );
        const updatedSelected =
          state.selectedWallpaper && state.selectedWallpaper.id === id
            ? { ...state.selectedWallpaper, downloads: state.selectedWallpaper.downloads + 1 }
            : state.selectedWallpaper;

        return {
          wallpapers: updatedWallpapers,
          selectedWallpaper: updatedSelected,
        };
      }),

      isSplashVisible: true,
      setSplashVisible: (visible) => set({ isSplashVisible: visible }),
      
      language: "English",
      setLanguage: (lang) => set({ language: lang }),
      
      quality: "High",
      setQuality: (q) => set({ quality: q }),

      clearCache: () => set((state) => {
        const toastId = Math.random().toString(36).substring(2, 9);
        setTimeout(() => {
          set((s) => ({ toasts: s.toasts.filter(t => t.id !== toastId) }));
        }, 3000);
        return { 
          favorites: [], 
          searchQuery: "", 
          activeCategory: "All",
          toasts: [...state.toasts, { id: toastId, message: "Cache & Data cleared", type: "success" }]
        };
      }),

      // Birthday Campaign & 100 Themes Implementation
      activeThemeId: "bday-royal-gold",
      setActiveThemeId: (id) => set({ activeThemeId: id }),

      activeBannerIndex: 0,
      setActiveBannerIndex: (index) => set({ activeBannerIndex: (index + 100) % 100 }),

      bannerIntervalSeconds: 60, // 1 minute default, switchable to 120s (2 min) or 180s (3 min)
      setBannerIntervalSeconds: (seconds) => set({ bannerIntervalSeconds: seconds }),

      isConfettiActive: true,
      toggleConfetti: () => set((s) => ({ isConfettiActive: !s.isConfettiActive })),

      isBannerAutoPlay: true,
      toggleBannerAutoPlay: () => set((s) => ({ isBannerAutoPlay: !s.isBannerAutoPlay })),

      birthdayWishes: [
        { id: "w-1", name: "ARAF STUDIO Team", message: "Happy Birthday Lamim Editz! Keep creating legendary masterpieces!", date: "Oct 7" },
        { id: "w-2", name: "AM Wallpaper Community", message: "Wishing you infinite success, health, and joy! 🎂🎉", date: "Oct 7" },
        { id: "w-3", name: "Anime & VFX Fans", message: "To the greatest editor and creator, Happy Birthday! 👑✨", date: "Oct 7" }
      ],
      addBirthdayWish: (name, message) => set((s) => {
        const newWish = {
          id: `wish-${Date.now()}`,
          name: name.trim() || "Anonymous Fan",
          message: message.trim(),
          date: "Oct 7"
        };
        const toastId = Math.random().toString(36).substring(2, 9);
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter(t => t.id !== toastId) }));
        }, 3000);
        return {
          birthdayWishes: [newWish, ...s.birthdayWishes],
          toasts: [...s.toasts, { id: toastId, message: "Birthday Wish posted for LAMIM EDITZ! 🎂", type: "success" }]
        };
      }),

      toasts: [],
      addToast: (message, type = "info") => set((state) => {
        const id = Math.random().toString(36).substring(2, 9);
        setTimeout(() => {
          set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) }));
        }, 3000);
        return { toasts: [...state.toasts, { id, message, type }] };
      }),
      removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
    }),
    {
      name: "anime-wallpaper-storage",
      partialize: (state) => ({ 
        theme: state.theme, 
        favorites: state.favorites,
        language: state.language,
        quality: state.quality,
        activeThemeId: state.activeThemeId,
        activeBannerIndex: state.activeBannerIndex,
        bannerIntervalSeconds: state.bannerIntervalSeconds,
        birthdayWishes: state.birthdayWishes
      }),
    }
  )
);
