"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

type Props = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on the client side after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelected(index)}
            className="
              relative
              aspect-video
              w-full
              overflow-hidden
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              group
              text-left
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400
            "
          >
            <Image
              src={image}
              alt={`${title} Screenshot ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </button>
        ))}
      </div>

      {/* Render Lightbox via React Portal directly into document.body */}
      {mounted &&
        selected !== null &&
        createPortal(
          <ImageLightbox
            images={images}
            currentIndex={selected}
            onClose={() => setSelected(null)}
            onNext={() => setSelected((selected + 1) % images.length)}
            onPrevious={() =>
              setSelected((selected - 1 + images.length) % images.length)
            }
          />,
          document.body
        )}
    </>
  );
}