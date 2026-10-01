import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cake, Sparkles, ChevronLeft, ChevronRight, Pause, Play, 
  Palette, Eye, MessageSquareHeart, PartyPopper, Clock, Shuffle
} from "lucide-react";
import { useAppStore } from "../store";
import { BIRTHDAY_BANNER_DESIGNS } from "../lib/birthdayCampaignData";
import { playBirthdayCelebrationSound } from "../lib/celebrationAudio";
import { cn } from "../lib/utils";

interface BirthdayCampaignBannerProps {
  onOpenThemesModal: () => void;
  onOpenBannersModal: () => void;
  onOpenWishesModal: () => void;
}

export function BirthdayCampaignBanner({
  onOpenThemesModal,
  onOpenBannersModal,
  onOpenWishesModal
}: BirthdayCampaignBannerProps) {
  const { 
    activeBannerIndex, 
    setActiveBannerIndex,
    bannerIntervalSeconds,
    setBannerIntervalSeconds,
    isBannerAutoPlay,
    toggleBannerAutoPlay,
    isConfettiActive,
    toggleConfetti,
    addToast
  } = useAppStore();

  const [timeLeft, setTimeLeft] = useState(bannerIntervalSeconds);
  const currentBanner = BIRTHDAY_BANNER_DESIGNS[activeBannerIndex] || BIRTHDAY_BANNER_DESIGNS[0];

  // Auto-rotation timer based on bannerIntervalSeconds (60s, 120s, 180s)
  useEffect(() => {
    setTimeLeft(bannerIntervalSeconds);
  }, [bannerIntervalSeconds, activeBannerIndex]);

  useEffect(() => {
    if (!isBannerAutoPlay) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setActiveBannerIndex((activeBannerIndex + 1) % 100);
          return bannerIntervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBannerAutoPlay, activeBannerIndex, bannerIntervalSeconds, setActiveBannerIndex]);

  const handlePrev = () => {
    setActiveBannerIndex((activeBannerIndex - 1 + 100) % 100);
  };

  const handleNext = () => {
    setActiveBannerIndex((activeBannerIndex + 1) % 100);
  };

  const handleSurprise = () => {
    const randomIndex = Math.floor(Math.random() * 100);
    setActiveBannerIndex(randomIndex);
    addToast(`Switched to UI Design #${randomIndex + 1}!`, "info");
  };

  const handleCelebrationClick = () => {
    playBirthdayCelebrationSound();
    if (!isConfettiActive) toggleConfetti();
    addToast("🎉 Happy Birthday LAMIM EDITZ! Wishing you boundless creativity!", "success");
  };

  const progressPercent = ((bannerIntervalSeconds - timeLeft) / bannerIntervalSeconds) * 100;

  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl border transition-all duration-700 shadow-2xl">
      {/* Dynamic Background with Current Design's Gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r transition-all duration-700 opacity-90",
          currentBanner.themeStyle.bgGradient
        )} 
      />

      {/* Decorative ambient glow circles */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

      {/* Auto-Rotation Progress Bar */}
      {isBannerAutoPlay && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-400"
            style={{ width: `${progressPercent}%` }}
            transition={{ ease: "linear", duration: 1 }}
          />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 p-5 sm:p-7 md:p-8 backdrop-blur-xl border border-white/10 rounded-3xl">
        {/* Top Campaign Bar & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/40 text-amber-300 border border-amber-500/30 backdrop-blur-md">
              <Cake className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
              Campaign Active • Oct 6 Midnight – Oct 7 Onward
            </span>
            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md", currentBanner.themeStyle.badgeBg)}>
              UI Design #{currentBanner.id} of 100 • {currentBanner.category}
            </span>
          </div>

          {/* Timer & Cycle Controls */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 text-xs">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-zinc-400 font-mono hidden sm:inline">
              Next in {timeLeft}s
            </span>

            {/* Interval buttons: 1 Min, 2 Min, 3 Min */}
            <div className="flex items-center gap-1 ml-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
              {[
                { label: "1m", sec: 60 },
                { label: "2m", sec: 120 },
                { label: "3m", sec: 180 }
              ].map((btn) => (
                <button
                  key={btn.sec}
                  onClick={() => setBannerIntervalSeconds(btn.sec)}
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors",
                    bannerIntervalSeconds === btn.sec
                      ? "bg-amber-500 text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  )}
                  title={`Auto-rotate every ${btn.label}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <button
              onClick={toggleBannerAutoPlay}
              className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors ml-1"
              title={isBannerAutoPlay ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
            >
              {isBannerAutoPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Main Banner Headline & Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="my-3 sm:my-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl sm:text-3xl">{currentBanner.themeStyle.particleIcon}</span>
              <span className="text-xs uppercase tracking-widest font-black text-amber-400/90">
                Official Birthday Celebration Edition
              </span>
              <span className="text-2xl sm:text-3xl">{currentBanner.themeStyle.particleIcon}</span>
            </div>

            <h1 className={cn(
              "text-3xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-lg",
              currentBanner.themeStyle.textColor
            )}>
              {currentBanner.headline}
            </h1>

            <p className="mt-2 text-sm sm:text-base md:text-lg text-zinc-200 max-w-3xl font-medium leading-relaxed drop-shadow">
              {currentBanner.subtitle}
            </p>

            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {currentBanner.decorations.map((dec, i) => (
                <span key={i} className="text-lg animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                  {dec}
                </span>
              ))}
              <span className="text-xs text-zinc-300 font-medium ml-2 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                Style: {currentBanner.name}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          {/* Previous / Next Banner Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10"
              title="Previous UI Design"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10"
              title="Next UI Design"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleSurprise}
              className="flex items-center gap-1.5 px-3 h-10 rounded-xl bg-white/10 text-zinc-200 hover:bg-white/20 hover:text-white transition-all text-xs font-semibold border border-white/10"
              title="Randomize UI Design"
            >
              <Shuffle className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Random UI</span>
            </button>
          </div>

          {/* Gallery, Themes & Wishes Modals Launchers */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenBannersModal}
              className="flex items-center gap-1.5 px-3.5 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 hover:text-white transition-all text-xs font-bold border border-indigo-500/30"
            >
              <Eye className="h-4 w-4" />
              <span>All 100 UI Designs</span>
            </button>

            <button
              onClick={onOpenThemesModal}
              className="flex items-center gap-1.5 px-3.5 h-10 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-white transition-all text-xs font-bold border border-purple-500/30"
            >
              <Palette className="h-4 w-4" />
              <span>100 Themes (15 Birthday)</span>
            </button>

            <button
              onClick={onOpenWishesModal}
              className="flex items-center gap-1.5 px-3.5 h-10 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 hover:text-white transition-all text-xs font-bold border border-rose-500/30"
            >
              <MessageSquareHeart className="h-4 w-4" />
              <span>Send Wish</span>
            </button>

            <button
              onClick={handleCelebrationClick}
              className="flex items-center gap-1.5 px-4 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 transition-all text-xs font-black shadow-lg shadow-amber-500/25 active:scale-95"
            >
              <PartyPopper className="h-4 w-4" />
              <span>Celebrate! 🎊</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
