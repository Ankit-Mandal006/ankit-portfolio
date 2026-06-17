import { supabase } from "@/lib/supabase";

export default async function TestDB() {
  const { data, error } =
    await supabase
      .from("projects")
      .select("*");

  return (
    <main className="p-10">
      <pre>
        {JSON.stringify(
          {
            data,
            error,
          },
          null,
          2
        )}
      </pre>
    </main>
  );
}