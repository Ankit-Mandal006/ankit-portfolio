import { createAdminClient } from "@/lib/supabaseAdmin";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createAdminClient();

  // 1. Fetch the authenticated user data from the session token
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // 2. Fetch the current active session meta-data
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    
    // Check if expires_at exists; if it doesn't, force a sign-out safety check
    if (!session.expires_at) {
      await supabase.auth.signOut();
      redirect("/login");
    }

    const sessionAge = nowInSeconds - session.expires_at + session.expires_in; 
    
    // TEMPORARY TESTING LIMIT: 10 seconds
    const ALLOWED_LIMIT_SECONDS = 10; 

    if (sessionAge > ALLOWED_LIMIT_SECONDS) {
      // Force destroy the session on the backend because it's too old
      await supabase.auth.signOut();
      redirect("/login");
    }
  }

  return <>{children}</>;
}