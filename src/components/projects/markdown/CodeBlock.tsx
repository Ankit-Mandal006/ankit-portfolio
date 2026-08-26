"use client";

import { useState } from "react";
import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  language: string;
};

export default function CodeBlock({
  code,
  language,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  return (
    <div
      className="
        my-8
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-[#0d1117]
      "
    >
      {/* IDE HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-zinc-800
          bg-[#161b22]
          px-4
          py-3
        "
      >
        {/* Left side */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />

          <span
            className="
              ml-3
              font-mono
              text-xs
              uppercase
              tracking-wider
              text-zinc-500
            "
          >
            {language}
          </span>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={copyCode}
          className="
            rounded-md
            border
            border-zinc-700
            bg-zinc-900
            px-3
            py-1.5
            font-mono
            text-xs
            text-zinc-300
            transition
            hover:border-cyan-400
            hover:text-cyan-300
          "
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* CODE */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            padding: "24px",
            background: "#0d1117",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}