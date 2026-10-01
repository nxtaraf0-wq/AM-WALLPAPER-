import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Heart, Cake, Sparkles, MessageSquareHeart } from "lucide-react";
import { useAppStore } from "../store";
import { playBirthdayCelebrationSound } from "../lib/celebrationAudio";

interface BirthdayWishesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BirthdayWishesModal({ isOpen, onClose }: BirthdayWishesModalProps) {
  const { birthdayWishes, addBirthdayWish } = useAppStore();
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const quickMessages = [
    "🎂 Happy Birthday Lamim Editz! May your year be filled with epic creativity and success!",
    "👑 To the master editor, wishing you health, joy, and boundless inspiration!",
    "🎉 Happy Birthday! Keep shining and inspiring everyone through your incredible edits!",
    "✨ Wishing you infinite happiness, blessings, and legendary achievements!"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addBirthdayWish(senderName, message);
    playBirthdayCelebrationSound();
    setMessage("");
    setSenderName("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative flex flex-col h-[85vh] w-full max-w-2xl rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-5 bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-zinc-900 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shadow-lg">
                <Cake className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Birthday Wishes for LAMIM EDITZ
                </h2>
                <p className="text-xs text-zinc-400">
                  Write a message to celebrate Lamim Editz’s special birthday!
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form & Wishes Stream */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Wish Submission Form */}
            <form onSubmit={handleSubmit} className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-lg">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Your Name / Nickname
                </label>
                <input
                  type="text"
                  placeholder="e.g. ARAF Team Member, Fan, Friend..."
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-zinc-800/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-rose-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Your Birthday Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Write your heartfelt birthday wishes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-800/80 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-rose-500/60 resize-none"
                  required
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide text-xs">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider shrink-0 mr-1">Quick:</span>
                {quickMessages.map((msg, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMessage(msg)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] border border-white/10 shrink-0 transition-colors"
                  >
                    Wish #{i + 1}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 py-3 text-sm font-black text-white shadow-lg shadow-rose-500/25 transition-all hover:opacity-95 active:scale-95"
              >
                <Send className="h-4 w-4" />
                Post Birthday Wish 🎉
              </button>
            </form>

            {/* Wishes Wall */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <MessageSquareHeart className="h-4 w-4 text-rose-400" />
                  Community Celebration Wall ({birthdayWishes.length})
                </h3>
                <span className="text-[11px] text-zinc-500">Live Celebration</span>
              </div>

              {birthdayWishes.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 transition-all hover:border-rose-500/30"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                      {wish.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono px-2 py-0.5 rounded-full bg-white/5">
                      {wish.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {wish.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
