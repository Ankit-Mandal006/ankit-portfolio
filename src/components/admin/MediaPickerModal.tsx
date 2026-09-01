"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (urls: string[]) => void;
  multiple?: boolean;
  bucketName?: string;
};

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  multiple = false,
  bucketName = "project-media",
}: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) fetchImages();
  }, [isOpen]);

  async function fetchImages() {
    setLoading(true);
    const { data, error } = await supabase.storage.from(bucketName).list();

    if (!error && data) {
      const urls = data
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => {
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(file.name);
          return publicUrlData.publicUrl;
        });
      setImages(urls);
    }
    setLoading(false);
  }

  function handleImageClick(url: string) {
    if (multiple) {
      setSelected((prev) =>
        prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
      );
    } else {
      setSelected([url]);
    }
  }

  function handleConfirm() {
    onSelect(selected);
    setSelected([]);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-cyan-500/30 p-6 w-full max-w-3xl max-h-[85vh] flex flex-col gap-4 hud-clip">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <h3 className="text-white font-mono text-sm uppercase tracking-wider text-cyan-400">
            // SELECT_MEDIA_ASSETS //
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-mono text-xs"
          >
            [CLOSE]
          </button>
        </div>

        <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-3 min-h-[300px] p-2 bg-zinc-900/50 border border-zinc-800">
          {loading ? (
            <p className="col-span-full text-center text-zinc-500 font-mono text-xs my-auto">
              LOADING_ASSETS...
            </p>
          ) : images.length === 0 ? (
            <p className="col-span-full text-center text-zinc-500 font-mono text-xs my-auto">
              NO_ASSETS_FOUND
            </p>
          ) : (
            images.map((url) => {
              const isSelected = selected.includes(url);
              return (
                <div
                  key={url}
                  onClick={() => handleImageClick(url)}
                  className={`relative aspect-video cursor-pointer border-2 overflow-hidden transition-all ${
                    isSelected
                      ? "border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                      : "border-transparent hover:border-zinc-700"
                  }`}
                >
                  <Image src={url} alt="Media asset" fill className="object-cover" />
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-mono text-xs uppercase text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={selected.length === 0}
            className="px-4 py-2 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider disabled:opacity-50 hud-clip-sm"
          >
            Apply Selection ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
}