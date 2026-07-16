"use client";

import { useEffect } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: Props) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        bg-black/90
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-8
      "
      onClick={onClose}
    >
      {/* Previous */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="
          absolute
          left-6
          text-5xl
          text-white
          hover:text-cyan-300
          transition
        "
      >
        ←
      </button>

      {/* Image */}

      <div
        className="relative w-full max-w-7xl h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt=""
          fill
          className="object-contain rounded-xl"
          priority
        />
      </div>

      {/* Next */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="
          absolute
          right-6
          text-5xl
          text-white
          hover:text-cyan-300
          transition
        "
      >
        →
      </button>

      {/* Close */}

      <button
        onClick={onClose}
        className="
          absolute
          top-6
          right-6
          text-4xl
          text-white
          hover:text-red-400
          transition
        "
      >
        ✕
      </button>

      {/* Counter */}

      <div
        className="
          absolute
          bottom-6
          text-zinc-300
          text-lg
        "
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}