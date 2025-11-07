import { supabase } from "../lib/supabaseClient";
import { projects as fallbackProjects } from "@/app/data/projects";

export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("title, description, technologies, image, link, modalKey")
      .order("title", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("⚠️ Supabase error or empty table. Using fallback.");
      return fallbackProjects;
    }

    return data.map((item: any) => ({
      ...item,
      technologies: typeof item.technologies === "string"
        ? JSON.parse(item.technologies)
        : item.technologies,
    }));
  } catch (err: any) {
    console.error("❌ Supabase fetch failed:", err.message);
    return fallbackProjects;
  }
}