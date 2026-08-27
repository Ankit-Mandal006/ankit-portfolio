"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdmin) return null;

  return (
    <>
      <Navbar />
    </>
  );
}
