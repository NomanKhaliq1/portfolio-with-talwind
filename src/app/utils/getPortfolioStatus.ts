import { supabase } from "../lib/supabaseClient";
import { fallbackPortfolioStatus } from "@/app/data/portfolioStatus";
import { DateTime } from "luxon";

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
  const isBackFromVacation = today > vacationEnd;

  const userZone = data.timezone || "Asia/Karachi";
  const now = DateTime.now().setZone(userZone);
  const startHour = data.working_hours_from ?? 9;
  const endHour = data.working_hours_to ?? 17;

  const start = now.set({ hour: startHour, minute: 0 });
  const end = now.set({ hour: endHour, minute: 0 });
  const isWithinWorkingHours = now >= start && now <= end;

  const prettyStart = start.toFormat("h:mm a");
  const prettyEnd = end.toFormat("h:mm a");

  let dynamicMessage = "";

  if (!isBackFromVacation) {
    dynamicMessage = `On vacation until ${vacationEnd.toDateString()}`;
  } else if (isWithinWorkingHours) {
    dynamicMessage = `Available now — responses expected between ${prettyStart} and ${prettyEnd}`;
  } else {
    dynamicMessage = `Currently offline — responds after ${prettyStart} (${data.country || "your"} time)`;
  }

  return {
    ...data,
    dynamicMessage,
  };
}
