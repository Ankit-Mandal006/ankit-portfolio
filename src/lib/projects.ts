import { createAdminClient } from "./supabaseAdmin";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export type ProjectTopic = {
  id: string;
  title: string;
  filename: string;
  content: string;
  order: number;
};

export type Project = {
  id?: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  topics?: ProjectTopic[];
  engine: string;
  role: string;
  duration: string;
  cover?: string;
  coverPosition?: string;
  screenshots?: string[];
  technologies?: string[];
  trailer?: string;
  itch?: string;
  github?: string;
  featured?: boolean;
};

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");

function extractMarkdownBody(fileContent: string): string {
  try {
    const parsed = matter(fileContent);
    if (parsed.content && parsed.content.trim()) {
      return parsed.content;
    }
  } catch {
    // If gray-matter fails on YAML parsing errors
  }

  // Fallback: strip frontmatter via regex if starts with ---
  const withoutFrontmatter = fileContent.replace(
    /^---[\r\n]+[\s\S]*?[\r\n]+---[\r\n]*/,
    ""
  );
  return withoutFrontmatter.trim() || fileContent;
}

function formatTopicTitle(filename: string, content: string): string {
  // Try extracting first markdown heading (# Title or ## Title)
  const headingMatch = content.match(/^#+\s+(.+)$/m);
  if (headingMatch && headingMatch[1]) {
    // Clean up any leading SECTION 01 etc
    return headingMatch[1].trim();
  }

  // Fallback to filename formatted nicely (e.g. 01-executive-summary.md -> Executive Summary)
  const baseName = filename.replace(/\.md$/i, "").replace(/^\d+[-_]?/, "");
  return baseName
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Splits a single large markdown file into topics by top-level section headers (# SECTION or ## ...)
 */
function splitMarkdownIntoTopics(rawMarkdown: string): ProjectTopic[] {
  const sections = rawMarkdown.split(/(?=\n#+ )/g);
  if (sections.length <= 1) {
    return [
      {
        id: "topic-1",
        title: formatTopicTitle("overview.md", rawMarkdown),
        filename: "overview.md",
        content: rawMarkdown,
        order: 1,
      },
    ];
  }

  return sections
    .map((section, idx) => {
      const trimmed = section.trim();
      if (!trimmed) return null;
      return {
        id: `topic-${idx + 1}`,
        title: formatTopicTitle(`topic-${idx + 1}.md`, trimmed),
        filename: `topic-${idx + 1}.md`,
        content: trimmed,
        order: idx + 1,
      };
    })
    .filter(Boolean) as ProjectTopic[];
}

/**
 * Loads project topics from multiple .md files or splits single .md file
 */
async function loadProjectTopicsAndContent(
  slug: string
): Promise<{ topics: ProjectTopic[]; description: string }> {
  const normalizedSlug = slug.trim().toLowerCase();

  // Find candidate directory
  let targetDir: string | null = null;
  const directDir = path.join(PROJECTS_DIR, slug);

  try {
    const stat = await fs.stat(directDir);
    if (stat.isDirectory()) {
      targetDir = directDir;
    }
  } catch {
    // Case-insensitive lookup
    try {
      const dirs = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
      for (const dir of dirs) {
        if (
          dir.isDirectory() &&
          dir.name.toLowerCase().replace(/[^a-z0-9]/g, "") ===
            normalizedSlug.replace(/[^a-z0-9]/g, "")
        ) {
          targetDir = path.join(PROJECTS_DIR, dir.name);
          break;
        }
      }
    } catch {
      // directory read failed
    }
  }

  if (targetDir) {
    try {
      const files = await fs.readdir(targetDir);
      const mdFiles = files.filter((f) => f.toLowerCase().endsWith(".md"));

      // Check if we have multiple topic markdown files (e.g. 01-..., 02-...)
      const topicFiles = mdFiles.filter(
        (f) =>
          /^\d+[-_]/.test(f) ||
          (mdFiles.length > 1 && f.toLowerCase() !== `${slug}.md`)
      );

      const filesToRead = topicFiles.length > 0 ? topicFiles : mdFiles;

      if (filesToRead.length > 1) {
        // Sort files naturally (01-, 02-, etc.)
        filesToRead.sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
        );

        const topics: ProjectTopic[] = [];
        const contentParts: string[] = [];

        for (let i = 0; i < filesToRead.length; i++) {
          const fileName = filesToRead[i];
          try {
            const rawContent = await fs.readFile(
              path.join(/* turbopackIgnore: true */ targetDir, fileName),
              "utf-8"
            );
            const body = extractMarkdownBody(rawContent);
            if (body) {
              const title = formatTopicTitle(fileName, body);
              topics.push({
                id: `topic-${i + 1}`,
                title,
                filename: fileName,
                content: body,
                order: i + 1,
              });
              contentParts.push(body);
            }
          } catch {
            // skip unreadable file
          }
        }

        if (topics.length > 0) {
          return {
            topics,
            description: contentParts.join("\n\n---\n\n"),
          };
        }
      } else if (filesToRead.length === 1) {
        // Single markdown file -> read and split into topic sections
        const rawContent = await fs.readFile(
          path.join(/* turbopackIgnore: true */ targetDir, filesToRead[0]),
          "utf-8"
        );
        const body = extractMarkdownBody(rawContent);
        const topics = splitMarkdownIntoTopics(body);
        return {
          topics,
          description: body,
        };
      }
    } catch {
      // ignore
    }
  }

  // Fallback: check direct file public/projects/[slug].md
  try {
    const directFile = path.join(/* turbopackIgnore: true */ PROJECTS_DIR, `${slug}.md`);
    const rawContent = await fs.readFile(
      directFile,
      "utf-8"
    );
    const body = extractMarkdownBody(rawContent);
    const topics = splitMarkdownIntoTopics(body);
    return {
      topics,
      description: body,
    };
  } catch {
    // ignore
  }

  return { topics: [], description: "" };
}

export const getProject = cache(
  async (slug: string): Promise<Project | null> => {
    try {
      const supabase = await createAdminClient();

      // 1. Query metadata from Supabase
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error || !data) {
        return null;
      }

      // 2. Fetch devlog topics and content from local .md files
      const { topics, description } = await loadProjectTopicsAndContent(slug);

      return {
        ...(data as Project),
        coverPosition: data.coverPosition || data.cover_position || "center",
        description: description || data.description || "",
        topics: topics.length > 0 ? topics : undefined,
      };
    } catch (error) {
      console.error(`Error loading project "${slug}":`, error);
      return null;
    }
  }
);

export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) return [];

    return (data ?? []).map((item: any) => ({
      ...item,
      coverPosition: item.coverPosition || item.cover_position || "center",
    })) as Project[];
  } catch {
    return [];
  }
});