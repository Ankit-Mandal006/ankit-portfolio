// src/lib/markdown.ts
import fs from "fs/promises";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");

export type ProjectFileTree = {
  projectSlug: string;
  files: string[]; // e.g., ["index.md", "overview.md"]
};

/** Ensure the base directory exists */
async function ensureDir(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/** Get all projects and their corresponding markdown files */
export async function getProjectTree(): Promise<ProjectFileTree[]> {
  await ensureDir(PROJECTS_DIR);
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  const tree: ProjectFileTree[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const projectPath = path.join(PROJECTS_DIR, entry.name);
      const files = await fs.readdir(projectPath);
      const mdFiles = files.filter((f) => f.endsWith(".md"));

      tree.push({
        projectSlug: entry.name,
        files: mdFiles,
      });
    }
  }

  return tree;
}

/** Read a markdown file from public/projects/[projectSlug]/[filename] */
export async function getProjectMarkdown(
  projectSlug: string,
  fileName: string
): Promise<string | null> {
  const filePath = path.join(PROJECTS_DIR, projectSlug, fileName);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

/** Save/Update a markdown file inside public/projects/[projectSlug]/[fileName] */
export async function saveProjectMarkdown(
  projectSlug: string,
  fileName: string,
  content: string
): Promise<boolean> {
  const targetDir = path.join(PROJECTS_DIR, projectSlug);
  await ensureDir(targetDir);
  const filePath = path.join(targetDir, fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to write file:", error);
    return false;
  }
}