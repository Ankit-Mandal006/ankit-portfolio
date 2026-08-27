"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

type MediaItem = {
  type: "image" | "video";
  src: string;
  thumbnail: string;
};

type Props = {
  cover: string;
  screenshots?: string[];
  trailer?: string;
  title: string;
};

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}`;
  }
  return null;
}

export default function AssetStoreGallery({ cover, screenshots = [], trailer, title }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const list: MediaItem[] = [];

    // Add cover image first
    list.push({
      type: "image",
      src: cover,
      thumbnail: cover,
    });

    // Add trailer second if exists
    if (trailer) {
      const ytId = trailer.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/)?.[2];
      const thumb = ytId && ytId.length === 11 
        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        : cover;

      list.push({
        type: "video",
        src: trailer,
        thumbnail: thumb,
      });
    }

    // Add screenshots
    screenshots.forEach((scr) => {
      list.push({
        type: "image",
        src: scr,
        thumbnail: scr,
      });
    });

    setItems(list);
    setActiveIndex(0);
  }, [cover, screenshots, trailer]);

  if (items.length === 0) return null;

  const activeItem = items[activeIndex];

  // For Lightbox, filter only image items to navigate through
  const imageItems = items.filter((item) => item.type === "image");
  const currentImageIndex = imageItems.findIndex((item) => item.src === activeItem?.src);

  const handleMainClick = () => {
    if (activeItem.type === "image" && currentImageIndex !== -1) {
      setLightboxIndex(currentImageIndex);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Preview Container */}
      <div 
        onClick={handleMainClick}
        className={`relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border border-zinc-800 rounded-lg group transition-all duration-300 ${
          activeItem.type === "image" ? "cursor-zoom-in hover:border-cyan-500/40" : ""
        }`}
      >
        {activeItem.type === "video" ? (
          (() => {
            const embedUrl = getYouTubeEmbedUrl(activeItem.src);
            return embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              />
            ) : (
              <video
                src={activeItem.src}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover absolute inset-0"
              />
            );
          })()
        ) : (
          <>
            <Image
              src={activeItem.src}
              alt={title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center transition-all duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="bg-zinc-950/80 text-cyan-400 font-mono text-xs uppercase tracking-wider px-3 py-1.5 hud-clip-sm border border-cyan-500/30">
                🔍 Click to zoom
              </span>
            </div>
          </>
        )}

        {/* LEFT / RIGHT NAV ARROWS — HUD Style */}
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((activeIndex - 1 + items.length) % items.length);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-zinc-950/80 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 text-zinc-300 backdrop-blur-sm hud-clip-sm transition-all duration-200 font-bold font-mono text-lg group/btn"
              aria-label="Previous Media"
            >
              <span className="transition-transform group-hover/btn:-translate-x-0.5">‹</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((activeIndex + 1) % items.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-zinc-950/80 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 text-zinc-300 backdrop-blur-sm hud-clip-sm transition-all duration-200 font-bold font-mono text-lg group/btn"
              aria-label="Next Media"
            >
              <span className="transition-transform group-hover/btn:translate-x-0.5">›</span>
            </button>
          </>
        )}

        {/* Frame counter badge */}
        {items.length > 1 && (
          <div className="absolute bottom-3 right-3 z-20 font-mono text-[10px] uppercase tracking-widest text-cyan-400 bg-zinc-950/90 border border-cyan-500/40 px-2 py-1 hud-clip-sm pointer-events-none">
            {String(activeIndex + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
          </div>
        )}
      </div>

      {/* Horizontal Navigation Slider — HUD Style */}
      {items.length > 1 && (
        <div className="relative bg-zinc-950 border border-zinc-800 px-4 py-3 hud-clip overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-4 h-[1px] bg-gradient-to-r from-cyan-400 via-teal-400 to-transparent" />

          <div className="flex items-center gap-4">
            {/* Label */}
            <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-[0.25em] whitespace-nowrap">
              // FRAME_SEEK
            </span>

            {/* Slider track wrapper */}
            <div className="relative flex-grow h-4 flex items-center">
              {/* Background track */}
              <div className="absolute inset-y-0 my-auto w-full h-[2px] bg-zinc-800 rounded-full" />
              {/* Active fill */}
              <div
                className="absolute inset-y-0 my-auto h-[2px] bg-cyan-400 rounded-full transition-all duration-150"
                style={{ width: `${(activeIndex / (items.length - 1)) * 100}%` }}
              />
              {/* Tick marks */}
              <div className="absolute inset-x-0 my-auto flex justify-between pointer-events-none">
                {items.map((_, i) => (
                  <div
                    key={i}
                    className={`w-[2px] h-2 rounded-full transition-colors ${
                      i <= activeIndex ? "bg-cyan-400" : "bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
              {/* Hidden range input on top for interaction */}
              <input
                type="range"
                min={0}
                max={items.length - 1}
                value={activeIndex}
                onChange={(e) => setActiveIndex(parseInt(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
              />
            </div>

            {/* Counter */}
            <span className="text-[9px] font-mono font-bold text-cyan-400 tabular-nums whitespace-nowrap">
              {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}

      {/* Thumbnails Row — HUD Style */}
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-24 aspect-video overflow-hidden bg-zinc-900 border transition-all duration-200 hud-clip-sm ${
                activeIndex === idx
                  ? "border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] opacity-100 scale-[1.03]"
                  : "border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600"
              }`}
            >
              <Image
                src={item.thumbnail}
                alt={`${title} Thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
              {/* Active cyan top bar */}
              {activeIndex === idx && (
                <div className="absolute top-0 left-0 right-2 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent z-10" />
              )}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 font-bold uppercase font-mono tracking-wider hud-clip-sm">
                    ▶ VIDEO
                  </span>
                </div>
              )}
              {/* Frame index badge */}
              <div className="absolute bottom-1 right-1 text-[8px] font-mono text-zinc-400 bg-zinc-950/80 px-1 rounded-sm z-10">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Portal */}
      {mounted && lightboxIndex !== null &&
        createPortal(
          <ImageLightbox
            images={imageItems.map((img) => img.src)}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex((lightboxIndex + 1) % imageItems.length)}
            onPrevious={() =>
              setLightboxIndex((lightboxIndex - 1 + imageItems.length) % imageItems.length)
            }
          />,
          document.body
        )}
    </div>
  );
}
