"use client";

import { useState } from "react";
import Image from "next/image";
import { createClientSide } from "@/lib/supabase";

type Props = {
  name: string;
  defaultValue?: string[];
};

export default function GalleryUploader({
  name,
  defaultValue = [],
}: Props) {
  const [images, setImages] = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files?.length) return;

    setUploading(true);

    const supabase = createClientSide();

    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${Math.random()}-${file.name}`;

      const { error } = await supabase.storage
        .from("projects")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      uploaded.push(publicUrl);
    }

    setImages((prev) => [...prev, ...uploaded]);

    setUploading(false);

    // Allow uploading the same file again
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">

      {/* Hidden value submitted with the form */}
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(images)}
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && (
        <p className="text-cyan-400">
          Uploading screenshots...
        </p>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {images.map((url, index) => (

            <div
              key={index}
              className="relative"
            >

              <Image
                src={url}
                alt={`Screenshot ${index + 1}`}
                width={800}
                height={450}
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  object-cover
                  aspect-video
                "
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="
                  absolute
                  top-2
                  right-2
                  rounded
                  bg-red-600
                  px-2
                  py-1
                  text-xs
                  hover:bg-red-700
                "
              >
                Remove
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}