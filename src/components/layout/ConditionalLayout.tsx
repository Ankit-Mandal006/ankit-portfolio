"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdmin) return null;

  return (
    <>
      <ScrollProgress />
      <Navbar />
    </>
  );
}
