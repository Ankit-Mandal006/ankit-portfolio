// app/api/projects/route.ts
import { getProjects } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await getProjects();
    
    // Transform projects to ensure all required fields
    const formattedProjects = projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      tagline: project.tagline || project.description || "",
      description: project.description || project.tagline || "",
      engine: project.engine || "Game Engine",
      role: project.role || "Developer",
      technologies: project.technologies || ["Unity", "C#"],
      itch: project.itch || "",
      github: project.github || "",
      cover: project.cover || "",
      featured: project.featured || false,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array instead of error
  }
}