// src/actions/markdown.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  getProjectTree,
  getProjectMarkdown,
  saveProjectMarkdown,
} from "@/lib/markdown";

export async function fetchProjectTree() {
  return await getProjectTree();
}

export async function fetchMarkdownFile(
  projectSlug: string,
  fileName: string
) {
  const content = await getProjectMarkdown(projectSlug, fileName);
  return content ?? "# New File\nStart typing content here...";
}

export async function updateMarkdownFile(
  projectSlug: string,
  fileName: string,
  content: string
) {
  const success = await saveProjectMarkdown(projectSlug, fileName, content);
  if (success) {
    revalidatePath(`/projects/${projectSlug}`);
    revalidatePath(`/admin/editor`);
  }
  return { success };
}