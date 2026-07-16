"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

type Props = {
  images: string[];
  title: string;
};

export default function ProjectGallery({
  images,
  title,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelected(index)}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              group
              text-left
            "
          >
            <Image
              src={image}
              alt={`${title} Screenshot ${index + 1}`}
              width={1600}
              height={900}
              className="
                w-full
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <ImageLightbox
          images={images}
          currentIndex={selected}
          onClose={() => setSelected(null)}
          onNext={() =>
            setSelected((selected + 1) % images.length)
          }
          onPrevious={() =>
            setSelected(
              (selected - 1 + images.length) % images.length
            )
          }
        />
      )}
    </>
  );
}