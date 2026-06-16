export default function BackgroundGlow() {
  return (
    <>
      <div
        className="
          fixed
          top-[-300px]
          left-1/2
          -translate-x-1/2

          w-[900px]
          h-[900px]

          rounded-full

          bg-cyan-500/10

          blur-[180px]

          pointer-events-none
          -z-10
        "
      />

      <div
        className="
          fixed
          bottom-[-200px]
          right-[-200px]

          w-[700px]
          h-[700px]

          rounded-full

          bg-blue-500/5

          blur-[200px]

          pointer-events-none
          -z-10
        "
      />
    </>
  );
}