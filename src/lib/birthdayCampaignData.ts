export interface BirthdayBannerDesign {
  id: number;
  name: string;
  category: "Cyber & Neon" | "Royal & Luxury" | "Anime & Manga" | "Cosmic & Space" | "Party & Celebration" | "Aesthetic & Art" | "Retro & Synth" | "Nature & Elements";
  headline: string;
  subtitle: string;
  themeStyle: {
    bgGradient: string;
    borderGlow: string;
    textColor: string;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    particleIcon: string;
    cardStyle: string;
  };
  decorations: string[];
}

export interface AppTheme {
  id: string;
  name: string;
  category: "Birthday Specials" | "Anime Elements" | "Ultimate Luxury" | "Clean & Modern";
  primaryColor: string; // e.g. '#6366f1'
  accentColor: string;  // e.g. '#a855f7'
  bgGradient: string;
  cardBg: string;
  borderColor: string;
  textColor: string;
  previewColor: string;
  description: string;
  sparkle?: boolean;
}

// 100 Distinct UI Designs for "HAPPY BIRTHDAY LAMIM EDITZ"
export const BIRTHDAY_BANNER_DESIGNS: BirthdayBannerDesign[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  
  // Categorize across 8 artistic genres
  if (id <= 15) {
    // 1-15: Royal & Luxury Golden Jubilee
    const luxuryVariants = [
      { name: "Royal Gold Sovereign", bg: "from-amber-950 via-yellow-950/80 to-zinc-950", border: "border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.25)]", text: "text-amber-300", accent: "text-yellow-400", badge: "bg-amber-500/20 text-amber-300 border-amber-500/40", icon: "👑" },
      { name: "Imperial Diamond Crest", bg: "from-blue-950 via-indigo-950 to-zinc-950", border: "border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.25)]", text: "text-cyan-200", accent: "text-white", badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40", icon: "💎" },
      { name: "Velvet Noir Elegance", bg: "from-purple-950 via-zinc-950 to-black", border: "border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.25)]", text: "text-purple-200", accent: "text-fuchsia-400", badge: "bg-purple-500/20 text-purple-300 border-purple-500/40", icon: "⚜️" },
      { name: "Crown Jewels Jubilee", bg: "from-rose-950 via-amber-950 to-zinc-950", border: "border-rose-400/40 shadow-[0_0_30px_rgba(251,113,133,0.25)]", text: "text-rose-200", accent: "text-amber-300", badge: "bg-rose-500/20 text-rose-300 border-rose-500/40", icon: "🏆" },
      { name: "Platinum Prestige", bg: "from-slate-900 via-zinc-900 to-black", border: "border-slate-300/40 shadow-[0_0_30px_rgba(203,213,225,0.2)]", text: "text-slate-100", accent: "text-white", badge: "bg-white/10 text-white border-white/20", icon: "⭐" }
    ];
    const v = luxuryVariants[(id - 1) % luxuryVariants.length];
    return {
      id,
      name: `${v.name} #${id}`,
      category: "Royal & Luxury",
      headline: "HAPPY BIRTHDAY LAMIM EDITZ",
      subtitle: `Honoring the Visionary Creator • Grand Luxury Edition #${id} • Live Celebration Campaign`,
      themeStyle: {
        bgGradient: v.bg,
        borderGlow: v.border,
        textColor: v.text,
        accentColor: v.accent,
        badgeBg: v.badge,
        badgeText: "Royal Edition",
        particleIcon: v.icon,
        cardStyle: "bg-gradient-to-r"
      },
      decorations: ["👑", "✨", "🥂", "💎"]
    };
  } else if (id <= 30) {
    // 16-30: Cyber & Neon 2077
    const cyberVariants = [
      { name: "Cyberpunk 2077 Night City", bg: "from-yellow-950/60 via-cyan-950/60 to-black", border: "border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.35)]", text: "text-cyan-300", accent: "text-yellow-400", badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50", icon: "⚡" },
      { name: "Neon Glitch Matrix", bg: "from-emerald-950 via-zinc-950 to-black", border: "border-emerald-400/50 shadow-[0_0_35px_rgba(52,211,153,0.3)]", text: "text-emerald-300", accent: "text-green-400", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50", icon: "🟩" },
      { name: "Synthwave Sunset Laser", bg: "from-pink-950 via-purple-950 to-indigo-950", border: "border-pink-500/50 shadow-[0_0_35px_rgba(236,72,153,0.35)]", text: "text-pink-300", accent: "text-yellow-300", badge: "bg-pink-500/20 text-pink-300 border-pink-500/50", icon: "🌆" },
      { name: "Holographic Overdrive", bg: "from-indigo-950 via-purple-950 to-black", border: "border-violet-400/50 shadow-[0_0_35px_rgba(139,92,246,0.35)]", text: "text-violet-200", accent: "text-cyan-300", badge: "bg-violet-500/20 text-violet-300 border-violet-500/50", icon: "🔮" }
    ];
    const v = cyberVariants[(id - 16) % cyberVariants.length];
    return {
      id,
      name: `${v.name} #${id}`,
      category: "Cyber & Neon",
      headline: "HAPPY BIRTHDAY LAMIM EDITZ",
      subtitle: `Leveling Up the Matrix • Cyber Overdrive Edition #${id} • High-Voltage Birthday`,
      themeStyle: {
        bgGradient: v.bg,
        borderGlow: v.border,
        textColor: v.text,
        accentColor: v.accent,
        badgeBg: v.badge,
        badgeText: "Cyber Neon",
        particleIcon: v.icon,
        cardStyle: "bg-gradient-to-r"
      },
      decorations: ["⚡", "🤖", "💾", "🛸"]
    };
  } else if (id <= 45) {
    // 31-45: Anime & Manga Realm
    const animeVariants = [
      { name: "Jujutsu Satoru Domain", bg: "from-blue-950 via-slate-950 to-black", border: "border-blue-400/50 shadow-[0_0_30px_rgba(96,165,250,0.35)]", text: "text-sky-300", accent: "text-blue-400", badge: "bg-blue-500/20 text-blue-300 border-blue-500/50", icon: "🤞" },
      { name: "Super Saiyan Ultra Instinct", bg: "from-amber-950 via-orange-950 to-black", border: "border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.35)]", text: "text-amber-300", accent: "text-orange-400", badge: "bg-amber-500/20 text-amber-300 border-amber-500/50", icon: "🔥" },
      { name: "Sun God Nika Gear 5", bg: "from-yellow-950 via-purple-950 to-black", border: "border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.35)]", text: "text-yellow-200", accent: "text-purple-300", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50", icon: "☀️" },
      { name: "Shadow Monarch Jinwoo Arise", bg: "from-purple-950 via-indigo-950 to-black", border: "border-indigo-400/50 shadow-[0_0_30px_rgba(129,140,248,0.35)]", text: "text-indigo-200", accent: "text-violet-400", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/50", icon: "🗡️" },
      { name: "Demon Slayer Hinokami Flame", bg: "from-red-950 via-rose-950 to-black", border: "border-red-400/50 shadow-[0_0_30px_rgba(248,113,113,0.35)]", text: "text-red-200", accent: "text-rose-400", badge: "bg-red-500/20 text-red-300 border-red-500/50", icon: "⚔️" }
    ];
    const v = animeVariants[(id - 31) % animeVariants.length];
    return {
      id,
      name: `${v.name} #${id}`,
      category: "Anime & Manga",
      headline: "HAPPY BIRTHDAY LAMIM EDITZ",
      subtitle: `The Ultimate Anime Mastermind Birthday • Power Level 9000+ • Edition #${id}`,
      themeStyle: {
        bgGradient: v.bg,
        borderGlow: v.border,
        textColor: v.text,
        accentColor: v.accent,
        badgeBg: v.badge,
        badgeText: "Anime Master",
        particleIcon: v.icon,
        cardStyle: "bg-gradient-to-r"
      },
      decorations: ["⛩️", "🔥", "⚡", "🌸"]
    };
  } else if (id <= 60) {
    // 46-60: Party & Carnival Fiesta
    const partyVariants = [
      { name: "Confetti Carnival Blast", bg: "from-fuchsia-950 via-pink-950 to-indigo-950", border: "border-pink-400/50 shadow-[0_0_35px_rgba(244,114,182,0.35)]", text: "text-pink-200", accent: "text-amber-300", badge: "bg-pink-500/25 text-pink-300 border-pink-400/50", icon: "🎉" },
      { name: "Birthday Cake & Candles", bg: "from-rose-950 via-purple-950 to-zinc-950", border: "border-amber-400/50 shadow-[0_0_35px_rgba(251,191,36,0.35)]", text: "text-amber-200", accent: "text-rose-300", badge: "bg-amber-500/20 text-amber-300 border-amber-500/40", icon: "🎂" },
      { name: "Balloons & Fireworks Gala", bg: "from-purple-950 via-rose-950 to-blue-950", border: "border-fuchsia-400/50 shadow-[0_0_35px_rgba(217,70,239,0.35)]", text: "text-fuchsia-200", accent: "text-yellow-300", badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/50", icon: "🎈" },
      { name: "Sweet Pastel Celebration", bg: "from-violet-950 via-pink-950 to-teal-950", border: "border-teal-400/50 shadow-[0_0_35px_rgba(45,212,191,0.35)]", text: "text-teal-200", accent: "text-pink-300", badge: "bg-teal-500/20 text-teal-300 border-teal-400/50", icon: "🥳" }
    ];
    const v = partyVariants[(id - 46) % partyVariants.length];
    return {
      id,
      name: `${v.name} #${id}`,
      category: "Party & Celebration",
      headline: "HAPPY BIRTHDAY LAMIM EDITZ",
      subtitle: `Wishing You Endless Joy, Magic & Legendary Edits • Party Edition #${id}`,
      themeStyle: {
        bgGradient: v.bg,
        borderGlow: v.border,
        textColor: v.text,
        accentColor: v.accent,
        badgeBg: v.badge,
        badgeText: "Grand Fiesta",
        particleIcon: v.icon,
        cardStyle: "bg-gradient-to-r"
      },
      decorations: ["🎂", "🎉", "🎈", "✨"]
    };
  } else if (id <= 75) {
    // 61-75: Cosmic, Space & Galaxies
    const cosmicVariants = [
      { name: "James Webb Nebula Starlight", bg: "from-indigo-950 via-slate-950 to-black", border: "border-indigo-400/50 shadow-[0_0_35px_rgba(129,140,248,0.35)]", text: "text-indigo-200", accent: "text-cyan-300", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-400/50", icon: "🌌" },
      { name: "Aurora Borealis Polar Sky", bg: "from-emerald-950 via-teal-950 to-black", border: "border-emerald-400/50 shadow-[0_0_35px_rgba(52,211,153,0.35)]", text: "text-emerald-200", accent: "text-teal-300", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50", icon: "✨" },
      { name: "Milky Way Cosmic Dust", bg: "from-purple-950 via-blue-950 to-black", border: "border-sky-400/50 shadow-[0_0_35px_rgba(56,189,248,0.35)]", text: "text-sky-200", accent: "text-purple-300", badge: "bg-sky-500/20 text-sky-300 border-sky-400/50", icon: "🌠" },
      { name: "Supernova Radiance", bg: "from-orange-950 via-rose-950 to-black", border: "border-orange-400/50 shadow-[0_0_35px_rgba(251,146,60,0.35)]", text: "text-orange-200", accent: "text-yellow-300", badge: "bg-orange-500/20 text-orange-300 border-orange-400/50", icon: "☀️" }
    ];
    const v = cosmicVariants[(id - 61) % cosmicVariants.length];
    return {
      id,
      name: `${v.name} #${id}`,
      category: "Cosmic & Space",
      headline: "HAPPY BIRTHDAY LAMIM EDITZ",
      subtitle: `Shining Brighter Than A Billion Galaxies • Cosmic Edition #${id} • Infinity & Beyond`,
      themeStyle: {
        bgGradient: v.bg,
        borderGlow: v.border,
        textColor: v.text,
        accentColor: v.accent,
        badgeBg: v.badge,
        badgeText: "Cosmic Realm",
        particleIcon: v.icon,
        cardStyle: "bg-gradient-to-r"
      },
      decorations: ["🌌", "🪐", "🌟", "✨"]
    };
  } else if (id <= 88) {
    // 76-88: Retro & Synthwave 80s
    const retroVariants = [
      { name: "Arcade 1984 High Score", bg: "from-fuchsia-950 via-cyan-950 to-black", border: "border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.35)]", text: "text-yellow-300", accent: "text-fuchsia-400", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50", icon: "🕹️" },
      { name: "Miami Vice Neon Sunset", bg: "from-pink-950 via-orange-950 to-black", border: "border-pink-400/50 shadow-[0_0_30px_rgba(244,114,182,0.35)]", text: "text-pink-300", accent: "text-amber-300", badge: "bg-pink-500/20 text-pink-300 border-pink-400/50", icon: "🌴" },
      { name: "VHS Cyber Wave Retro", bg: "from-purple-950 via-zinc-950 to-black", border: "border-violet-400/50 shadow-[0_0_30px_rgba(167,139,250,0.35)]", text: "text-violet-300", accent: "text-cyan-300", badge: "bg-violet-500/20 text-violet-300 border-violet-400/50", icon: "📼" }
    ];
    const v = retroVariants[(id - 76) % retroVariants.length];
    return {
      id,
      name: `${v.name} #${id}`,
      category: "Retro & Synth",
      headline: "HAPPY BIRTHDAY LAMIM EDITZ",
      subtitle: `Press Start to Celebrate • Retro Synthwave Edition #${id} • Pure 80s Aesthetic`,
      themeStyle: {
        bgGradient: v.bg,
        borderGlow: v.border,
        textColor: v.text,
        accentColor: v.accent,
        badgeBg: v.badge,
        badgeText: "Retro 80s",
        particleIcon: v.icon,
        cardStyle: "bg-gradient-to-r"
      },
      decorations: ["🕹️", "📼", "🌴", "⚡"]
    };
  } else {
    // 89-100: Nature, Sacred & Pure Art
    const natureVariants = [
      { name: "Sakura Blossom Garden", bg: "from-rose-950 via-pink-950 to-zinc-950", border: "border-pink-300/50 shadow-[0_0_30px_rgba(244,114,182,0.35)]", text: "text-pink-200", accent: "text-rose-300", badge: "bg-pink-500/20 text-pink-300 border-pink-300/40", icon: "🌸" },
      { name: "Evergreen Forest Sanctuary", bg: "from-emerald-950 via-green-950 to-black", border: "border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.35)]", text: "text-emerald-200", accent: "text-green-300", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50", icon: "🌿" },
      { name: "Oceanic Bioluminescence", bg: "from-teal-950 via-blue-950 to-black", border: "border-teal-400/50 shadow-[0_0_30px_rgba(45,212,191,0.35)]", text: "text-teal-200", accent: "text-cyan-300", badge: "bg-teal-500/20 text-teal-300 border-teal-400/50", icon: "🌊" },
      { name: "Golden Sunset Solstice", bg: "from-amber-950 via-orange-950 to-black", border: "border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.35)]", text: "text-amber-200", accent: "text-orange-300", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-400/50", icon: "🌅" }
    ];
    const v = natureVariants[(id - 89) % natureVariants.length];
    return {
      id,
      name: `${v.name} #${id}`,
      category: "Nature & Elements",
      headline: "HAPPY BIRTHDAY LAMIM EDITZ",
      subtitle: `In Harmony With Nature & World Wonders • Grand Finale Edition #${id}`,
      themeStyle: {
        bgGradient: v.bg,
        borderGlow: v.border,
        textColor: v.text,
        accentColor: v.accent,
        badgeBg: v.badge,
        badgeText: "Pure Nature",
        particleIcon: v.icon,
        cardStyle: "bg-gradient-to-r"
      },
      decorations: ["🌸", "🌿", "🌊", "🌅"]
    };
  }
});

// 15 Special Birthday Celebration Themes
export const BIRTHDAY_THEMES: AppTheme[] = [
  {
    id: "bday-royal-gold",
    name: "👑 Royal Gold Birthday",
    category: "Birthday Specials",
    primaryColor: "#f59e0b",
    accentColor: "#fbbf24",
    bgGradient: "from-amber-950/40 via-yellow-950/20 to-zinc-950",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-300",
    previewColor: "#f59e0b",
    description: "Gold ribbons, royal crown elegance & warm birthday sparkles",
    sparkle: true
  },
  {
    id: "bday-neon-rave",
    name: "⚡ Cyber Neon Birthday",
    category: "Birthday Specials",
    primaryColor: "#06b6d4",
    accentColor: "#ec4899",
    bgGradient: "from-cyan-950/40 via-purple-950/30 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-300",
    previewColor: "#06b6d4",
    description: "High-voltage neon party lights with electro magenta accents",
    sparkle: true
  },
  {
    id: "bday-confetti-carnival",
    name: "🎉 Confetti Carnival",
    category: "Birthday Specials",
    primaryColor: "#ec4899",
    accentColor: "#f59e0b",
    bgGradient: "from-pink-950/40 via-rose-950/30 to-zinc-950",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-pink-500/30",
    textColor: "text-pink-300",
    previewColor: "#ec4899",
    description: "Vibrant party balloons, falling confetti and festive joy",
    sparkle: true
  },
  {
    id: "bday-sweet-pastel",
    name: "🎂 Sweet Pastel Cake",
    category: "Birthday Specials",
    primaryColor: "#a855f7",
    accentColor: "#f472b6",
    bgGradient: "from-purple-950/30 via-pink-950/20 to-zinc-950",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-300",
    previewColor: "#a855f7",
    description: "Lavender frosting, birthday cake candles & sweet party vibes",
    sparkle: true
  },
  {
    id: "bday-cosmic-starlight",
    name: "🌌 Cosmic Starlight Birthday",
    category: "Birthday Specials",
    primaryColor: "#6366f1",
    accentColor: "#38bdf8",
    bgGradient: "from-indigo-950/50 via-blue-950/30 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-300",
    previewColor: "#6366f1",
    description: "Deep space nebula with birthday shooting stars",
    sparkle: true
  },
  {
    id: "bday-velvet-noir",
    name: "⚜️ Velvet Noir VIP",
    category: "Birthday Specials",
    primaryColor: "#e11d48",
    accentColor: "#fbbf24",
    bgGradient: "from-rose-950/40 via-zinc-950 to-black",
    cardBg: "bg-zinc-950/95",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-300",
    previewColor: "#e11d48",
    description: "Red carpet luxury, champagne sparklers & VIP prestige",
    sparkle: true
  },
  {
    id: "bday-emerald-crown",
    name: "👑 Emerald Palace Birthday",
    category: "Birthday Specials",
    primaryColor: "#10b981",
    accentColor: "#34d399",
    bgGradient: "from-emerald-950/40 via-teal-950/20 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-300",
    previewColor: "#10b981",
    description: "Royal jade & emerald gems celebrating Lamim Editz",
    sparkle: true
  },
  {
    id: "bday-sunset-fiesta",
    name: "🌅 Sunset Glow Fiesta",
    category: "Birthday Specials",
    primaryColor: "#f97316",
    accentColor: "#eab308",
    bgGradient: "from-orange-950/40 via-amber-950/25 to-zinc-950",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-300",
    previewColor: "#f97316",
    description: "Golden hour sunset birthday celebration with warm lanterns",
    sparkle: true
  },
  {
    id: "bday-diamond-ice",
    name: "💎 Diamond Ice Jubilee",
    category: "Birthday Specials",
    primaryColor: "#38bdf8",
    accentColor: "#e0e7ff",
    bgGradient: "from-sky-950/40 via-slate-950 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-sky-400/30",
    textColor: "text-sky-300",
    previewColor: "#38bdf8",
    description: "Crystalline diamond glitter and glacier luxury",
    sparkle: true
  },
  {
    id: "bday-sakura-festival",
    name: "🌸 Sakura Birthday Festival",
    category: "Birthday Specials",
    primaryColor: "#f43f5e",
    accentColor: "#fda4af",
    bgGradient: "from-pink-950/40 via-rose-950/20 to-zinc-950",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-pink-500/30",
    textColor: "text-pink-300",
    previewColor: "#f43f5e",
    description: "Cherry blossom festival petals dancing for birthday wishes",
    sparkle: true
  },
  {
    id: "bday-synth-retro",
    name: "🕹️ 80s Synth Birthday",
    category: "Birthday Specials",
    primaryColor: "#d946ef",
    accentColor: "#06b6d4",
    bgGradient: "from-fuchsia-950/40 via-purple-950/30 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-fuchsia-500/30",
    textColor: "text-fuchsia-300",
    previewColor: "#d946ef",
    description: "Retro arcade vibes, neon grids & high-score celebrations",
    sparkle: true
  },
  {
    id: "bday-sapphire-night",
    name: "🌌 Sapphire Starlight",
    category: "Birthday Specials",
    primaryColor: "#2563eb",
    accentColor: "#60a5fa",
    bgGradient: "from-blue-950/40 via-indigo-950 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-300",
    previewColor: "#2563eb",
    description: "Royal sapphire night sky with glowing birthday constellations",
    sparkle: true
  },
  {
    id: "bday-champagne-toast",
    name: "🥂 Champagne Sparklers",
    category: "Birthday Specials",
    primaryColor: "#eab308",
    accentColor: "#fef08a",
    bgGradient: "from-yellow-950/40 via-amber-950/30 to-zinc-950",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-yellow-500/30",
    textColor: "text-yellow-300",
    previewColor: "#eab308",
    description: "Bubbling golden champagne, sparklers and midnight toasts",
    sparkle: true
  },
  {
    id: "bday-aurora-magic",
    name: "✨ Aurora Magic Birthday",
    category: "Birthday Specials",
    primaryColor: "#14b8a6",
    accentColor: "#8b5cf6",
    bgGradient: "from-teal-950/40 via-purple-950/30 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-300",
    previewColor: "#14b8a6",
    description: "Enchanted northern lights waving colorful birthday ribbons",
    sparkle: true
  },
  {
    id: "bday-editz-creator",
    name: "🎬 LAMIM EDITZ Creator Pro",
    category: "Birthday Specials",
    primaryColor: "#8b5cf6",
    accentColor: "#ec4899",
    bgGradient: "from-purple-950/50 via-indigo-950/40 to-black",
    cardBg: "bg-zinc-900/90",
    borderColor: "border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.2)]",
    textColor: "text-purple-300",
    previewColor: "#8b5cf6",
    description: "The official master edition honoring LAMIM EDITZ with dynamic VFX",
    sparkle: true
  }
];

// Helper to generate the remaining 85 themes for a grand total of 100 Themes!
const ANIME_PALETTES = [
  { name: "Jujutsu Satoru Six Eyes", primary: "#38bdf8", accent: "#818cf8", bg: "from-sky-950/40 via-indigo-950/30 to-black", border: "border-sky-500/30", text: "text-sky-300" },
  { name: "Sukuna Malevolent Curses", primary: "#ef4444", accent: "#b91c1c", bg: "from-red-950/40 via-zinc-950 to-black", border: "border-red-500/30", text: "text-red-300" },
  { name: "Luffy Gear 5 Sun God", primary: "#facc15", accent: "#a855f7", bg: "from-yellow-950/40 via-purple-950/30 to-zinc-950", border: "border-yellow-500/30", text: "text-yellow-300" },
  { name: "Zoro Asura Demon 9-Sword", primary: "#10b981", accent: "#047857", bg: "from-emerald-950/40 via-green-950 to-black", border: "border-emerald-500/30", text: "text-emerald-300" },
  { name: "Solo Leveling Arise", primary: "#818cf8", accent: "#c084fc", bg: "from-indigo-950/50 via-purple-950 to-black", border: "border-indigo-500/30", text: "text-indigo-300" },
  { name: "Tanjiro Hinokami Kagura", primary: "#f97316", accent: "#dc2626", bg: "from-orange-950/40 via-red-950 to-zinc-950", border: "border-orange-500/30", text: "text-orange-300" },
  { name: "Nezuko Demon Blossom", primary: "#f472b6", accent: "#fb7185", bg: "from-pink-950/40 via-rose-950/20 to-zinc-950", border: "border-pink-500/30", text: "text-pink-300" },
  { name: "Goku Ultra Instinct Silver", primary: "#e2e8f0", accent: "#38bdf8", bg: "from-slate-900/60 via-indigo-950/30 to-black", border: "border-slate-400/30", text: "text-slate-200" },
  { name: "Vegeta Ultra Ego Destroyer", primary: "#a855f7", accent: "#7e22ce", bg: "from-purple-950/50 via-zinc-950 to-black", border: "border-purple-500/30", text: "text-purple-300" },
  { name: "Attack Titan Roar", primary: "#ea580c", accent: "#78350f", bg: "from-stone-950 via-amber-950/30 to-black", border: "border-amber-600/30", text: "text-amber-300" },
  { name: "Levi Ackerman Blades", primary: "#059669", accent: "#10b981", bg: "from-teal-950/40 via-zinc-950 to-black", border: "border-teal-500/30", text: "text-teal-300" },
  { name: "Bleach Bankai Getsuga", primary: "#0f172a", accent: "#38bdf8", bg: "from-slate-950 via-blue-950/30 to-black", border: "border-blue-500/30", text: "text-blue-300" },
  { name: "Chainsaw Devil Pochita", primary: "#f97316", accent: "#e11d48", bg: "from-orange-950/40 via-rose-950 to-black", border: "border-orange-500/30", text: "text-orange-300" },
  { name: "Cyberpunk Edgerunners Lucy", primary: "#06b6d4", accent: "#ec4899", bg: "from-cyan-950/40 via-fuchsia-950/30 to-black", border: "border-cyan-500/30", text: "text-cyan-300" },
  { name: "Studio Ghibli Flying Castle", primary: "#65a30d", accent: "#38bdf8", bg: "from-lime-950/40 via-sky-950/20 to-zinc-950", border: "border-lime-500/30", text: "text-lime-300" }
];

const LUXURY_PALETTES = [
  { name: "Deep AMOLED Obsidian 4K", primary: "#6366f1", accent: "#8b5cf6", bg: "from-black via-zinc-950 to-black", border: "border-zinc-800", text: "text-white" },
  { name: "Titanium Silver Stealth", primary: "#94a3b8", accent: "#cbd5e1", bg: "from-slate-950 via-zinc-900 to-black", border: "border-slate-700", text: "text-slate-200" },
  { name: "Bugatti French Racing Blue", primary: "#2563eb", accent: "#60a5fa", bg: "from-blue-950/40 via-slate-950 to-black", border: "border-blue-500/30", text: "text-blue-300" },
  { name: "Ferrari Corsa Scuderia", primary: "#dc2626", accent: "#f87171", bg: "from-red-950/40 via-zinc-950 to-black", border: "border-red-500/30", text: "text-red-300" },
  { name: "Lamborghini Revuelto Neon", primary: "#eab308", accent: "#a855f7", bg: "from-yellow-950/40 via-purple-950/30 to-black", border: "border-yellow-500/30", text: "text-yellow-300" },
  { name: "Royal Purple Sovereign", primary: "#9333ea", accent: "#c084fc", bg: "from-purple-950/40 via-zinc-950 to-black", border: "border-purple-500/30", text: "text-purple-300" },
  { name: "Platinum Ice Diamond", primary: "#38bdf8", accent: "#f1f5f9", bg: "from-sky-950/40 via-zinc-950 to-black", border: "border-sky-500/30", text: "text-sky-300" },
  { name: "Arctic Glacier Horizon", primary: "#0ea5e9", accent: "#a5f3fc", bg: "from-cyan-950/40 via-slate-950 to-black", border: "border-cyan-500/30", text: "text-cyan-300" },
  { name: "Emerald Rainforest 8K", primary: "#059669", accent: "#34d399", bg: "from-emerald-950/40 via-green-950 to-black", border: "border-emerald-500/30", text: "text-emerald-300" },
  { name: "Midnight Rose Velvet", primary: "#be123c", accent: "#fb7185", bg: "from-rose-950/40 via-zinc-950 to-black", border: "border-rose-500/30", text: "text-rose-300" }
];

const CLEAN_PALETTES = [
  { name: "Indigo Ultra Classic (Default)", primary: "#6366f1", accent: "#a855f7", bg: "from-zinc-950 via-zinc-950 to-zinc-950", border: "border-white/10", text: "text-white" },
  { name: "Nord Arctic Frost", primary: "#38bdf8", accent: "#818cf8", bg: "from-slate-950 via-zinc-950 to-black", border: "border-slate-800", text: "text-slate-100" },
  { name: "Minimal Monochrome Dark", primary: "#f8fafc", accent: "#94a3b8", bg: "from-black via-zinc-950 to-black", border: "border-zinc-800", text: "text-zinc-100" },
  { name: "Ocean Breeze Teal", primary: "#14b8a6", accent: "#2dd4bf", bg: "from-teal-950/30 via-zinc-950 to-black", border: "border-teal-500/20", text: "text-teal-200" },
  { name: "Warm Sunset Amber", primary: "#f59e0b", accent: "#f97316", bg: "from-amber-950/30 via-zinc-950 to-black", border: "border-amber-500/20", text: "text-amber-200" },
  { name: "Cyber Matrix Terminal", primary: "#22c55e", accent: "#4ade80", bg: "from-green-950/30 via-zinc-950 to-black", border: "border-green-500/20", text: "text-green-300" }
];

export const generateAll100Themes = (): AppTheme[] => {
  const allThemes: AppTheme[] = [...BIRTHDAY_THEMES]; // 15 birthday specials
  
  // 45 Anime Elements
  for (let i = 0; i < 45; i++) {
    const p = ANIME_PALETTES[i % ANIME_PALETTES.length];
    allThemes.push({
      id: `theme-anime-${i + 1}`,
      name: `${p.name} #${i + 1}`,
      category: "Anime Elements",
      primaryColor: p.primary,
      accentColor: p.accent,
      bgGradient: p.bg,
      cardBg: "bg-zinc-900/90",
      borderColor: p.border,
      textColor: p.text,
      previewColor: p.primary,
      description: `Anime element styling with ${p.name} aesthetics`
    });
  }

  // 25 Ultimate Luxury
  for (let i = 0; i < 25; i++) {
    const p = LUXURY_PALETTES[i % LUXURY_PALETTES.length];
    allThemes.push({
      id: `theme-luxury-${i + 1}`,
      name: `${p.name} #${i + 1}`,
      category: "Ultimate Luxury",
      primaryColor: p.primary,
      accentColor: p.accent,
      bgGradient: p.bg,
      cardBg: "bg-zinc-950/95",
      borderColor: p.border,
      textColor: p.text,
      previewColor: p.primary,
      description: `Elite luxury interface styling for AM WALLPAPER`
    });
  }

  // 15 Clean & Modern
  for (let i = 0; i < 15; i++) {
    const p = CLEAN_PALETTES[i % CLEAN_PALETTES.length];
    allThemes.push({
      id: `theme-clean-${i + 1}`,
      name: `${p.name} #${i + 1}`,
      category: "Clean & Modern",
      primaryColor: p.primary,
      accentColor: p.accent,
      bgGradient: p.bg,
      cardBg: "bg-zinc-900/80",
      borderColor: p.border,
      textColor: p.text,
      previewColor: p.primary,
      description: `Clean and balanced modern web palette`
    });
  }

  return allThemes;
};

export const ALL_APP_THEMES = generateAll100Themes();
