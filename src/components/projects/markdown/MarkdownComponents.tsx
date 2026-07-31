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
    <h2 className="mt-14 mb-6 text-4xl font-bold border-b border-zinc-800 pb-3">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mt-10 mb-4 text-2xl font-bold text-cyan-300">
      {children}
    </h3>
  ),

  h4: ({ children }) => (
    <h4 className="mt-8 mb-3 text-xl font-semibold">
      {children}
    </h4>
  ),

  /* -------------------------------- */
  /* TEXT                             */
  /* -------------------------------- */

  p({ children }) {
    if (
      typeof children === "string" &&
      children.includes("youtube.com")
    ) {
      return <YouTube url={children} />;
    }

    if (
      typeof children === "string" &&
      children.includes("youtu.be")
    ) {
      return <YouTube url={children} />;
    }

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
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="
          text-cyan-300
          underline
          underline-offset-4
          hover:text-cyan-200
          transition
        "
      >
        {children}
      </a>
    );
  },

  /* -------------------------------- */
  /* IMAGES                           */
  /* -------------------------------- */

  img({ src = "", alt = "" }) {
    return (
      <ImageRenderer
        src={src}
        alt={alt}
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
    <div className="overflow-x-auto my-10 rounded-2xl border border-zinc-800">
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
    <tbody>{children}</tbody>
  ),

  tr: ({ children }) => (
    <tr className="border-b border-zinc-800">
      {children}
    </tr>
  ),

  th: ({ children }) => (
    <th className="p-4 text-left font-bold">
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
        p-6
        italic
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