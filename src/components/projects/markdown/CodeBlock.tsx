"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function CodeBlock({
  inline,
  className,
  children,
}: Props) {
  const [copied, setCopied] = useState(false);

  const code = String(children ?? "").replace(/\n$/, "");

  const language =
    className?.replace("language-", "") || "text";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  /* Inline code */

  if (inline) {
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
          text-[0.9rem]
          text-cyan-300
        "
      >
        {children}
      </code>
    );
  }

  return (
    <div
      className="
        relative
        my-10
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950
        shadow-[0_0_30px_rgba(0,0,0,0.35)]
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-zinc-800
          bg-zinc-900/80
          px-4
          py-3
        "
      >
        <span
          className="
            text-xs
            uppercase
            tracking-widest
            text-cyan-400
          "
        >
          {language}
        </span>

        <button
          onClick={copyCode}
          className="
            rounded-lg
            border
            border-zinc-700
            px-3
            py-1.5
            text-xs
            text-zinc-300
            hover:border-cyan-400
            hover:text-cyan-300
            transition
          "
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "24px",
          background: "#09090b",
          borderRadius: "0",
          fontSize: "14px",
          fontFamily:
            "JetBrains Mono, Fira Code, Consolas, monospace",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}