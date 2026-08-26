"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabaseAdmin";

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");

type TopicInput = {
  title: string;
  content: string;
};

/** Convert a title string to a safe filename segment, e.g. "My Cool Topic!" → "my-cool-topic" */
function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "topic";
}

/**
 * Write topics as numbered .md files under the project dir.
 * Deletes any old numbered topic files (01-*.md … 99-*.md) first,
 * then writes the new set in order.
 */
async function writeTopicFiles(
  projectDir: string,
  slug: string,
  topics: TopicInput[]
): Promise<void> {
  await fs.mkdir(projectDir, { recursive: true });

  // Remove stale numbered topic files (pattern: NN-*.md, excluding slug.md)
  try {
    const existing = await fs.readdir(projectDir);
    for (const file of existing) {
      if (/^\d{2}[-_]/.test(file) && file.endsWith(".md")) {
        await fs.unlink(path.join(projectDir, file)).catch(() => {});
      }
    }
  } catch {
    // ignore if dir doesn't exist yet
  }

  if (topics.length === 0) return;

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const num = String(i + 1).padStart(2, "0");
    const titleSlug = slugifyTitle(topic.title);
    const filename = `${num}-${titleSlug}.md`;
    // Write just the markdown body (no frontmatter — kept in Supabase)
    const fileContent = `# ${topic.title}\n\n${topic.content}`;
    await fs.writeFile(path.join(projectDir, filename), fileContent, "utf-8");
  }
}

/** Parse topics JSON from FormData, falling back gracefully */
function parseTopics(formData: FormData): TopicInput[] {
  try {
    const raw = formData.get("topics") as string | null;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t): t is TopicInput =>
        typeof t === "object" &&
        t !== null &&
        typeof t.title === "string" &&
        typeof t.content === "string"
    );
  } catch {
    return [];
  }
}

export async function createProject(formData: FormData) {
  const title = (formData.get("title") as string) || "";
  const slug = ((formData.get("slug") as string) || "").trim();
  const tagline = (formData.get("tagline") as string) || "";
  const engine = (formData.get("engine") as string) || "";
  const role = (formData.get("role") as string) || "";
  const duration = (formData.get("duration") as string) || "";
  const cover = (formData.get("cover") as string) || "";
  const trailer = (formData.get("trailer") as string) || "";
  const itch = (formData.get("itch") as string) || "";
  const github = (formData.get("github") as string) || "";
  const featured = formData.get("featured") === "true";

  let screenshots: string[] = [];
  try {
    screenshots = JSON.parse((formData.get("screenshots") as string) || "[]");
  } catch {
    screenshots = [];
  }

  const technologies = ((formData.get("technologies") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const topics = parseTopics(formData);

  const metadata = {
    title,
    slug,
    tagline,
    engine,
    role,
    duration,
    cover,
    screenshots,
    technologies,
    trailer,
    itch,
    github,
    featured,
  };

  // 1. Insert metadata to Supabase (no description column)
  const supabase = await createAdminClient();
  await supabase.from("projects").insert([metadata]);

  // 2. Write topic .md files to disk
  const targetDir = path.join(PROJECTS_DIR, slug);

  if (topics.length > 0) {
    await writeTopicFiles(targetDir, slug, topics);
  } else {
    // Fallback: write single slug.md with empty body
    await fs.mkdir(targetDir, { recursive: true });
    const fallback = matter.stringify("", metadata);
    await fs.writeFile(path.join(targetDir, `${slug}.md`), fallback, "utf-8");
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");

  redirect("/admin");
}

export async function updateProject(formData: FormData) {
  const currentSlug = formData.get("currentSlug") as string;
  const newSlug = ((formData.get("slug") as string) || currentSlug).trim();

  const title = (formData.get("title") as string) || "";
  const tagline = (formData.get("tagline") as string) || "";
  const engine = (formData.get("engine") as string) || "";
  const role = (formData.get("role") as string) || "";
  const duration = (formData.get("duration") as string) || "";
  const cover = (formData.get("cover") as string) || "";
  const trailer = (formData.get("trailer") as string) || "";
  const itch = (formData.get("itch") as string) || "";
  const github = (formData.get("github") as string) || "";
  const featured = formData.get("featured") === "true";

  let screenshots: string[] = [];
  try {
    screenshots = JSON.parse((formData.get("screenshots") as string) || "[]");
  } catch {
    screenshots = [];
  }

  const technologies = ((formData.get("technologies") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const topics = parseTopics(formData);

  const metadata = {
    title,
    slug: newSlug,
    tagline,
    engine,
    role,
    duration,
    cover,
    screenshots,
    technologies,
    trailer,
    itch,
    github,
    featured,
  };

  // 1. Update metadata in Supabase
  const supabase = await createAdminClient();
  await supabase.from("projects").update(metadata).eq("slug", currentSlug);

  // 2. Handle folder rename if slug changed
  const oldDir = path.join(PROJECTS_DIR, currentSlug);
  const newDir = path.join(PROJECTS_DIR, newSlug);

  if (currentSlug && currentSlug !== newSlug) {
    try {
      await fs.rename(oldDir, newDir);
    } catch {
      await fs.mkdir(newDir, { recursive: true });
    }
  } else {
    await fs.mkdir(newDir, { recursive: true });
  }

  // 3. Write updated topic .md files to disk
  if (topics.length > 0) {
    await writeTopicFiles(newDir, newSlug, topics);
  } else {
    // Fallback: write single slug.md
    const fallback = matter.stringify("", metadata);
    await fs.writeFile(
      path.join(newDir, `${newSlug}.md`),
      fallback,
      "utf-8"
    );
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${newSlug}`);
  revalidatePath("/admin");

  redirect("/admin");
}

export async function deleteProject(slug: string) {
  if (!slug) return;

  // 1. Remove row from Supabase
  const supabase = await createAdminClient();
  await supabase.from("projects").delete().eq("slug", slug);

  // 2. Remove local project directory
  const targetDir = path.join(PROJECTS_DIR, slug);
  try {
    await fs.rm(targetDir, { recursive: true, force: true });
  } catch (err) {
    console.error(`Error removing folder ${targetDir}:`, err);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin");

  redirect("/admin");
}

export async function signOut() {
  redirect("/login");
}