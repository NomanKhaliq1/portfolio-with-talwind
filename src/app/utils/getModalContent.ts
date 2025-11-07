import { supabase } from "../lib/supabaseClient";

export interface ModalItem {
  key: string;
  heading: string;
  items: string[];
}

export async function getModalContent(): Promise<Record<string, ModalItem>> {
  try {
    const { data, error } = await supabase
      .from("modalContents")
      .select("key, heading, items");

    if (error || !data || data.length === 0) {
      console.warn("⚠️ No modal content found or Supabase error:", error?.message);
      return {};
    }

    const contentMap: Record<string, ModalItem> = {};

    data.forEach((item) => {
      if (!item.key || !item.heading || !item.items) return;

      contentMap[item.key] = {
        key: item.key,
        heading: item.heading,
        items: typeof item.items === "string" ? JSON.parse(item.items) : item.items,
      };
    });

    return contentMap;
  } catch (err: any) {
    console.error("❌ Supabase fetch failed:", err.message);
    return {};
  }
}
