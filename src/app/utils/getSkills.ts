import { supabase } from "../lib/supabaseClient";
import { fallbackSkills, type Skill } from "@/app/data/skills";

export async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("src, alt, label, order")
      .order("order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("⚠️ Supabase error or empty table, using fallback data:", error?.message);
      return fallbackSkills;
    }

    return data as Skill[];
  } catch (err) {
    const error = err as Error;
    console.error("❌ Supabase fetch failed:", error.message);
    return fallbackSkills;
  }
}

export type { Skill };
