import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackgroundGlow from "@/components/home/BackgroundGlow";
import MeshBackground from "@/components/home/MeshBackground";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import ConditionalFooter from "@/components/layout/ConditionalFooter";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ankit Mandal",
  description: "Unity Developer • Game Designer • Creator of Spy-Fiction",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-black text-white overflow-x-hidden">
        <MeshBackground />
        <BackgroundGlow />

        {/* ScrollProgress + Navbar — hidden on /admin and /login */}
        <ConditionalLayout />

        <main className="flex-1">
          {children}
        </main>

        {/* Footer with Contact section — hidden on /admin and /login */}
        <ConditionalFooter />
      </body>
    </html>
  );
}