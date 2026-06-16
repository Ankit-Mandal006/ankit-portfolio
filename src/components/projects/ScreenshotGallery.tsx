export default function ScreenshotGallery() {
  const screenshots = [
    "/projects/spy-fiction/screenshot1.jpg",
    "/projects/spy-fiction/screenshot2.jpg",
    "/projects/spy-fiction/screenshot3.jpg",
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4 mt-8">
      {screenshots.map((image) => (
        <img
          key={image}
          src={image}
          alt=""
          className="
            rounded-xl
            border border-zinc-800
            hover:scale-[1.02]
            transition
          "
        />
      ))}
    </div>
  );
}