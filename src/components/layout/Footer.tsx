"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/contact/actions"; // adjust path if needed

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);

    setIsSubmitting(false);

    if (result.success) {
      setStatus({ success: true });
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus({ error: result.error || "Something went wrong." });
    }
  }

  return (
    <footer
      id="contact"
      className="
        border-t
        border-zinc-900
        mt-32
        scroll-mt-24
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-8
          py-16
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* Contact Form Section */}
        <div className="pb-16 mb-12 border-b border-zinc-900 w-full flex flex-col items-center">
          <p className="text-cyan-300 text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">
            Let’s Work Together
          </h2>

          <p className="text-zinc-400 text-lg mt-3 max-w-2xl">
            Have a project in mind? Fill out the form and both of us will receive a copy of your inquiry in our inbox.
          </p>

          {status?.success ? (
            <div className="mt-8 p-6 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-center max-w-2xl w-full">
              🎉 Message sent successfully! I&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-3xl w-full space-y-6 text-left">
              {status?.error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {status.error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition resize-none"
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Branding & Info */}
        <h3 className="font-black text-xl text-white">
          ANKIT MANDAL
        </h3>

        <p className="text-zinc-500 mt-2">
          Unity Developer • Game Designer
        </p>

        <p className="text-zinc-700 mt-8">
          © {new Date().getFullYear()} Ankit Mandal
        </p>
      </div>
    </footer>
  );
}