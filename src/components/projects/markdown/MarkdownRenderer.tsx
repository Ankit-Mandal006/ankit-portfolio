"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import MarkdownComponents from "./MarkdownComponents";

type Props = {
  content: string;
};

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <article className="chunk-markdown max-w-none">

      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkBreaks,
        ]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          rehypeHighlight,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>

    </article>
  );
}