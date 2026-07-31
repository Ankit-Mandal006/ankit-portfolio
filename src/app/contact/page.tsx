"use client";

import { useState } from "react";
import { sendContactEmail } from "./actions";

export default function ContactPage() {
  const [status, setStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ loading: true });

    const formData = new FormData(event.currentTarget);
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus({
        loading: false,
        success: true,
        message: "Message sent! A confirmation copy has been sent to your email.",
      });
      (event.target as HTMLFormElement).reset();
    } else {
      setStatus({
        loading: false,
        success: false,
        message: result.error || "Something went wrong.",
      });
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-8 pt-36 pb-24 min-h-screen flex flex-col justify-center">
      <div>
        <p className="text-cyan-300 uppercase tracking-widest text-sm font-semibold">
          Get In Touch
        </p>
        <h1 className="text-5xl sm:text-6xl font-black mt-3">
          Let’s Work Together
        </h1>
        <p className="text-zinc-400 text-lg mt-4 max-w-xl">
          Have a project in mind? Fill out the form and both of us will receive a copy of your inquiry in our inbox.
        </p>

        {status.message && (
          <div
            className={`mt-6 p-4 rounded-xl border ${
              status.success
                ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-300"
                : "bg-red-950/40 border-red-500/50 text-red-400"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors cursor-pointer disabled:opacity-50"
          >
            {status.loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}