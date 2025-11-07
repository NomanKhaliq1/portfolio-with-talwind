import { supabase } from "../lib/supabaseClient";
import { experiences as fallbackExperiences, type Experience } from "@/app/data/experiences";

export async function getExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from("experiences")
      .select("title, company, logo, date, startDate, description")
      .order("startDate", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("⚠️ Supabase error while fetching experiences:", error?.message || "No data returned");
      return fallbackExperiences;
    }

    return data.map((exp) => ({
      ...exp,
      description: typeof exp.description === "string"
        ? JSON.parse(exp.description)
        : exp.description,
    }));
  } catch (err) {
    const error = err as Error;
    console.error("❌ Supabase fetch failed:", error.message);
    return fallbackExperiences;
  }
}

export type { Experience };
