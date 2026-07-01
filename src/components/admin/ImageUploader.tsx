"use client";

import { useState } from "react";
import Image from "next/image";
import { createClientSide } from "@/lib/supabase";

type Props = {
  name: string;
  defaultValue?: string;
};

export default function ImageUploader({
  name,
  defaultValue = "",
}: Props) {
  const [image, setImage] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const supabase = createClientSide();

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("projects")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    setImage(publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-4">

      <input
        type="hidden"
        name={name}
        value={image}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && (
        <p className="text-cyan-400">
          Uploading...
        </p>
      )}

      {image && (
        <Image
          src={image}
          alt="Cover Preview"
          width={800}
          height={450}
          className="
            rounded-2xl
            border
            border-zinc-800
            max-h-80
            object-cover
          "
        />
      )}

    </div>
  );
}