"use client";

import { useState } from "react";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import GalleryUploader from "@/components/admin/GalleryUploader";
import TopicsEditor, { type TopicInput } from "@/components/admin/TopicsEditor";
import type { ProjectTopic } from "@/lib/projects";

type Project = {
  title: string;
  slug: string;
  tagline?: string;
  description?: string;
  topics?: ProjectTopic[];
  engine?: string;
  role?: string;
  duration?: string;
  cover?: string;
  coverPosition?: string;
  screenshots?: string[];
  trailer?: string;
  itch?: string;
  github?: string;
  featured?: boolean;
};

type Props = {
  project: Project;
  existingMedia?: string[];
  updateAction: (formData: FormData) => Promise<void>;
};

/** Convert ProjectTopic[] (from lib) → TopicInput[] (for TopicsEditor) */
function toTopicInputs(topics?: ProjectTopic[]): TopicInput[] | undefined {
  if (!topics || topics.length === 0) return undefined;
  return topics.map((t) => ({
    id: t.id,
    title: t.title,
    content: t.content,
  }));
}

export default function EditProjectForm({
  project,
  existingMedia = [],
  updateAction,
}: Props) {
  // Track open/closed state for each collapsible section
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    specs: true,
    topics: true,
    media: false,
    links: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const defaultTopics = toTopicInputs(project.topics);

  return (
    <form action={updateAction} className="space-y-6">
      <input type="hidden" name="currentSlug" value={project.slug} />

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1: Basic Information                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("basic")}
          className="w-full flex justify-between items-center p-6 text-left hover:bg-zinc-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📌</span>
            <h2 className="text-xl font-bold text-white">Basic Information</h2>
          </div>
          <span className="text-zinc-400 text-sm font-semibold">
            {openSections.basic ? "Minimize ▲" : "Expand ▼"}
          </span>
        </button>

        {openSections.basic && (
          <div className="p-6 border-t border-zinc-800/60 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-zinc-400">Title</label>
                <input
                  name="title"
                  required
                  defaultValue={project.title}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-zinc-400">Slug</label>
                <input
                  name="slug"
                  required
                  defaultValue={project.slug}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-zinc-400">Tagline</label>
              <input
                name="tagline"
                defaultValue={project.tagline}
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2: Devlog Topics                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("topics")}
          className="w-full flex justify-between items-center p-6 text-left hover:bg-zinc-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📝</span>
            <div>
              <h2 className="text-xl font-bold text-white">Devlog Topics</h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Each topic → its own .md file in public/projects/{project.slug}/
              </p>
            </div>
          </div>
          <span className="text-zinc-400 text-sm font-semibold">
            {openSections.topics ? "Minimize ▲" : "Expand ▼"}
          </span>
        </button>

        {openSections.topics && (
          <div className="p-6 border-t border-zinc-800/60">
            <TopicsEditor name="topics" defaultTopics={defaultTopics} />
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3: Specifications & Metadata                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("specs")}
          className="w-full flex justify-between items-center p-6 text-left hover:bg-zinc-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🛠️</span>
            <h2 className="text-xl font-bold text-white">Project Specifications</h2>
          </div>
          <span className="text-zinc-400 text-sm font-semibold">
            {openSections.specs ? "Minimize ▲" : "Expand ▼"}
          </span>
        </button>

        {openSections.specs && (
          <div className="p-6 border-t border-zinc-800/60 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-zinc-400">Engine</label>
                <input
                  name="engine"
                  defaultValue={project.engine}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-zinc-400">Role</label>
                <input
                  name="role"
                  defaultValue={project.role}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-zinc-400">Duration</label>
                <input
                  name="duration"
                  defaultValue={project.duration}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-zinc-400">Technologies</label>
              <p className="text-sm text-zinc-600 mb-3">Separate with commas.</p>
              <input
                name="technologies"
                defaultValue={(project as any).technologies?.join(", ") ?? ""}
                placeholder="Unity, C#, Blender, FMOD"
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4: Media Assets                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("media")}
          className="w-full flex justify-between items-center p-6 text-left hover:bg-zinc-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🖼️</span>
            <h2 className="text-xl font-bold text-white">Media & Screenshots</h2>
          </div>
          <span className="text-zinc-400 text-sm font-semibold">
            {openSections.media ? "Minimize ▲" : "Expand ▼"}
          </span>
        </button>

        {openSections.media && (
          <div className="p-6 border-t border-zinc-800/60 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold text-zinc-400">Cover Image</label>
                  <ImageUploader 
                    name="cover" 
                    defaultValue={project.cover || ""} 
                    existingMedia={existingMedia}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-zinc-400">Cover Focal Point</label>
                  <select
                    name="coverPosition"
                    defaultValue={project.coverPosition || "center"}
                    className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="center">Center (Default)</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top left">Top Left</option>
                    <option value="top right">Top Right</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-zinc-400">Screenshots Gallery</label>
                <GalleryUploader 
                  name="screenshots" 
                  defaultValue={project.screenshots || []} 
                  existingMedia={existingMedia}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-zinc-400">Trailer URL</label>
              <input
                name="trailer"
                defaultValue={project.trailer}
                placeholder="YouTube URL or .mp4 link"
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5: External Links & Status                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("links")}
          className="w-full flex justify-between items-center p-6 text-left hover:bg-zinc-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🔗</span>
            <h2 className="text-xl font-bold text-white">Links & Status</h2>
          </div>
          <span className="text-zinc-400 text-sm font-semibold">
            {openSections.links ? "Minimize ▲" : "Expand ▼"}
          </span>
        </button>

        {openSections.links && (
          <div className="p-6 border-t border-zinc-800/60 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-zinc-400">Itch.io Link</label>
                <input
                  name="itch"
                  type="url"
                  defaultValue={project.itch}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-zinc-400">GitHub Link</label>
                <input
                  name="github"
                  type="url"
                  defaultValue={project.github}
                  className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-zinc-400">Featured Showcase Status</label>
              <select
                name="featured"
                defaultValue={project.featured ? "true" : "false"}
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="false">Standard Project</option>
                <option value="true">Featured Showcase</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex items-center justify-end gap-4">
        <Link
          href="/admin"
          className="px-6 py-4 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
        >
          Save All Changes
        </button>
      </div>
    </form>
  );
}