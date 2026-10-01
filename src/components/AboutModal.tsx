import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Sparkles, 
  Building2, 
  Code2, 
  Globe, 
  Smartphone, 
  Rocket, 
  Award, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target
} from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "studio" | "industries" | "web_projects" | "app_projects">("overview");

  if (!isOpen) return null;

  const webProjects = [
    { name: "ARAF STUDIO", desc: "The main digital studio website representing our technology, projects, services, and brand identity.", tag: "Flagship" },
    { name: "ARAF Group of Industries", desc: "The corporate identity and future vision platform for ARAF's planned business and industry ecosystem.", tag: "Corporate" },
    { name: "Seekora — Search Engine", desc: "A search engine project focused on creating a modern and simple search experience.", tag: "Search" },
    { name: "Explore the World", desc: "An exploration-based digital project designed to help users discover information about countries, places, and the world.", tag: "Discovery" },
    { name: "IdeaVault — Ideas Database", desc: "A searchable database for discovering and organizing app, website, business, and content ideas.", tag: "Database" },
    { name: "ZenPlan — Offline Smart Productivity", desc: "A smart productivity platform designed around daily planning, tasks, organization, and personal productivity.", tag: "Productivity" },
    { name: "Bangladesh Education Directory", desc: "An educational directory concept designed to make information about educational institutions in Bangladesh easier to discover.", tag: "Education" },
    { name: "Affiliate E-commerce Website", desc: "An e-commerce project focused on presenting and promoting products through an affiliate-based online platform.", tag: "E-Commerce" },
    { name: "Future Letter", desc: "A unique digital time-capsule concept for saving future letters, memories, goals, and personal messages.", tag: "Utility" },
    { name: "Formula Book", desc: "An educational platform designed to make important Mathematics, Physics, and Chemistry formulas easier to find and use.", tag: "Education" },
    { name: "Science Quiz", desc: "An interactive educational project focused on science-based quizzes and learning experiences.", tag: "EdTech" },
    { name: "Anime Quiz Master", desc: "An entertainment and quiz project built around anime, levels, points, challenges, and achievements.", tag: "Entertainment" },
    { name: "Offline Game Collection", desc: "A game collection platform bringing different types of offline games together in one place.", tag: "Gaming" },
    { name: "AM WALLPAPER (Earth & Anime Wallpapers)", desc: "1,000,000+ Real 4K/8K Wallpapers • সুন্দর পৃথিবীর সবকিছু নিয়ে • Featuring Himalayas, oceans, Bengal tigers, galaxies, supercars, world cities & anime.", tag: "1M+ Flagship" },
    { name: "Smart Finance Tracker", desc: "A personal finance management concept for tracking income, expenses, and financial planning.", tag: "FinTech" },
    { name: "Smart Calculator", desc: "A calculator project designed to provide standard calculations along with additional useful calculation features.", tag: "Tool" },
    { name: "HTML → Video Converter", desc: "A utility project based on the concept of converting HTML or web-based content into video.", tag: "Creative Tool" },
    { name: "Islamic Website", desc: "An informative website concept focused on Islamic education, duas, information, and beneficial content.", tag: "Knowledge" },
    { name: "ARAF EDITZ / ARAFEDITZ 2.0", desc: "A creative platform concept focused on graphic design, creative content, templates, and visual editing.", tag: "Design" }
  ];

  const appProjects = [
    { name: "ARAF CREATOR — Video Editor", desc: "A creative video-editing application tailored for content creators and editors.", tag: "Media" },
    { name: "StudyVault — Offline Study Hub", desc: "An all-in-one offline student companion with flashcards, notes, and study sessions.", tag: "Education" },
    { name: "HabitForge — Daily Routine Builder", desc: "A clean, habit tracking system designed to build lifelong discipline.", tag: "Productivity" },
    { name: "Anime Wallpapers HD", desc: "Premium mobile anime wallpaper app with 4K resolution downloads and live themes.", tag: "Lifestyle" },
    { name: "SpeedCalc Pro", desc: "Fast, formula-ready scientific and utility calculator for engineers and students.", tag: "Utilities" },
    { name: "Pocket Quran & Duas", desc: "Spiritual companion app with authentic prayers, audio recitations, and bookmarking.", tag: "Spiritual" }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-zinc-900/95 border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.15)] overflow-hidden text-zinc-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-indigo-950 via-zinc-900 to-purple-950 border-b border-white/10 shrink-0">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <button
              onClick={onClose}
              className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20 font-black text-2xl tracking-wider text-white">
                ARAF
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Official Profile
                  </span>
                  <span className="text-xs text-zinc-400">Owner — ARAF</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  ARAF STUDIO & ARAF GROUP OF INDUSTRIES
                </h1>
                <p className="text-sm text-indigo-300/90 font-medium">
                  “From a Small Idea to a Bigger Future”
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mt-6 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { id: "overview", label: "Vision & Story", icon: Sparkles },
                { id: "studio", label: "ARAF STUDIO", icon: Code2 },
                { id: "industries", label: "ARAF Group of Industries", icon: Building2 },
                { id: "web_projects", label: "Website Projects (19)", icon: Globe },
                { id: "app_projects", label: "App Ecosystem", icon: Smartphone }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive 
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25" 
                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Body / Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 leading-relaxed">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <Rocket className="h-5 w-5 text-indigo-400" />
                    The ARAF Vision
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    <strong className="text-white">ARAF</strong> is more than just a name. It represents a long-term vision where technology, creativity, business, innovation, and industry come together to build a better future.
                  </p>
                  <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
                    Our digital journey began through <strong className="text-indigo-300">ARAF STUDIO</strong>. From websites and mobile applications to software concepts, games, educational tools, productivity apps, creative platforms, and innovative digital projects, we are building a strong foundation in technology and creativity.
                  </p>
                  <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
                    In the long term, our vision is to build upon this foundation and develop <strong className="text-purple-300">ARAF GROUP OF INDUSTRIES</strong> into a broader business and industry ecosystem.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col justify-between">
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                        <Code2 className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">💻 ARAF STUDIO</h4>
                      <p className="text-xs text-indigo-300 font-semibold mb-2">Professional Website & App Development Company</p>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Turning ideas into real, beautiful, and useful digital products. Focused on clean UI/UX, fast performance, scalable web & mobile solutions.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("studio")} 
                      className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      Read full studio details <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 flex flex-col justify-between">
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">🏢 ARAF GROUP OF INDUSTRIES</h4>
                      <p className="text-xs text-purple-300 font-semibold mb-2">Future Business & Industry Group</p>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        A long-term enterprise roadmap bridging digital products, services, and industrial ventures under unified leadership.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("industries")} 
                      className="mt-4 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      Explore industry vision <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Core Philosophy Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 to-indigo-950/60 border border-indigo-500/30 text-center space-y-2">
                  <div className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Our Motto</div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-wide">
                    Think. Create. Build. Grow.
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    “From One Idea to a Future Built by ARAF.”
                  </p>
                </div>
              </div>
            )}

            {activeTab === "studio" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">ARAF STUDIO</h3>
                    <p className="text-sm text-indigo-300 font-medium">Professional Website & App Development Company</p>
                    <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                      ARAF STUDIO is the technology and digital innovation division of ARAF. We work on website development, app development, software concepts, UI/UX design, creative technology, educational tools, productivity solutions, games, and various digital projects.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                  <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" /> Purpose & Mission
                  </h4>
                  <blockquote className="text-base sm:text-lg font-medium text-white italic pl-4 border-l-2 border-indigo-400 py-1">
                    «“Turning ideas into real, beautiful, and useful digital products.”»
                  </blockquote>
                  <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                    Every project is a new opportunity to learn. One project may teach us design, another development, another new technology, and another may provide experience in business and product thinking.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <Zap className="h-5 w-5 text-indigo-400 mb-2" />
                    <h5 className="text-sm font-semibold text-white">Digital Craftsmanship</h5>
                    <p className="text-xs text-zinc-400 mt-1">Sleek, responsive, high-performance interfaces built for modern users.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <Layers className="h-5 w-5 text-purple-400 mb-2" />
                    <h5 className="text-sm font-semibold text-white">Scalable Architecture</h5>
                    <p className="text-xs text-zinc-400 mt-1">Modular codebases structured for reliability, offline capability, and growth.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <ShieldCheck className="h-5 w-5 text-pink-400 mb-2" />
                    <h5 className="text-sm font-semibold text-white">Continuous Innovation</h5>
                    <p className="text-xs text-zinc-400 mt-1">Constantly exploring new frameworks, APIs, and creative formats.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "industries" && (
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">ARAF GROUP OF INDUSTRIES</h3>
                    <p className="text-sm text-purple-300 font-medium">Future Business & Industry Group</p>
                    <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                      ARAF Group of Industries represents the grand visionary stage of our development. Starting from digital products, software tools, and digital media, our long-term plan is to branch out into sustainable enterprise industries, commerce, manufacturing, and tech-driven ecosystems.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/5 space-y-2">
                    <div className="text-xs font-semibold text-purple-400 uppercase">Core Pillar 01</div>
                    <h4 className="text-base font-bold text-white">Technology & Software</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Building platforms, mobile apps, educational utilities, creative tools, and intelligent systems that solve real daily challenges.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/5 space-y-2">
                    <div className="text-xs font-semibold text-purple-400 uppercase">Core Pillar 02</div>
                    <h4 className="text-base font-bold text-white">Media & Creative Production</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Creative video editing platforms, graphic suites, visual media repositories, and digital content distribution.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/5 space-y-2">
                    <div className="text-xs font-semibold text-purple-400 uppercase">Core Pillar 03</div>
                    <h4 className="text-base font-bold text-white">Commerce & Platforms</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Modern affiliate e-commerce networks, productivity subscriptions, digital directories, and marketplaces.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-zinc-800/40 border border-white/5 space-y-2">
                    <div className="text-xs font-semibold text-purple-400 uppercase">Core Pillar 04</div>
                    <h4 className="text-base font-bold text-white">Future Industry Expansion</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Gradual expansion into physical and industrial business domains, driven by strong organizational leadership and capital reinvestment.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                  <p className="text-xs text-zinc-400">
                    👑 <strong>Ownership:</strong> ARAF is the central brand and single owner identity driving this entire multi-tiered journey.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "web_projects" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">🌐 Website Projects (19 Platforms)</h3>
                    <p className="text-xs text-zinc-400">Our website ecosystem across technology, education, productivity, entertainment, and utilities.</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    19 Projects
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                  {webProjects.map((project, idx) => (
                    <div 
                      key={project.name}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-indigo-400">#{idx + 1}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10 group-hover:border-indigo-500/30">
                            {project.tag}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {project.name}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {project.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "app_projects" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">📱 Mobile & Desktop Apps Ecosystem</h3>
                    <p className="text-xs text-zinc-400">Creative, educational, productivity, entertainment, and utility mobile apps.</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Active Apps
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {appProjects.map((app) => (
                    <div 
                      key={app.name}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-purple-400">{app.tag}</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>
                      <h4 className="text-sm font-bold text-white">{app.name}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{app.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Summary / Motto */}
            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ARAF Ecosystem • Empowering Digital Innovation</span>
              </div>
              <div className="font-semibold text-zinc-300">
                One name. One dream. One journey. One future.
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
