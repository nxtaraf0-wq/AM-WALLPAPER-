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
        quality: state.quality
      }),
    }
  )
);
