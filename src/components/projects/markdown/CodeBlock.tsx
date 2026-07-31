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

  const code = String(children).replace(/\n$/, "");

  const language =
    className?.replace("language-", "") || "";

  async function copyCode() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  if (inline) {
    return (
      <code
        className="
          bg-zinc-900
          text-cyan-300
          px-2
          py-1
          rounded
          text-[0.95rem]
        "
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-8">

      <button
        onClick={copyCode}
        className="
          absolute
          top-4
          right-4
          z-10
          rounded-lg
          border
          border-zinc-700
          bg-zinc-900/90
          px-3
          py-2
          text-sm
          hover:border-cyan-400
          transition
        "
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          borderRadius: "18px",
          padding: "24px",
          fontSize: "15px",
          margin: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>

    </div>
  );
}