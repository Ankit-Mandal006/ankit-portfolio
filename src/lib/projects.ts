import projects from "@/data/projects.json";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  engine: string;
  role: string;
  duration: string;
  technologies: string[];
  cover?: string;
  screenshots?: string[];
  trailer?: string;
  itch?: string;
  github?: string;
  featured?: boolean;
};

export async function getProjects() {
  return projects as Project[];
}

export async function getProject(slug: string) {
  const allProjects =
    projects as Project[];

  return allProjects.find(
    (project) => project.slug === slug
  );
}