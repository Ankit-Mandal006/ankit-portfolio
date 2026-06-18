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

export async function getProjects() {
  // Use the admin client here
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data as Project[];
}

export async function getProject(slug: string) {
  // Use the admin client here
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as Project;
}