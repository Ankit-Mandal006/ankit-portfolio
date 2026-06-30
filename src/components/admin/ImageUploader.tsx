"use client";

import { useState } from "react";
import { createClientSide } from "@/lib/supabase";

type Props = {
  name: string;
  defaultValue?: string;
};

export default function ImageUploader({
  name,
  defaultValue = "",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultValue);

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

    setImageUrl(publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-4">
      <input
        type="hidden"
        name={name}
        value={imageUrl}
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-64 rounded-xl border border-zinc-800"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && (
        <p className="text-cyan-300">
          Uploading...
        </p>
      )}
    </div>
  );
}