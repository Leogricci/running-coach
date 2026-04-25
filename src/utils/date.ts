/**
 * Given a plan start date (ISO string or Date) and a week number (1-based),
 * return the Monday Date of that week.
 */
export function weekStartDate(planStartDate: string | Date, weekNumber: number): Date {
  const start = new Date(planStartDate);
  const d = new Date(start);
  d.setDate(d.getDate() + (weekNumber - 1) * 7);
  return d;
}

/**
 * Given a plan start date and a session (weekNumber, dayOfWeek 0=Mon),
 * return the Date for that session.
 */
export function sessionDate(
  planStartDate: string | Date,
  weekNumber: number,
  dayOfWeek: number,
): Date {
  const monday = weekStartDate(planStartDate, weekNumber);
  const d = new Date(monday);
  d.setDate(d.getDate() + dayOfWeek);
  return d;
}

/**
 * Returns true if the given date is today (ignores time).
 */
export function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Returns true if the given date is strictly in the past (before today).
 */
export function isPast(date: Date): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d < now;
}

/**
 * Given a plan start date and total weeks, returns the current week number (1-based).
 * Returns null if today is outside the plan range.
 */
export function currentWeekNumber(
  planStartDate: string | Date,
  durationWeeks: number,
): number | null {
  const start = new Date(planStartDate);
  start.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return null;
  const week = Math.floor(diffDays / 7) + 1;
  if (week > durationWeeks) return null;
  return week;
}

/**
 * Format a Date as "Mon 21 Apr" for display.
 */
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function dayLabel(dayOfWeek: number): string {
  return DAY_LABELS[dayOfWeek] ?? "";
}
