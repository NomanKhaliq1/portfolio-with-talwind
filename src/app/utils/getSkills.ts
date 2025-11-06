import { supabase } from "../lib/supabaseClient";
import { fallbackSkills, type Skill } from "@/app/data/skills";

export async function getSkills(): Promise<Skill[]> {
  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Supabase client unavailable. Using fallback skills data.");
    }
    return fallbackSkills.map((skill) => ({ ...skill }));
  }

  try {
    const { data, error } = await supabase
      .from("skills")
      .select("src, alt, label, order")
      .order("order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("⚠️ Supabase error or empty table, using fallback data:", error?.message);
      return fallbackSkills.map((skill) => ({ ...skill }));
    }

    return data as Skill[];
  } catch (err) {
    const error = err as Error;
    console.error("❌ Supabase fetch failed:", error.message);
    return fallbackSkills.map((skill) => ({ ...skill }));
  }
}

export type { Skill };
