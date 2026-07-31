"use client";

type Props = {
  url: string;
};

export default function YouTube({ url }: Props) {
  if (!url || typeof url !== "string") return null;

  let videoId = "";

  try {
    // Standardize URL string
    const cleanUrl = url.trim();

    // 1. Handle standard watch URLs (youtube.com/watch?v=VIDEO_ID)
    if (cleanUrl.includes("youtube.com/watch")) {
      const parsedUrl = new URL(cleanUrl);
      videoId = parsedUrl.searchParams.get("v") || "";
    }
    // 2. Handle shortened URLs (youtu.be/VIDEO_ID)
    else if (cleanUrl.includes("youtu.be/")) {
      const path = cleanUrl.split("youtu.be/")[1];
      videoId = path ? path.split("?")[0].split("/")[0] : "";
    }
    // 3. Handle YouTube Shorts (youtube.com/shorts/VIDEO_ID)
    else if (cleanUrl.includes("youtube.com/shorts/")) {
      const path = cleanUrl.split("youtube.com/shorts/")[1];
      videoId = path ? path.split("?")[0].split("/")[0] : "";
    }
    // 4. Handle embed URLs (youtube.com/embed/VIDEO_ID)
    else if (cleanUrl.includes("youtube.com/embed/")) {
      const path = cleanUrl.split("youtube.com/embed/")[1];
      videoId = path ? path.split("?")[0].split("/")[0] : "";
    }
  } catch {
    return null;
  }

  if (!videoId) return null;

  return (
    <div className="my-12">
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900
          shadow-xl
        "
      >
        <div className="aspect-video relative w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="YouTube Video"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture
            "
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-3xl border-0"
          />
        </div>
      </div>
    </div>
  );
}