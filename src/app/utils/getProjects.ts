import { supabase } from "../lib/supabaseClient";
import { projects as fallbackProjects } from "@/app/data/projects";

export interface Project {
  title: string;
  description: string;
  technologies: string[] | null;
  image: string;
  link: string;
  modalKey?: string;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("title, description, technologies, image, link, modalKey")
      .order("title", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("⚠️ Supabase error or empty table. Using fallback.");
      return fallbackProjects as Project[];
    }

    // ✅ Safely parse 'technologies' if it’s a JSON string
    const parsedProjects: Project[] = data.map((item) => ({
      ...item,
      technologies:
        typeof item.technologies === "string"
          ? JSON.parse(item.technologies)
          : item.technologies,
    }));

    return parsedProjects;
  } catch (err) {
    console.error(
      "❌ Supabase fetch failed:",
      (err as Error).message || "Unknown error"
    );
    return fallbackProjects as Project[];
  }
}
