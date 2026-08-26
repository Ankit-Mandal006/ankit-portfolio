"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Search,
  Layers,
  Clock,
  FileText,
} from "lucide-react";
import MarkdownRenderer from "./markdown/MarkdownRenderer";
import type { ProjectTopic } from "@/lib/projects";

type Props = {
  topics: ProjectTopic[];
  fallbackDescription?: string;
};

export default function ProjectTopicViewer({
  topics = [],
  fallbackDescription = "",
}: Props) {
  // Normalise: if no structured topics, wrap the fallback
  const safeTopics = useMemo(() => {
    if (topics && topics.length > 0) return topics;
    if (fallbackDescription && fallbackDescription.trim()) {
      return [
        {
          id: "topic-default",
          title: "Technical Specification & Devlog",
          filename: "devlog.md",
          content: fallbackDescription,
          order: 1,
        },
      ];
    }
    return [];
  }, [topics, fallbackDescription]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [maximizedTopicId, setMaximizedTopicId] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Filter tabs by search
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return safeTopics;
    const q = searchQuery.toLowerCase();
    return safeTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.content.toLowerCase().includes(q)
    );
  }, [safeTopics, searchQuery]);

  // Keep active index in bounds when search changes
  useEffect(() => {
    if (activeIndex >= filteredTopics.length) {
      setActiveIndex(Math.max(0, filteredTopics.length - 1));
    }
  }, [filteredTopics.length, activeIndex]);

  const activeTopic = filteredTopics[activeIndex] ?? null;
  const maximizedTopic = useMemo(
    () => safeTopics.find((t) => t.id === maximizedTopicId) ?? null,
    [maximizedTopicId, safeTopics]
  );

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goPrev = () => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  };

  const goNext = () => {
    if (activeIndex < filteredTopics.length - 1) goTo(activeIndex + 1);
  };

  if (safeTopics.length === 0) {
    return (
      <div className="relative bg-zinc-950 border border-zinc-800 p-10 text-center hud-clip">
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          // NO_DEVLOG_TOPICS_FOUND //
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-0">
        {/* ── HUD Header Bar ── */}
        <div className="relative bg-zinc-950/95 border border-zinc-800 p-4 sm:p-5 hud-clip backdrop-blur-md">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left: label */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-950/60 border border-cyan-500/40 hud-clip-sm text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-cyan-400">
                  // DEVLOG_MODULES //
                </h3>
                <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                  {safeTopics.length} MODULES · TAB NAVIGATOR
                </p>
              </div>
            </div>

            {/* Right: search */}
            <div className="relative sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Filter topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-cyan-500 text-xs font-mono text-zinc-200 pl-8 pr-3 py-1.5 rounded-none hud-clip-sm outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="border-x border-zinc-800 bg-zinc-950/80 overflow-x-auto [scrollbar-width:none]">
          <div className="flex min-w-max">
            {filteredTopics.map((topic, idx) => {
              const isActive = idx === activeIndex;
              const wordCount = topic.content.split(/\s+/).filter(Boolean).length;
              const mins = Math.max(1, Math.round(wordCount / 200));
              return (
                <button
                  key={topic.id}
                  onClick={() => goTo(idx)}
                  className={`relative flex flex-col items-start px-4 py-3 text-left border-r border-zinc-800 transition-all duration-200 min-w-[140px] max-w-[200px] shrink-0 group ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "bg-transparent text-zinc-500 hover:bg-zinc-900/60 hover:text-zinc-300"
                  }`}
                >
                  {/* Active top accent */}
                  {isActive && (
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-300" />
                  )}
                  <span
                    className={`text-[10px] font-mono font-bold mb-1 ${
                      isActive ? "text-cyan-400" : "text-zinc-600 group-hover:text-zinc-500"
                    }`}
                  >
                    MODULE_{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold leading-tight line-clamp-2 w-full">
                    {topic.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600 mt-1 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {mins}m
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Topic Content ── */}
        <div className="border border-t-0 border-zinc-800 bg-zinc-950 hud-clip overflow-hidden">
          {activeTopic ? (
            <>
              {/* Topic meta strip */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/40">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 hud-clip-sm">
                    MODULE_{String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-sm font-bold text-zinc-200 tracking-tight">
                    {activeTopic.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-zinc-600 hidden sm:flex items-center gap-1.5">
                    <FileText className="w-3 h-3" />
                    [{activeTopic.filename}]
                  </span>
                  <button
                    type="button"
                    title="Focus Mode"
                    onClick={() => setMaximizedTopicId(activeTopic.id)}
                    className="p-1.5 text-zinc-500 hover:text-cyan-300 border border-transparent hover:border-zinc-700 transition-colors hud-clip-sm"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Animated content swap */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={activeTopic.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="px-5 sm:px-10 py-8"
                  >
                    <MarkdownRenderer content={activeTopic.content} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Prev / Next Navigation ── */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-800/80 bg-zinc-900/30">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all hud-clip-sm disabled:opacity-30 disabled:cursor-not-allowed border-zinc-700 text-zinc-400 hover:border-cyan-500 hover:text-cyan-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev Module
                </button>

                {/* Dot indicator */}
                <div className="flex items-center gap-1.5">
                  {filteredTopics.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      className={`transition-all rounded-full ${
                        idx === activeIndex
                          ? "w-5 h-1.5 bg-cyan-400"
                          : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={activeIndex === filteredTopics.length - 1}
                  className="flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all hud-clip-sm disabled:opacity-30 disabled:cursor-not-allowed border-zinc-700 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 font-bold"
                >
                  Next Module
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
              // NO_RESULTS_MATCHING_QUERY //
            </div>
          )}
        </div>
      </div>

      {/* ── Fullscreen Focus Modal ── */}
      <AnimatePresence>
        {maximizedTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col p-4 sm:p-8 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 max-w-6xl w-full mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-1 hud-clip-sm">
                  FOCUS_MODE // MODULE_{maximizedTopic.order}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate max-w-lg">
                  {maximizedTopic.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMaximizedTopicId(null)}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-zinc-300 hover:text-cyan-300 font-mono text-xs uppercase tracking-wider hud-clip-sm transition-colors"
              >
                <X className="w-4 h-4" />
                <span>[ Close ]</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mt-6 max-w-5xl w-full mx-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#22d3ee_#090d14]">
              <article className="bg-zinc-950/80 border border-zinc-800 p-6 sm:p-12 hud-clip">
                <MarkdownRenderer content={maximizedTopic.content} />
              </article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
