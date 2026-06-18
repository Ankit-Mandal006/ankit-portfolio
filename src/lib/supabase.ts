import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createClientSide() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Switches saving location from localStorage to sessionStorage
      // This wipes out the token immediately when the tab/window is closed!
      storage: typeof window !== "undefined" ? window.sessionStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}