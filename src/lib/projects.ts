import { createAdminClient } from "./supabaseAdmin";

export type Project = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  engine: string;
  role: string;
  duration: string;
  cover?: string;
  screenshots?: string[];
  technologies?: string[];
  trailer?: string;
  itch?: string;
  github?: string;
  featured?: boolean;
};

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("❌ Supabase getProjects error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return [];
    }

    return (data ?? []) as Project[];
  } catch (error) {
    console.error("❌ Unexpected getProjects error:", error);
    return [];
  }
}

export async function getProject(
  slug: string
): Promise<Project | null> {
  try {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("❌ Supabase getProject error:", {
        slug,
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return null;
    }

    return data as Project | null;
  } catch (error) {
    console.error("❌ Unexpected getProject error:", error);
    return null;
  }
}