"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientSide } from "@/lib/supabase";

export default function IdleTimer() {
  const router = useRouter();
  const supabase = createClientSide();

  useEffect(() => {
    // Set inactivity limit (e.g., 15 minutes = 900000 ms)
    const INACTIVITY_LIMIT = 60 * 1000; 
    let timeoutId: NodeJS.Timeout;

    const handleSignOut = async () => {
      await supabase.auth.signOut();
      // Force refresh cookies on server side and kick to login
      router.refresh();
      router.push("/login");
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleSignOut, INACTIVITY_LIMIT);
    };

    // Listen for human activity on the page
    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start initial timer countdown
    resetTimer();

    // Cleanup listeners when unmounting
    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [router, supabase]);

  return null; // This component runs entirely invisibly in the background
}