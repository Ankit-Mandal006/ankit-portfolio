"use client";

import { useState } from "react";
import { createClientSide } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientSide();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else if (data?.session) {
      // FORCE COOKIE TO BE SESSION-ONLY:
      // By manually omitting a 'Max-Age' or 'Expires' attribute, the browser is forced 
      // to treat these tokens as transient session data, wiping them out on tab/window closure.
      document.cookie = `sb-access-token=${data.session.access_token}; path=/; SameSite=Lax;`;
      
      // Refresh server cache state and navigate safely
      router.refresh();
      router.push("/admin");
    }
    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto pt-40 px-6">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-cyan-400 text-black font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}