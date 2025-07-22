import { supabase } from "../lib/supabaseClient";
import { fallbackPortfolioStatus } from "@/app/data/portfolioStatus";

type PortfolioStatus = typeof fallbackPortfolioStatus;

export async function getPortfolioStatus(): Promise<PortfolioStatus> {
  try {
    const { data, error } = await supabase
      .from("portfolioStatus")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1);

    const latest = data?.[0] as PortfolioStatus | undefined;

    if (error || !latest) {
      console.warn("Supabase error:", error?.message || "No data returned");
      return withDynamicMessage(fallbackPortfolioStatus);
    }

    return withDynamicMessage(latest);
  } catch (err) {
    const error = err as Error;
    console.error("Supabase fetch failed:", error.message);
    return withDynamicMessage(fallbackPortfolioStatus);
  }
}

function withDynamicMessage(data: PortfolioStatus): PortfolioStatus {
  const today = new Date();
  const vacationEnd = new Date(data.vacation_until);

  const dynamicMessage =
    today > vacationEnd
      ? "I’m back and available for work!"
      : data.custom_message;

  return {
    ...data,
    dynamicMessage,
  };
}
