"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkUnwrapImages from "remark-unwrap-images";

import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import MarkdownComponents from "./MarkdownComponents";

type Props = {
  content?: string;
};

export default function MarkdownRenderer({ content = "" }: Props) {
  if (!content || !content.trim()) {
    return (
      <div className="py-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
        // NO_DEVLOG_ENTRIES_RECORDED //
      </div>
    );
  }

  return (
    <div className="report-container prose prose-invert prose-cyan max-w-none chunk-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkUnwrapImages]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          rehypeHighlight,
          // Cast tuple as any to prevent TypeScript inference errors on plugin options
          [rehypeAutolinkHeadings, { behavior: "wrap" }] as any,
        ]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}