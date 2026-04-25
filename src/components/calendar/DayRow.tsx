import type { Session } from "@/types/training";
import { dayLabel, isToday, isPast, sessionDate } from "@/utils/date";
import { SessionChip, sessionColor } from "./SessionChip";

interface Props {
  session: Session;
  planStartDate: string;
  weekNumber: number;
  completed: boolean;
  onClick: () => void;
}

export function DayRow({ session, planStartDate, weekNumber, completed, onClick }: Props) {
  const date = sessionDate(planStartDate, weekNumber, session.dayOfWeek);
  const today = isToday(date);
  const past = isPast(date);
  const isRest = session.type === "rest";

  return (
    <button
      onClick={isRest ? undefined : onClick}
      disabled={isRest}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-lg ${
        isRest ? "cursor-default" : "hover:bg-white/5 active:bg-white/10"
      } ${today ? "ring-1" : ""}`}
      style={today ? { outline: "1px solid var(--text-muted)" } : undefined}
    >
      {/* Day column */}
      <div className="w-10 flex-shrink-0 text-center">
        <div
          className={`text-xs font-medium ${today ? "text-white" : past ? "" : "opacity-60"}`}
          style={{ color: today ? "white" : past ? "var(--text-secondary)" : "var(--text-muted)" }}
        >
          {dayLabel(session.dayOfWeek)}
        </div>
        <div
          className={`text-sm font-bold tabular-nums ${today ? "text-white" : ""}`}
          style={{
            color: today ? "white" : past ? "var(--text-secondary)" : "var(--text-muted)",
          }}
        >
          {date.getDate()}
        </div>
        {today && (
          <div className="mx-auto mt-0.5 h-1 w-1 rounded-full bg-white" />
        )}
      </div>

      {/* Left accent bar */}
      <div
        className="w-0.5 h-8 rounded-full flex-shrink-0"
        style={{
          backgroundColor: isRest ? "var(--border)" : sessionColor(session.type),
          opacity: past && !completed ? 0.4 : 1,
        }}
      />

      {/* Session info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <SessionChip type={session.type} size="sm" />
          {session.distance_km > 0 && (
            <span
              className="text-xs tabular-nums"
              style={{ color: "var(--text-secondary)" }}
            >
              {session.distance_km} km
            </span>
          )}
          {session.target_pace && (
            <span
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {session.target_pace}
            </span>
          )}
        </div>
        {session.intervals && session.intervals.length > 0 && (
          <div className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
            {session.intervals[0].repetitions} ×{" "}
            {session.intervals[0].distance_m
              ? `${session.intervals[0].distance_m}m`
              : `${Math.round((session.intervals[0].duration_s ?? 0) / 60)}min`}
          </div>
        )}
      </div>

      {/* Completion / arrow */}
      <div className="flex-shrink-0">
        {completed ? (
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--easy)", opacity: 0.9 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : !isRest ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--text-muted)" }}>
            <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </div>
    </button>
  );
}
