"use server";

import { createAdminClient } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createAdminClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;

  const { error } = await supabase.from("projects").insert([
    {
      title,
      slug,
      tagline: "",
      description: "",
      engine: "",
      role: "",
      duration: "",
      featured: false,
    },
  ]);

  if (error) {
    console.error("Error creating project:", error.message);
    return;
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(formData: FormData) {
  const supabase = await createAdminClient();
  const currentSlug = formData.get("currentSlug") as string;

  const updates = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    tagline: formData.get("tagline") as string,
    description: formData.get("description") as string,
    engine: formData.get("engine") as string,
    role: formData.get("role") as string,
    duration: formData.get("duration") as string,
    cover: formData.get("cover") as string,
    trailer: formData.get("trailer") as string,
    itch: formData.get("itch") as string,
    github: formData.get("github") as string,
  };

  const { error } = await supabase
    .from("projects")
    .update(updates)
    .eq("slug", currentSlug);

  if (error) {
    console.error("Error updating project:", error.message);
    return;
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createAdminClient();
  
  // This destroys the session on Supabase and clears the local browser cookies
  await supabase.auth.signOut();
  
  // Send the user back to the home page or login screen
  redirect("/login");
}