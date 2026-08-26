"use client";

import type { Components } from "react-markdown";

import ImageRenderer from "./ImageRenderer";
import CodeBlock from "./CodeBlock";
import YouTube from "./YouTube";

const MarkdownComponents: Components = {
  /* -------------------------------- */
  /* HEADINGS                         */
  /* -------------------------------- */

  h1: ({ children }) => (
    <h1 className="mt-14 mb-8 text-5xl font-black text-white">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mt-14 mb-6 border-b border-zinc-800 pb-3 text-4xl font-bold">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mt-10 mb-4 text-2xl font-bold text-cyan-300">
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4 className="mt-8 mb-3 text-xl font-semibold text-white">
      {children}
    </h4>
  ),

  /* -------------------------------- */
  /* PARAGRAPHS                       */
  /* -------------------------------- */

  p({ children }) {
    /*
     * IMPORTANT:
     * Do not put block-level components such as
     * CodeBlock, iframe, div, etc. inside <p>.
     */

    const text = Array.isArray(children)
      ? children
          .filter((child) => typeof child === "string")
          .join("")
      : typeof children === "string"
        ? children
        : "";

    /*
     * Detect a raw YouTube URL.
     */
    if (
      text.trim().startsWith("https://www.youtube.com/") ||
      text.trim().startsWith("https://youtube.com/") ||
      text.trim().startsWith("https://youtu.be/")
    ) {
      return <YouTube url={text.trim()} />;
    }

    return (
      <p className="my-6 text-lg leading-9 text-zinc-300">
        {children}
      </p>
    );
  },

  /* -------------------------------- */
  /* TEXT                             */
  /* -------------------------------- */

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

  del: ({ children }) => (
    <del className="text-zinc-500">
      {children}
    </del>
  ),

  /* -------------------------------- */
  /* LINKS                            */
  /* -------------------------------- */

  a({ href = "", children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          italic
          font-medium
          text-cyan-400
          underline
          underline-offset-4
          decoration-cyan-400/40
          transition-colors
          hover:text-cyan-300
          hover:decoration-cyan-300
        "
      >
        {children}
      </a>
    );
  },

  /* -------------------------------- */
  /* IMAGES                           */
  /* -------------------------------- */

  img({ src, alt = "" }) {
    if (!src) {
      return null;
    }

    return (
      <ImageRenderer
        src={String(src)}
        alt={alt}
      />
    );
  },

  /* -------------------------------- */
  /* LISTS                            */
  /* -------------------------------- */

  ul: ({ children }) => (
    <ul className="my-6 ml-7 list-disc space-y-3 text-zinc-300">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="my-6 ml-7 list-decimal space-y-3 text-zinc-300">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="pl-1">
      {children}
    </li>
  ),

  /* -------------------------------- */
  /* TABLES                           */
  /* -------------------------------- */

  table: ({ children }) => (
    <div className="my-10 overflow-x-auto rounded-2xl border border-zinc-800">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-zinc-900">
      {children}
    </thead>
  ),

  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),

  tr: ({ children }) => (
    <tr className="border-b border-zinc-800 last:border-b-0">
      {children}
    </tr>
  ),

  th: ({ children }) => (
    <th className="p-4 text-left font-bold text-white">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="p-4 text-zinc-300">
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
        px-6
        py-5
        italic
        text-zinc-300
      "
    >
      {children}
    </blockquote>
  ),

  /* -------------------------------- */
  /* INLINE CODE                      */
  /* -------------------------------- */

  code({ children, className }) {
    /*
     * Fenced code is handled by `pre`.
     *
     * Here we ONLY render inline code.
     */

    if (className?.includes("language-")) {
      return (
        <code className="font-mono">
          {children}
        </code>
      );
    }

    return (
      <code
        className="
          rounded-md
          border
          border-zinc-800
          bg-zinc-900
          px-2
          py-1
          font-mono
          text-sm
          text-cyan-300
        "
      >
        {children}
      </code>
    );
  },

  /* -------------------------------- */
  /* FENCED CODE BLOCKS               */
  /* -------------------------------- */

  pre({ children }) {
  const child = Array.isArray(children)
    ? children[0]
    : children;

  if (!child) {
    return null;
  }

  const childProps = (
    child as React.ReactElement<{
      children?: React.ReactNode;
      className?: string;
    }>
  ).props;

  const code = String(
    childProps.children ?? ""
  ).replace(/\n$/, "");

  const language =
    childProps.className
      ?.replace(/^language-/, "") || "text";

  return (
    <CodeBlock
      code={code}
      language={language}
    />
  );
},

  /* -------------------------------- */
  /* HORIZONTAL RULE                  */
  /* -------------------------------- */

  hr: () => (
    <hr className="my-12 border-zinc-800" />
  ),
};

export default MarkdownComponents;