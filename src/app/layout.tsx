import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackgroundGlow from "@/components/home/BackgroundGlow";
import MeshBackground from "@/components/home/MeshBackground";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";

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
  description:
    "Unity Developer • Game Designer • Creator of Spy-Fiction",
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
      <body
  className="
    min-h-screen
    bg-black
    text-white
    overflow-x-hidden
  "
>
  <MeshBackground />

  <BackgroundGlow />

  <ScrollProgress />

  <Navbar />

  <main className="flex-1">
    {children}
  </main>

  <Footer />
</body>
    </html>
  );
}