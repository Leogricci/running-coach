import type { Week, Session } from "@/types/training";
import { DayRow } from "./DayRow";

const PHASE_LABELS = {
  base: "Base & Speed",
  threshold: "Threshold",
  specific: "Specific Pace",
};

const PHASE_COLORS = {
  base: "#22c55e",
  threshold: "#f97316",
  specific: "#a855f7",
};

interface Props {
  week: Week;
  planStartDate: string;
  isCurrent: boolean;
  completedSessionIds: Set<string>;
  onSessionTap: (session: Session, weekNumber: number) => void;
}

export function WeekCard({ week, planStartDate, isCurrent, completedSessionIds, onSessionTap }: Props) {
  const totalSessions = week.sessions.filter((s) => s.type !== "rest").length;
  const completedCount = week.sessions.filter((s) => completedSessionIds.has(s.id)).length;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        border: isCurrent ? "1px solid var(--border)" : "1px solid transparent",
        outline: isCurrent ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2.5">
          {isCurrent && (
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md tracking-wide uppercase"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "var(--text-secondary)" }}
            >
              Current
            </span>
          )}
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Week {week.weekNumber}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: `${PHASE_COLORS[week.phase]}22`,
              color: PHASE_COLORS[week.phase],
            }}
          >
            {PHASE_LABELS[week.phase]}
          </span>
        </div>

        {/* Completion dots */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
            {completedCount}/{totalSessions}
          </span>
          <div className="flex gap-0.5">
            {week.sessions
              .filter((s) => s.type !== "rest")
              .map((s) => (
                <div
                  key={s.id}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: completedSessionIds.has(s.id)
                      ? "var(--easy)"
                      : "var(--border)",
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Day rows */}
      <div className="py-1">
        {week.sessions.map((session) => (
          <DayRow
            key={session.id}
            session={session}
            planStartDate={planStartDate}
            weekNumber={week.weekNumber}
            completed={completedSessionIds.has(session.id)}
            onClick={() => onSessionTap(session, week.weekNumber)}
          />
        ))}
      </div>
    </div>
  );
}
