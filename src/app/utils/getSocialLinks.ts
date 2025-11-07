// utils/getSocialLinks.ts
import { supabase } from "../lib/supabaseClient";

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  order: number;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from("socialLinks")
    .select("platform, url, icon, order")
    .order("order", { ascending: true });

  if (error) {
    console.warn("⚠️ Supabase social links fetch error:", error.message);
    return [];
  }

  return (data || []).filter((item) => item.url && item.icon);
}
