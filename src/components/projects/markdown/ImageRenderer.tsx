"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
};

export default function ImageRenderer({ src, alt = "" }: Props) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  // Parse width & alignment query params from src (e.g. image.png?w=500&align=center)
  let widthParam: number | null = null;
  let align = "center"; // default alignment

  try {
    const parsedUrl = new URL(src, "http://localhost");
    const w = parsedUrl.searchParams.get("w") || parsedUrl.searchParams.get("width");
    const a = parsedUrl.searchParams.get("align");

    if (w) widthParam = parseInt(w, 10);
    if (a) align = a;
  } catch {
    // Fallback if URL parsing fails
  }

  // Determine container width class
  let sizeClass = "w-full"; // Default: full width
  if (widthParam) {
    if (widthParam <= 300) sizeClass = "max-w-xs";
    else if (widthParam <= 500) sizeClass = "max-w-md";
    else if (widthParam <= 700) sizeClass = "max-w-2xl";
    else if (widthParam <= 900) sizeClass = "max-w-4xl";
  }

  // Alignment classes
  const alignClass =
    align === "left"
      ? "mr-auto ml-0"
      : align === "right"
      ? "ml-auto mr-0"
      : "mx-auto"; // default center

  return (
    <>
      <figure className={`my-8 ${sizeClass} ${alignClass}`}>
        <div
          onClick={() => setOpen(true)}
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            cursor-zoom-in
            transition-all
            duration-500
            hover:border-cyan-400/50
          "
        >
          <Image
            src={src}
            alt={alt}
            width={widthParam || 1200}
            height={675}
            unoptimized
            className="w-full h-auto object-cover"
          />
        </div>

        {alt && (
          <figcaption className="mt-3 text-center text-sm text-zinc-500 italic">
            {alt}
          </figcaption>
        )}
      </figure>

      {/* LIGHTBOX */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-8"
        >
          <button className="absolute top-8 right-8 text-white text-4xl">
            ✕
          </button>
          <div className="relative w-full max-w-7xl h-[90vh]">
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}