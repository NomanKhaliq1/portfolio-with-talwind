export const fallbackPortfolioStatus = {
  current_projects: 18,
  total_slots: 20,
  total_built: 15,
  status_override: true,
  custom_message: "On vacation, back on 23rd July",
  vacation_until: "2025-07-23",
  open_to_jobs: true,
  job_type: "Remote Full-Time",
  dynamicMessage: "On vacation, back on 23rd July",
};

// Strict type export for fallback usage
export type PortfolioStatus = typeof fallbackPortfolioStatus;
