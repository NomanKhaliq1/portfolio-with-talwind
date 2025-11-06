import { supabase } from "../lib/supabaseClient";
import { experiences as fallbackExperiences, type Experience } from "@/app/data/experiences";

export async function getExperiences(): Promise<Experience[]> {
  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Supabase client unavailable. Using fallback experiences data.");
    }
    return fallbackExperiences.map((experience) => ({
      ...experience,
      description: [...experience.description],
    }));
  }

  try {
    const { data, error } = await supabase
      .from("experiences")
      .select("title, company, logo, date, startDate, description")
      .order("startDate", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("⚠️ Supabase error while fetching experiences:", error?.message || "No data returned");
      return fallbackExperiences.map((experience) => ({
        ...experience,
        description: [...experience.description],
      }));
    }

    return data.map((exp) => ({
      ...exp,
      description:
        typeof exp.description === "string"
          ? JSON.parse(exp.description)
          : exp.description,
    }));
  } catch (err) {
    const error = err as Error;
    console.error("❌ Supabase fetch failed:", error.message);
    return fallbackExperiences.map((experience) => ({
      ...experience,
      description: [...experience.description],
    }));
  }
}

export type { Experience };
