"use client";

import dynamic from "next/dynamic";

const GameArena = dynamic(() => import("@/components/game-arena/GameArena"), {
  ssr: false,
});

export default function GameArenaPage() {
  return (
    <main className="w-full h-screen bg-[#030712] m-0 p-0 overflow-hidden">
      <GameArena isOpen={true} onClose={() => window.close()} />
    </main>
  );
}
