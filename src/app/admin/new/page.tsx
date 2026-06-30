import { createProject } from "../actions";
import NewProjectForm from "@/components/admin/NewProjectForm";

export default function NewProjectPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 pt-40 pb-20">
      <h1 className="text-5xl font-black">
        New Project
      </h1>

      <NewProjectForm action={createProject} />
    </main>
  );
}