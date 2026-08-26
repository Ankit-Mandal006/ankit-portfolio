"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from "lucide-react";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export type TopicInput = {
  id: string;        // client-side only key
  title: string;
  content: string;
};

type Props = {
  name: string;                   // hidden input name (e.g. "topics")
  defaultTopics?: TopicInput[];   // pre-populated for edit form
};

function genId() {
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function TopicsEditor({ name, defaultTopics }: Props) {
  const [topics, setTopics] = useState<TopicInput[]>(
    defaultTopics && defaultTopics.length > 0
      ? defaultTopics
      : [{ id: genId(), title: "Overview", content: "" }]
  );
  const [openCards, setOpenCards] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        (defaultTopics && defaultTopics.length > 0 ? defaultTopics : [{ id: topics[0]?.id ?? "" }]).map(
          (t) => [t.id, true]
        )
      )
  );

  const toggle = (id: string) =>
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));

  const addTopic = () => {
    const id = genId();
    setTopics((prev) => [
      ...prev,
      { id, title: `Topic ${prev.length + 1}`, content: "" },
    ]);
    setOpenCards((prev) => ({ ...prev, [id]: true }));
  };

  const removeTopic = (id: string) => {
    if (topics.length === 1) return; // always keep at least one
    setTopics((prev) => prev.filter((t) => t.id !== id));
    setOpenCards((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateTitle = (id: string, title: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
  };

  const updateContent = (id: string, content: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, content } : t))
    );
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setTopics((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    if (index === topics.length - 1) return;
    setTopics((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  // Serialise for form submission
  const serialized = JSON.stringify(
    topics.map(({ id: _id, ...rest }) => rest)
  );

  return (
    <div className="space-y-4">
      {/* Hidden serialised payload */}
      <input type="hidden" name={name} value={serialized} />

      {/* Topic Cards */}
      {topics.map((topic, index) => {
        const isOpen = !!openCards[topic.id];
        return (
          <div
            key={topic.id}
            className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden"
          >
            {/* Card Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              {/* Order badge */}
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title input */}
              <input
                type="text"
                value={topic.title}
                onChange={(e) => updateTitle(topic.id, e.target.value)}
                placeholder="Topic Title"
                className="flex-1 bg-transparent text-sm font-semibold text-white placeholder:text-zinc-600 outline-none border-b border-transparent focus:border-cyan-400 transition-colors py-0.5"
              />

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  title="Move Up"
                  className="p-1.5 text-zinc-500 hover:text-zinc-200 disabled:opacity-30 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === topics.length - 1}
                  title="Move Down"
                  className="p-1.5 text-zinc-500 hover:text-zinc-200 disabled:opacity-30 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggle(topic.id)}
                  title={isOpen ? "Collapse" : "Expand"}
                  className="p-1.5 text-zinc-500 hover:text-cyan-300 transition-colors font-mono text-xs"
                >
                  {isOpen ? "▲" : "▼"}
                </button>
                <button
                  type="button"
                  onClick={() => removeTopic(topic.id)}
                  disabled={topics.length === 1}
                  title="Delete Topic"
                  className="p-1.5 text-zinc-500 hover:text-red-400 disabled:opacity-30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Markdown Editor Body */}
            {isOpen && (
              <div className="p-4" data-color-mode="dark">
                <MDEditor
                  value={topic.content}
                  onChange={(v) => updateContent(topic.id, v ?? "")}
                  height={400}
                  preview="live"
                />
                <p className="mt-2 text-[11px] font-mono text-zinc-600">
                  Will be saved as:{" "}
                  <span className="text-zinc-400">
                    public/projects/[slug]/
                    {String(index + 1).padStart(2, "0")}-
                    {topic.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "") || "topic"}
                    .md
                  </span>
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Topic Button */}
      <button
        type="button"
        onClick={addTopic}
        className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-zinc-700 hover:border-cyan-500 text-zinc-500 hover:text-cyan-400 text-sm font-semibold transition-all rounded-xl"
      >
        <Plus className="w-4 h-4" />
        Add Topic
      </button>

      <p className="text-xs text-zinc-600 font-mono">
        {topics.length} topic{topics.length !== 1 ? "s" : ""} · Each topic becomes a separate .md file on disk
      </p>
    </div>
  );
}
