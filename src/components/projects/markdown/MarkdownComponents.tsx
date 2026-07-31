"use client";

import React from "react";
import type { Components } from "react-markdown";

import ImageRenderer from "./ImageRenderer";
import CodeBlock from "./CodeBlock";
import YouTube from "./YouTube";

const MarkdownComponents: Components = {
  /* -------------------------------- */
  /* HEADINGS                         */
  /* -------------------------------- */

  h1: ({ children }) => (
    <h1 className="mt-14 mb-8 text-5xl font-black text-white not-italic no-underline [&_a]:text-white [&_a]:no-underline [&_a]:not-italic">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mt-14 mb-6 text-4xl font-bold border-b border-zinc-800 pb-3 text-white not-italic no-underline [&_a]:text-white [&_a]:no-underline [&_a]:not-italic">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mt-10 mb-4 text-2xl font-bold text-cyan-300 not-italic no-underline [&_a]:text-cyan-300 [&_a]:no-underline [&_a]:not-italic">
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4 className="mt-8 mb-3 text-xl font-semibold text-white not-italic no-underline [&_a]:text-white [&_a]:no-underline [&_a]:not-italic">
      {children}
    </h4>
  ),

  /* -------------------------------- */
  /* TEXT & PARAGRAPHS                */
  /* -------------------------------- */

  p({ children, node }) {
    // 1. Check if paragraph contains an image element
    const hasImageChild = node?.children?.some((child) => {
      if ("tagName" in child) {
        return child.tagName === "img";
      }
      return false;
    });

    // 2. Check for standalone YouTube URLs
    const rawText = typeof children === "string" ? children.trim() : "";
    const isYouTubeUrl =
      rawText.includes("youtube.com/watch") ||
      rawText.includes("youtu.be/");

    if (isYouTubeUrl) {
      return (
        <div className="my-8">
          <YouTube url={rawText} />
        </div>
      );
    }

    // 3. Render as <div> if wrapping an image to avoid HTML `<p> > <div>` hydration errors
    if (hasImageChild) {
      return <div className="my-6">{children}</div>;
    }

    // 4. Default Paragraph
    return (
      <p className="text-zinc-300 leading-9 text-lg my-6">
        {children}
      </p>
    );
  },

  strong: ({ children }) => (
    <strong className="font-bold text-white">
      {children}
    </strong>
  ),

  em: ({ children }) => (
    <em className="italic text-cyan-300">
      {children}
    </em>
  ),

  hr: () => (
    <hr className="my-12 border-zinc-800" />
  ),

  /* -------------------------------- */
  /* LINKS                            */
  /* -------------------------------- */

  a({ href = "", children }) {
    // Check if the link target is an anchor link to a heading (e.g., #heading-title)
    const isHeadingAnchor = href.startsWith("#");

    if (isHeadingAnchor) {
      return (
        <a href={href} className="text-inherit no-underline not-italic">
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="
          font-medium
          text-cyan-400
          underline
          underline-offset-4
          decoration-cyan-400
          hover:text-cyan-300
          hover:decoration-cyan-300
          transition-all
          duration-300
          not-italic
        "
      >
        {children}
      </a>
    );
  },

  /* -------------------------------- */
  /* IMAGES                           */
  /* -------------------------------- */

  img(props) {
    const src = typeof props.src === "string" ? props.src : "";

    return (
      <ImageRenderer
        src={src}
        alt={props.alt ?? ""}
      />
    );
  },

  /* -------------------------------- */
  /* LISTS                            */
  /* -------------------------------- */

  ul: ({ children }) => (
    <ul className="list-disc ml-7 space-y-3 text-zinc-300 my-6">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal ml-7 space-y-3 text-zinc-300 my-6">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li>{children}</li>
  ),

  /* -------------------------------- */
  /* TABLES                           */
  /* -------------------------------- */

  table: ({ children }) => (
    <div className="overflow-x-auto my-10 rounded-2xl border border-zinc-800 bg-zinc-900/40">
      <table className="w-full border-collapse text-left">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-zinc-900 text-cyan-300 border-b border-zinc-800">
      {children}
    </thead>
  ),

  tbody: ({ children }) => (
    <tbody className="divide-y divide-zinc-800/60">{children}</tbody>
  ),

  tr: ({ children }) => (
    <tr className="hover:bg-zinc-900/30 transition-colors">
      {children}
    </tr>
  ),

  th: ({ children }) => (
    <th className="p-4 text-sm font-bold tracking-wider uppercase">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="p-4 text-zinc-300 text-sm">
      {children}
    </td>
  ),

  /* -------------------------------- */
  /* BLOCKQUOTE                       */
  /* -------------------------------- */

  blockquote: ({ children }) => (
    <blockquote
      className="
        my-8
        rounded-2xl
        border-l-4
        border-cyan-400
        bg-zinc-900/60
        p-6
        italic
        text-zinc-200
      "
    >
      {children}
    </blockquote>
  ),

  /* -------------------------------- */
  /* CODE                             */
  /* -------------------------------- */

  code(props) {
    return <CodeBlock {...props} />;
  },
};

export default MarkdownComponents;