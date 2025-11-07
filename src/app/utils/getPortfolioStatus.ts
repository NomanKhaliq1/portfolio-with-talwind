import { supabase } from "../lib/supabaseClient";
import { fallbackPortfolioStatus } from "@/app/data/portfolioStatus";
import { DateTime } from "luxon";

type PortfolioStatus = {
  current_projects: number;
  total_slots: number;
  total_built: number;
  status_override: boolean;
  custom_message: string;
  vacation_until: string;
  open_to_jobs: boolean;
  job_type: string;
  dynamicMessage: string;
  country?: string;
  timezone?: string;
  working_hours_from?: number;
  working_hours_to?: number;
};

// ✅ Pass visitor timezone from frontend
export async function getPortfolioStatus(visitorZone?: string): Promise<PortfolioStatus> {
  try {
    const { data, error } = await supabase
      .from("portfolioStatus")
      .select(`
        current_projects,
        total_slots,
        total_built,
        status_override,
        custom_message,
        vacation_until,
        open_to_jobs,
        job_type,
        dynamicMessage,
        country,
        timezone,
        working_hours_from,
        working_hours_to
      `)
      .order("updated_at", { ascending: false })
      .limit(1);

    const latest = data?.[0] as PortfolioStatus | undefined;

    if (error || !latest) {
      console.warn("Supabase error:", error?.message || "No data returned");
      return withDynamicMessage(fallbackPortfolioStatus, visitorZone);
    }

    return withDynamicMessage(latest, visitorZone);
  } catch (err) {
    const error = err as Error;
    console.error("Supabase fetch failed:", error.message);
    return withDynamicMessage(fallbackPortfolioStatus, visitorZone);
  }
}

// ✅ Uses visitor timezone if provided
function withDynamicMessage(data: PortfolioStatus, visitorZone?: string): PortfolioStatus {
  const userZone = visitorZone || data.timezone || "Asia/Karachi";
  const now = DateTime.now().setZone(userZone);

  const startHour = data.working_hours_from ?? 9;
  const endHour = data.working_hours_to ?? 17;

  const start = now.set({ hour: startHour, minute: 0 });
  const end = now.set({ hour: endHour, minute: 0 });
  const isWithinWorkingHours = now >= start && now <= end;

  const vacationEnd = DateTime.fromISO(data.vacation_until, { zone: userZone });
  const isBackFromVacation = now > vacationEnd;

  const prettyStart = start.toFormat("h:mm a");
  const prettyEnd = end.toFormat("h:mm a");

  let dynamicMessage = "";

  if (!isBackFromVacation) {
    dynamicMessage = `On vacation until ${vacationEnd.toFormat("MMMM d, yyyy")}`;
  } else if (isWithinWorkingHours) {
    dynamicMessage = `Available now — responses expected between ${prettyStart} and ${prettyEnd}`;
  } else {
    const nextStart = now < start ? prettyStart : start.plus({ days: 1 }).toFormat("h:mm a");
    dynamicMessage = `Currently offline — responds after ${nextStart} (${data.country || "your"} time)`;
  }

  return { ...data, dynamicMessage };
}
