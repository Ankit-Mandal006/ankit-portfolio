"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  {
    ssr: false,
  }
);

type Props = {
  name: string;
  defaultValue?: string;
};

export default function MarkdownEditor({
  name,
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <input
        type="hidden"
        name={name}
        value={value}
      />

      <div data-color-mode="dark">
        <MDEditor
          value={value}
          onChange={(v) => setValue(v || "")}
          height={700}
          preview="live"
        />
      </div>
    </>
  );
}