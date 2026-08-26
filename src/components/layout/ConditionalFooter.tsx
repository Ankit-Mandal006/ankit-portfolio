"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdmin) return null;

  return <Footer />;
}
