export interface Wallpaper {
  id: string;
  title: string;
  animeName: string; // Subject / Universe / Collection name
  url: string;
  thumbnailUrl: string;
  category: string;
  resolution: string;
  tags: string[];
  views: number;
  likes: number;
  downloads: number;
  location?: string;
  photographer?: string;
}

export type Category = 
  | "All"
  | "Earth & Nature"
  | "Space & Galaxies"
  | "Oceans & Waterfalls"
  | "Mountains & Peaks"
  | "Wildlife & Tigers"
  | "Cities & Travel"
  | "Supercars & Speed"
  | "Aurora & Storms"
  | "Flowers & Sakura"
  | "AMOLED & Dark"
  | "Aesthetic & Lo-Fi"
  | "Anime & Manga"
  | "Jujutsu Kaisen"
  | "Demon Slayer"
  | "One Piece"
  | "Solo Leveling"
  | "Naruto"
  | "Dragon Ball"
  | "Attack on Titan"
  | "Bleach"
  | "Studio Ghibli"
  | "Cyberpunk"
  | "Fantasy Art"
  | string;
