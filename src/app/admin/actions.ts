"use server";

import { createAdminClient } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createAdminClient();

  const title = (formData.get("title") as string) || "";
  const slug = (formData.get("slug") as string) || "";
  const tagline = (formData.get("tagline") as string) || "";
  const description = (formData.get("description") as string) || "";
  const engine = (formData.get("engine") as string) || "";
  const role = (formData.get("role") as string) || "";
  const duration = (formData.get("duration") as string) || "";
  const cover = (formData.get("cover") as string) || "";
  const trailer = (formData.get("trailer") as string) || "";
  const itch = (formData.get("itch") as string) || "";
  const github = (formData.get("github") as string) || "";
  const featured = formData.get("featured") === "true";

  const screenshots = JSON.parse(
    (formData.get("screenshots") as string) || "[]"
  );

  const technologies = (
    (formData.get("technologies") as string) || ""
  )
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error } = await supabase.from("projects").insert([
    {
      title,
      slug,
      tagline,
      description,
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
    },
  ]);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");

  redirect("/admin");
}

export async function updateProject(formData: FormData) {
  const supabase = await createAdminClient();

  const currentSlug = formData.get("currentSlug") as string;

  const screenshots = JSON.parse(
    (formData.get("screenshots") as string) || "[]"
  );

  const technologies = (
    (formData.get("technologies") as string) || ""
  )
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const updates = {
    title: (formData.get("title") as string) || "",
    slug: (formData.get("slug") as string) || "",
    tagline: (formData.get("tagline") as string) || "",
    description: (formData.get("description") as string) || "",
    engine: (formData.get("engine") as string) || "",
    role: (formData.get("role") as string) || "",
    duration: (formData.get("duration") as string) || "",
    cover: (formData.get("cover") as string) || "",
    screenshots,
    technologies,
    trailer: (formData.get("trailer") as string) || "",
    itch: (formData.get("itch") as string) || "",
    github: (formData.get("github") as string) || "",
    featured: formData.get("featured") === "true",
  };

  const { error } = await supabase
    .from("projects")
    .update(updates)
    .eq("slug", currentSlug);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/projects/" + updates.slug);
  revalidatePath("/admin");

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createAdminClient();

  await supabase.auth.signOut();

  redirect("/login");
}